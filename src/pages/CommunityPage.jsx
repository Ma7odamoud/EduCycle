"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box, Container, Grid, Card, CardContent, CardHeader, Typography,
  TextField, Button, Avatar, Divider, IconButton, Paper, List,
  ListItem, ListItemAvatar, ListItemText, Chip, Collapse, InputAdornment,
  Menu, MenuItem, CircularProgress, Snackbar, Alert, Badge,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import CommentIcon from "@mui/icons-material/Comment"
import ShareIcon from "@mui/icons-material/Share"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import SendIcon from "@mui/icons-material/Send"
import ImageIcon from "@mui/icons-material/Image"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import CloseIcon from "@mui/icons-material/Close"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../lib/api"
import { useNavigate } from "react-router-dom"

const trendingTopics = [
  { name: "علم النفس", posts: 42 },
  { name: "تكنولوجيا التعليم", posts: 38 },
  { name: "الذكاء الاصطناعي", posts: 27 },
  { name: "البرمجة", posts: 24 },
  { name: "الواقع المعزز", posts: 19 },
]

const CommunityPage = () => {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [postContent, setPostContent] = useState("")
  // eslint-disable-next-line no-unused-vars
  const [postImage, setPostImage] = useState(null)
  const [postImagePreview, setPostImagePreview] = useState("")
  const [currentTag, setCurrentTag] = useState("")
  const [postTags, setPostTags] = useState([])
  const [likedPosts, setLikedPosts] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedComments, setExpandedComments] = useState({})
  const [commentInputs, setCommentInputs] = useState({})

  const [isPosting, setIsPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)
  const fileInputRef = useRef(null)

  // ── Comment edit state ─────────────────────────────────────────────────────
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editingCommentText, setEditingCommentText] = useState("")
  const [commentMenuAnchor, setCommentMenuAnchor] = useState(null)
  const [activeCommentMenu, setActiveCommentMenu] = useState(null) // { postId, commentId }

  // ── Post edit state ────────────────────────────────────────────────────────
  const [editingPostId, setEditingPostId] = useState(null)
  const [editingPostText, setEditingPostText] = useState("")
  const [postMenuAnchor, setPostMenuAnchor] = useState(null)
  const [activeMenuPostId, setActiveMenuPostId] = useState(null)

  // ── Friends / Social ───────────────────────────────────────────────────────
  const [friends, setFriends] = useState([])
  const [pendingRequests, setPendingRequests] = useState([])
  const [sentRequests, setSentRequests] = useState(new Set()) // user IDs we've sent requests to
  const [friendsLoading, setFriendsLoading] = useState(false)

  // ─── Fetch posts ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetchPosts()
    if (user) fetchFriends()
  }, [user])

  const formatPost = (p) => ({
    id: p.id,
    authorId: p.authorId,
    author: {
      name: p.author?.name || "Unknown User",
      avatar: p.author?.avatar || "/placeholder.svg",
      role: p.author?.role || "Member",
    },
    date: new Date(p.createdAt).toLocaleDateString(),
    content: p.content,
    image: p.mediaUrl || null,
    likes: p.likeCount || 0,
    comments: p.comments?.map(c => ({
      id: c.id,
      author: { id: c.author?.id, name: c.author?.name || "Unknown", avatar: c.author?.avatar },
      content: c.content,
      date: new Date(c.createdAt).toLocaleDateString()
    })) || [],
    shares: p.shareCount || 0,
    tags: [],
  })

  const fetchPosts = async () => {
    try {
      const { data } = await api.get('/posts')
      if (data?.data) {
        const fetchedPosts = data.data.map(formatPost)
        setPosts(fetchedPosts)

        // Initialize liked state for each post from backend data
        const initialLikes = {}
        data.data.forEach((p) => {
          if (p.isLiked) initialLikes[p.id] = true
        })
        setLikedPosts(initialLikes)
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error)
      setPosts([])
    }
  }

  const fetchFriends = async () => {
    setFriendsLoading(true)
    try {
      const { data } = await api.get('/friends')
      setFriends(data.friends || [])
      setPendingRequests(data.pendingRequests || [])
    } catch (err) {
      console.error("Failed to fetch friends:", err)
    } finally {
      setFriendsLoading(false)
    }
  }

  // ─── Friend request ────────────────────────────────────────────────────────
  const handleSendFriendRequest = async (targetUserId) => {
    try {
      await api.post(`/friends/request/${targetUserId}`)
      setSentRequests(prev => new Set([...prev, targetUserId]))
    } catch (err) {
      console.error("Failed to send friend request:", err)
    }
  }

  const handleRespondToRequest = async (friendshipId, action) => {
    try {
      await api.put(`/friends/${friendshipId}`, { action })
      await fetchFriends()
    } catch (err) {
      console.error("Failed to respond to request:", err)
    }
  }

  const isFriend = (userId) => friends.some(f => f.friend.id === userId)
  const isPendingSent = (userId) => sentRequests.has(userId)
  const isPendingReceived = (userId) => pendingRequests.some(r => r.requester.id === userId)

  // ─── Posts CRUD ────────────────────────────────────────────────────────────
  const handleMenuOpen = (event, postId) => { setPostMenuAnchor(event.currentTarget); setActiveMenuPostId(postId) }
  const handleMenuClose = () => { setPostMenuAnchor(null); setActiveMenuPostId(null) }

  const handleDeletePost = async () => {
    const postId = activeMenuPostId
    handleMenuClose()
    try {
      await api.delete(`/posts/${postId}`)
      setPosts(prev => prev.filter(p => p.id !== postId))
    } catch (err) {
      console.error("Failed to delete post:", err)
      alert(err.response?.data?.error || "Failed to delete post.")
    }
  }

  const handleSaveEditPost = async () => {
    if (!editingPostText.trim()) return
    const postId = editingPostId
    try {
      await api.put(`/posts/${postId}`, { content: editingPostText })
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, content: editingPostText } : p))
      setEditingPostId(null)
      setEditingPostText("")
    } catch (err) {
      console.error("Failed to edit post:", err)
    }
  }

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    if (!postContent.trim()) return
    if (!user) { alert("Please login to post!"); return }

    setIsPosting(true)
    try {
      let finalMediaUrl = null

      if (postImage) {
        const formData = new FormData()
        formData.append("files", postImage)
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        finalMediaUrl = uploadRes.data?.urls?.[0]
      }

      const payload = { content: postContent }
      if (finalMediaUrl) payload.mediaUrl = finalMediaUrl
      if (postTags.length > 0) payload.tags = postTags

      const { data } = await api.post('/posts', payload)

      const newPost = {
        id: data.id || Date.now(),
        authorId: user.id,
        author: { name: user.name, avatar: user.avatar || "/placeholder.svg", role: user.role },
        date: t("Just Now") || "Just now",
        content: postContent,
        image: finalMediaUrl,
        likes: 0,
        comments: [],
        shares: 0,
        tags: postTags,
      }
      setPosts([newPost, ...posts])
      setPostContent(""); setPostImage(null); setPostImagePreview(""); setPostTags([])
      setPostSuccess(true)
    } catch (error) {
      console.error("Failed to create post:", error)
      alert(error.response?.data?.error || "Failed to post.")
    } finally {
      setIsPosting(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPostImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setPostImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => { setPostImage(null); setPostImagePreview("") }
  const handleAddTag = () => { if (currentTag.trim() && !postTags.includes(currentTag.trim())) { setPostTags([...postTags, currentTag.trim()]); setCurrentTag("") } }
  const handleRemoveTag = (tag) => setPostTags(postTags.filter(t => t !== tag))

  const handleLikeToggle = async (postId) => {
    if (!user) return alert("Please login to like posts!")
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }))
    try {
      await api.post(`/posts/${postId}/like`)
    } catch {
      setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }))
    }
  }

  const handleCommentToggle = (postId) => setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }))
  const handleCommentInputChange = (postId, value) => setCommentInputs({ ...commentInputs, [postId]: value })

  const handleAddComment = async (postId) => {
    const content = commentInputs[postId]
    if (!content?.trim()) return
    if (!user) return alert("Please login to comment!")
    try {
      await api.post(`/posts/${postId}/comments`, { content })
      const newComment = {
        id: Date.now(),
        author: { name: user.name, avatar: user.avatar || "/placeholder.svg" },
        content,
        date: t("justNow") || "Just now",
      }
      setPosts(posts.map(post =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      ))
      setCommentInputs({ ...commentInputs, [postId]: "" })
    } catch (err) {
      console.error("Failed to post comment:", err)
    }
  }

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/posts/${postId}/comments/${commentId}`)
      setPosts(posts.map(post =>
        post.id === postId
          ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
          : post
      ))
    } catch (err) {
      console.error("Failed to delete comment:", err)
    }
  }

  const handleSaveEditComment = async (postId, commentId) => {
    if (!editingCommentText.trim()) return
    try {
      await api.put(`/posts/${postId}/comments/${commentId}`, { content: editingCommentText })
      setPosts(posts.map(post =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map(c =>
                c.id === commentId ? { ...c, content: editingCommentText } : c
              )
            }
          : post
      ))
      setEditingCommentId(null)
      setEditingCommentText("")
    } catch (err) {
      console.error("Failed to edit comment:", err)
    }
  }

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* ── Left Sidebar ── */}
          <Grid item xs={12} md={3}>
            {/* About Community */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardHeader title={t("aboutCommunity")} />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t("communityWelcome")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}><CommentIcon /></Avatar>
                  <Typography variant="body2">
                    <strong>{friends.length}</strong> {t("friends") || "Friends"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Friends / Pending Requests */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardHeader title={t("activeMembers") || "Friends"} />
              <CardContent sx={{ pt: 0 }}>
                {friendsLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}><CircularProgress size={24} /></Box>
                ) : friends.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {t("noFriendsYet") || "No friends yet. Add some!"}
                  </Typography>
                ) : (
                  <List disablePadding>
                    {friends.map((f, i) => (
                      <ListItem key={i} disablePadding sx={{ pb: 1 }}>
                        <ListItemAvatar>
                          <Avatar
                            src={f.friend.avatar}
                            alt={f.friend.name}
                            sx={{ cursor: "pointer" }}
                            onClick={() => navigate(`/user/${f.friend.id}`)}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={f.friend.name}
                          secondary={
                            <Box component="span" sx={{ display: "flex", alignItems: "center" }}>
                              <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "success.main", mr: 0.5 }} />
                              {t("friends") || "Friends"}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}

                {/* Pending incoming requests */}
                {pendingRequests.length > 0 && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                      {t("friendRequests") || "Friend Requests"}
                    </Typography>
                    {pendingRequests.map((req, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Avatar src={req.requester.avatar} alt={req.requester.name} sx={{ width: 32, height: 32 }} />
                        <Typography variant="body2" sx={{ flex: 1, fontSize: "0.8rem" }}>{req.requester.name}</Typography>
                        <IconButton size="small" color="primary" onClick={() => handleRespondToRequest(req.id, "ACCEPTED")}>
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleRespondToRequest(req.id, "REJECTED")}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title={t("trendingTopics") || "Trending Topics"} />
              <CardContent sx={{ pt: 0 }}>
                <List disablePadding>
                  {trendingTopics.map((topic, i) => (
                    <ListItem key={i} disablePadding sx={{ pb: 1 }}>
                      <ListItemText
                        primary={<Typography variant="body2" sx={{ fontWeight: 600 }}>#{topic.name}</Typography>}
                        secondary={`${topic.posts} posts`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* ── Main Content ── */}
          <Grid item xs={12} md={6}>
            {/* Search */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2, display: "flex", alignItems: "center" }}>
              <SearchIcon sx={{ color: "text.secondary", mr: 1, ml: language === 'ar' ? 1 : 0 }} />
              <TextField
                fullWidth placeholder={t("searchPosts")} variant="standard"
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                InputProps={{ disableUnderline: true }}
              />
            </Paper>

            {/* Create Post */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar sx={{ mr: 2, ml: language === 'ar' ? 2 : 0 }} src={user?.avatar || "/placeholder.svg"} />
                  <TextField
                    fullWidth multiline rows={3}
                    placeholder={t("shareThoughts")}
                    variant="outlined"
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                  />
                </Box>

                {postImagePreview && (
                  <Box sx={{ position: "relative", mb: 2 }}>
                    <Box component="img" src={postImagePreview} alt="preview"
                      sx={{ width: "100%", maxHeight: 300, objectFit: "contain", borderRadius: 1 }} />
                    <IconButton size="small"
                      sx={{ position: "absolute", top: 8, right: 8, bgcolor: "rgba(0,0,0,0.5)", color: "white", "&:hover": { bgcolor: "rgba(0,0,0,0.7)" } }}
                      onClick={handleRemoveImage}
                    ><CloseIcon /></IconButton>
                  </Box>
                )}

                {postTags.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {postTags.map((tag, i) => (
                      <Chip key={i} label={tag} size="small" color="primary" variant="outlined" onDelete={() => handleRemoveTag(tag)} />
                    ))}
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <input type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleImageUpload} />
                    <Button size="small" startIcon={<ImageIcon sx={{ mr: language === 'ar' ? 1 : 0 }} />} onClick={() => fileInputRef.current.click()}>
                      {t("photo")}
                    </Button>
                    <TextField
                      size="small" placeholder={t("addTag")} value={currentTag}
                      onChange={e => setCurrentTag(e.target.value)}
                      onKeyPress={e => { if (e.key === "Enter") { e.preventDefault(); handleAddTag() } }}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><LocalOfferIcon fontSize="small" /></InputAdornment>,
                        endAdornment: currentTag && <InputAdornment position="end"><Button size="small" onClick={handleAddTag}>{t("add")}</Button></InputAdornment>,
                      }}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Button
                    variant="contained" color="primary"
                    endIcon={isPosting ? <CircularProgress size={16} color="inherit" /> : (language === "en" ? <SendIcon /> : <SendIcon sx={{ transform: "rotate(180deg)" }} />)}
                    disabled={!postContent.trim() || isPosting}
                    onClick={handlePostSubmit}
                  >
                    {isPosting ? (t("posting") || "Posting…") : t("post")}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Card key={post.id} sx={{ mb: 3, borderRadius: 2 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        src={post.author.avatar}
                        alt={post.author.name}
                        sx={{ cursor: "pointer" }}
                        onClick={() => post.authorId !== user?.id && navigate(`/user/${post.authorId}`)}
                      />
                    }
                    action={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        {/* Add Friend button for posts by other users */}
                        {user && post.authorId !== user.id && !isFriend(post.authorId) && (
                          <Button
                            size="small"
                            variant={isPendingSent(post.authorId) ? "outlined" : "text"}
                            startIcon={isPendingSent(post.authorId) ? <CheckIcon /> : <PersonAddIcon />}
                            sx={{ fontSize: "0.7rem" }}
                            onClick={() => handleSendFriendRequest(post.authorId)}
                            disabled={isPendingSent(post.authorId)}
                          >
                            {isPendingSent(post.authorId) ? (t("requestSent") || "Sent") : (t("addFriend") || "Add Friend")}
                          </Button>
                        )}
                    {/* Only show ⋮ menu to the post's own author */}
                        {user && post.authorId === user.id && (
                          <IconButton aria-label="settings" onClick={e => handleMenuOpen(e, post.id)}>
                            <MoreVertIcon />
                          </IconButton>
                        )}
                      </Box>
                    }
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          variant="subtitle1" sx={{ fontWeight: 600, cursor: post.authorId !== user?.id ? "pointer" : "default" }}
                          onClick={() => post.authorId !== user?.id && navigate(`/user/${post.authorId}`)}
                        >
                          {post.author.name}
                        </Typography>
                        {post.author.role && (
                          <Chip label={post.author.role} size="small" color="primary" variant="outlined" sx={{ ml: 1, height: 20, fontSize: "0.7rem" }} />
                        )}
                      </Box>
                    }
                    subheader={post.date}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    {editingPostId === post.id ? (
                      <Box sx={{ mb: 2 }}>
                        <TextField
                          fullWidth multiline rows={3} autoFocus
                          value={editingPostText}
                          onChange={e => setEditingPostText(e.target.value)}
                          sx={{ mb: 1 }}
                        />
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button size="small" variant="contained" onClick={handleSaveEditPost}>{t("save") || "Save"}</Button>
                          <Button size="small" onClick={() => { setEditingPostId(null); setEditingPostText("") }}>{t("cancel") || "Cancel"}</Button>
                        </Box>
                      </Box>
                    ) : (
                      <Typography variant="body1" paragraph>{post.content}</Typography>
                    )}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                      {post.tags?.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" color="primary" variant="outlined" clickable />
                      ))}
                    </Box>
                    {post.image && (
                      <Box component="img" src={post.image} alt="Post image" sx={{ width: "100%", borderRadius: 1, mb: 2 }} />
                    )}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <IconButton color={likedPosts[post.id] ? "primary" : "default"} onClick={() => handleLikeToggle(post.id)}>
                          {likedPosts[post.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">
                          {post.likes + (likedPosts[post.id] ? 1 : 0)}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleCommentToggle(post.id)}><CommentIcon /></IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">{post.comments.length}</Typography>
                      </Box>
                      <Box>
                        <IconButton><ShareIcon /></IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">{post.shares}</Typography>
                      </Box>
                    </Box>

                    <Collapse in={expandedComments[post.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>{t("comments")}</Typography>
                        {post.comments.length > 0 ? (
                          <List disablePadding>
                            {post.comments.map(comment => (
                              <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                                <ListItemAvatar sx={{ minWidth: 40 }}>
                                  <Avatar src={comment.author.avatar} alt={comment.author.name} sx={{ width: 32, height: 32 }} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{comment.author.name}</Typography>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary">{comment.date}</Typography>
                                        {/* Show 3-dot menu only for own comments */}
                                        {user && comment.author.id === user.id && (
                                          <>
                                            <IconButton size="small" onClick={(e) => { setCommentMenuAnchor(e.currentTarget); setActiveCommentMenu({ postId: post.id, commentId: comment.id }) }}>
                                              <MoreVertIcon fontSize="small" />
                                            </IconButton>
                                          </>
                                        )}
                                      </Box>
                                    </Box>
                                  }
                                  secondary={
                                    editingCommentId === comment.id ? (
                                      <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                                        <TextField
                                          fullWidth size="small" autoFocus
                                          value={editingCommentText}
                                          onChange={e => setEditingCommentText(e.target.value)}
                                          onKeyPress={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSaveEditComment(post.id, comment.id) } }}
                                        />
                                        <IconButton size="small" color="primary" onClick={() => handleSaveEditComment(post.id, comment.id)}>
                                          <CheckIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton size="small" onClick={() => { setEditingCommentId(null); setEditingCommentText("") }}>
                                          <CloseIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    ) : (
                                      <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>{comment.content}</Typography>
                                    )
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>{t("noComments")}</Typography>
                        )}
                        {/* Comment action menu — outside ternary so JSX is valid */}
                        <Menu
                          anchorEl={commentMenuAnchor}
                          open={Boolean(commentMenuAnchor)}
                          onClose={() => { setCommentMenuAnchor(null); setActiveCommentMenu(null) }}
                        >
                          <MenuItem onClick={() => {
                            if (!activeCommentMenu) return
                            const { postId, commentId } = activeCommentMenu
                            const targetPost = posts.find(p => p.id === postId)
                            const targetComment = targetPost?.comments.find(c => c.id === commentId)
                            setEditingCommentId(commentId)
                            setEditingCommentText(targetComment?.content || "")
                            setCommentMenuAnchor(null)
                          }}>
                            <EditIcon fontSize="small" sx={{ mr: 1 }} /> {t("edit") || "Edit"}
                          </MenuItem>
                          <MenuItem sx={{ color: "error.main" }} onClick={() => {
                            if (!activeCommentMenu) return
                            const { postId, commentId } = activeCommentMenu
                            handleDeleteComment(postId, commentId)
                            setCommentMenuAnchor(null)
                            setActiveCommentMenu(null)
                          }}>
                            <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> {t("delete") || "Delete"}
                          </MenuItem>
                        </Menu>
                        <Box sx={{ display: "flex", mt: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={user?.avatar || "/placeholder.svg"} />
                          <TextField
                            fullWidth size="small"
                            placeholder={t("writeComment")}
                            value={commentInputs[post.id] || ""}
                            onChange={e => handleCommentInputChange(post.id, e.target.value)}
                            onKeyPress={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddComment(post.id) } }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton edge="end" size="small" disabled={!commentInputs[post.id]?.trim()} onClick={() => handleAddComment(post.id)}>
                                    <SendIcon fontSize="small" sx={language === 'ar' ? { transform: "rotate(180deg)" } : {}} />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
                <Typography variant="h6">{t("noPosts")}</Typography>
                <Typography variant="body2" color="text.secondary">{t("firstToPost")}</Typography>
              </Paper>
            )}

            <Menu anchorEl={postMenuAnchor} open={Boolean(postMenuAnchor)} onClose={handleMenuClose}>
              <MenuItem onClick={() => {
                const post = posts.find(p => p.id === activeMenuPostId)
                setEditingPostId(activeMenuPostId)
                setEditingPostText(post?.content || "")
                handleMenuClose()
              }}>
                <EditIcon fontSize="small" sx={{ mr: 1 }} /> {t("edit") || "Edit Post"}
              </MenuItem>
              <MenuItem sx={{ color: "error.main" }} onClick={handleDeletePost}>
                <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> {t("deletePost") || "Delete Post"}
              </MenuItem>
            </Menu>
          </Grid>

          {/* ── Right Sidebar ── */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 2, mb: 3 }}>
              <CardHeader title={t("trendingTopics") || "Trending"} />
              <CardContent sx={{ pt: 0 }}>
                {trendingTopics.map((topic, i) => (
                  <Box key={i} sx={{ mb: 1.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>#{topic.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{topic.posts} posts</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={postSuccess} autoHideDuration={3000} onClose={() => setPostSuccess(false)}>
        <Alert severity="success" onClose={() => setPostSuccess(false)}>{t("postCreated") || "Post published!"}</Alert>
      </Snackbar>
    </Box>
  )
}

export default CommunityPage
