"use client"

import { useState, useRef } from "react"
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Collapse,
  InputAdornment,
  Menu,
  MenuItem,
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
import { useLanguage } from "../contexts/LanguageContext"

// Mock data
const initialPosts = [
  {
    id: 1,
    author: {
      name: "Mahmoud Youssef",
      avatar: "/images/Mahmoud.jpeg",
      role: "Community Leader",
    },
    date: "2 hours ago",
    content:
      "No.1",
    image: "/images/7oda.jpg",
    likes: 1505,
    comments: [
      {
        id: 1,
        author: {
          name: "Fatma Ibrahim",
          avatar: "/images/Fatma.jpg",
        },
        content: "3sllll",
        date: "1 hour ago",
      },
      {
        id: 2,
        author: {
          name: "Toqa Ahmed",
          avatar: "/images/Toqa.jpg",
        },
        content: "Love You",
        date: "30 minutes ago",
      },
    ],
    shares: 12,
    tags: ["Edu Cycle"],
  },
  {
    id: 2,
    author: {
      name: "Ali Hassan",
      avatar: "/images/Ali.jpg",
      role: "Recycling Expert",
    },
    date: "Yesterday",
    content:
      "Here's a quick tip for reducing plastic waste: bring your own reusable containers when shopping at bulk stores or delis. Most places are happy to accommodate, and you'll save so much unnecessary packaging!",
    likes: 28,
    comments: [
      {
        id: 1,
        author: {
          name: "Mohab Ehab",
          avatar: "/images/Mohab.jpg",
        },
        content: "I've been doing this for months and it's so easy once you get into the habit!",
        date: "12 hours ago",
      },
    ],
    shares: 7,
    tags: ["Plastic Free", "Recycling Tips"],
  },
  {
    id: 3,
    author: {
      name: "Abdallah Mohamed",
      avatar: "/images/Abdallah.jpg",
      role: "Sustainability Advocate",
    },
    date: "3 days ago",
    content:
      "I just completed my first month of composting and I'm amazed at how much it has reduced my household waste! If anyone needs tips on getting started with composting in small spaces, feel free to ask!",
    image: "/images/compost2.jpg",
    likes: 35,
    comments: [
      {
        id: 1,
        author: {
          name: "Arwa Mohammed",
          avatar: "/images/Arwa.jpg",
        },
        content: "What composting system are you using for your small space?",
        date: "2 days ago",
      },
      {
        id: 2,
        author: {
          name: "Mahmoud Youssef",
          avatar: "/images/Mahmoud.jpeg",
        },
        content: "This is so inspiring! I need to start composting too.",
        date: "1 day ago",
      },
    ],
    shares: 5,
    tags: ["Composting", "Reduce Waste"],
  },
]

const trendingTopics = [
  { name: "علم النفس", posts: 42 },
  { name: "تكنولوجيا التعليم", posts: 38 },
  { name: "الذكاء الاصطناعي", posts: 27 },
  { name: "البرمجة", posts: 24 },
  { name: "الواقع المعزز", posts: 19 },
]

const activeUsers = [
  {
    name: "Mahmoud Youssef",
    avatar: "/images/Mahmoud.jpeg",
    status: "Online",
  },
  {
    name: "Arwa Mohammed",
    avatar: "/images/Arwa.jpg",
    status: "Online",
  },
  {
    name: "Abdallah Mohamed",
    avatar: "/images/Abdallah.jpg",
    status: "Online",
  },
  {
    name: "Ali Hassan",
    avatar: "/images/Ali.jpg",
    status: "Offline",
  },
]

const CommunityPage = () => {
  const { t, language } = useLanguage()
  const [posts, setPosts] = useState(initialPosts)
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
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [activeMenuPostId, setActiveMenuPostId] = useState(null)
  const fileInputRef = useRef(null)

  const handleMenuOpen = (event, postId) => {
    setMenuAnchorEl(event.currentTarget)
    setActiveMenuPostId(postId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setActiveMenuPostId(null)
  }

  const handleDeletePost = () => {
    setPosts(posts.filter((post) => post.id !== activeMenuPostId))
    handleMenuClose()
  }

  const handlePostSubmit = (e) => {
    e.preventDefault()
    if (!postContent.trim()) return

    // Create a new post
    const newPost = {
      id: Date.now(), // Use timestamp as a simple ID
      author: {
        name: t("you"), // In a real app, this would be the current user
        avatar: "/images/Mahmoud.jpeg",
        role: "Member",
      },
      date: t("Just Now"),
      content: postContent,
      image: postImagePreview || null,
      likes: 0,
      comments: [],
      shares: 0,
      tags: postTags,
    }

    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts])

    // Reset form
    setPostContent("")
    setPostImage(null)
    setPostImagePreview("")
    setPostTags([])
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPostImage(file)

      // Create a preview URL for the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPostImage(null)
    setPostImagePreview("")
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !postTags.includes(currentTag.trim())) {
      setPostTags([...postTags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setPostTags(postTags.filter((tag) => tag !== tagToRemove))
  }

  const handleLikeToggle = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleCommentToggle = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value,
    })
  }

  const handleAddComment = (postId) => {
    const commentContent = commentInputs[postId]
    if (!commentContent || !commentContent.trim()) return

    const newComment = {
      id: Date.now(),
      author: {
        name: t("you"), // In a real app, this would be the current user
        avatar: "/images/Mahmoud.jpeg",
      },
      content: commentContent,
      date: t("justNow"),
    }

    // Add the comment to the post
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment],
          }
        }
        return post
      }),
    )

    // Clear the comment input
    setCommentInputs({
      ...commentInputs,
      [postId]: "",
    })
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Left Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardHeader title={t("aboutCommunity")} />
              <CardContent>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t("communityWelcome")}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main", mr: 1, ml: language === 'ar' ? 1 : 0 }}>
                    <CommentIcon />
                  </Avatar>
                  <Typography variant="body2">
                    <strong>1,245</strong> {t("members")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title={t("activeMembers")} />
              <CardContent sx={{ pt: 0 }}>
                <List disablePadding>
                  {activeUsers.map((user, index) => (
                    <ListItem key={index} disablePadding sx={{ pb: 1 }}>
                      <ListItemAvatar>
                        <Avatar src={user.avatar} alt={user.name} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <Box
                            component="span"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                bgcolor:
                                  user.status === "Online"
                                    ? "success.main"
                                    : user.status === "Away"
                                      ? "warning.main"
                                      : "grey.400",
                                mr: 0.5,
                              }}
                            />
                            {user.status}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={6}>
            {/* Search Bar */}
            <Paper
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", mr: 1, ml: language === 'ar' ? 1 : 0 }} />
              <TextField
                fullWidth
                placeholder={t("searchPosts")}
                variant="standard"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </Paper>

            {/* Create Post */}
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <Avatar sx={{ mr: 2, ml: language === 'ar' ? 2 : 0 }} src="/images/Mahmoud.jpeg" />
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder={t("shareThoughts")}
                    variant="outlined"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </Box>

                {/* Image Preview */}
                {postImagePreview && (
                  <Box sx={{ position: "relative", mb: 2 }}>
                    <Box
                      component="img"
                      src={postImagePreview}
                      alt="Post image preview"
                      sx={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                        borderRadius: 1,
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        "&:hover": {
                          bgcolor: "rgba(0, 0, 0, 0.7)",
                        },
                      }}
                      onClick={handleRemoveImage}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}

                {/* Tags */}
                {postTags.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {postTags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                        onDelete={() => handleRemoveTag(tag)}
                      />
                    ))}
                  </Box>
                )}

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    <Button size="small" startIcon={<ImageIcon sx={{ mr: language === 'ar' ? 1 : 0 }} />} onClick={() => fileInputRef.current.click()}>
                      {t("photo")}
                    </Button>
                    <TextField
                      size="small"
                      placeholder={t("addTag")}
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalOfferIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: currentTag && (
                          <InputAdornment position="end">
                            <Button size="small" onClick={handleAddTag}>
                              {t("add")}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={language === "en" ? <SendIcon /> : <SendIcon sx={{ transform: "rotate(180deg)" }} />}
                    disabled={!postContent.trim()}
                    onClick={handlePostSubmit}
                  >
                    {t("post")}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} sx={{ mb: 3, borderRadius: 2 }}>
                  <CardHeader
                    avatar={<Avatar src={post.author.avatar} alt={post.author.name} />}
                    action={
                      <IconButton aria-label="settings" onClick={(e) => handleMenuOpen(e, post.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {post.author.name}
                        </Typography>
                        {post.author.role && (
                          <Chip
                            label={post.author.role}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ ml: 1, height: 20, fontSize: "0.7rem" }}
                          />
                        )}
                      </Box>
                    }
                    subheader={post.date}
                  />
                  <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body1" paragraph>
                      {post.content}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                      {post.tags &&
                        post.tags.map((tag, index) => (
                          <Chip key={index} label={tag} size="small" color="primary" variant="outlined" clickable />
                        ))}
                    </Box>
                    {post.image && (
                      <Box
                        component="img"
                        src={post.image}
                        alt="Post image"
                        sx={{
                          width: "100%",
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                    )}
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Box>
                        <IconButton
                          color={likedPosts[post.id] ? "primary" : "default"}
                          onClick={() => handleLikeToggle(post.id)}
                        >
                          {likedPosts[post.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">
                          {post.likes + (likedPosts[post.id] ? 1 : 0)}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton onClick={() => handleCommentToggle(post.id)}>
                          <CommentIcon />
                        </IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">
                          {post.comments.length}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton>
                          <ShareIcon />
                        </IconButton>
                        <Typography variant="body2" component="span" color="text.secondary">
                          {post.shares}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Comments Section */}
                    <Collapse in={expandedComments[post.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="subtitle2" gutterBottom>
                          {t("comments")}
                        </Typography>

                        {/* Comment List */}
                        {post.comments.length > 0 ? (
                          <List disablePadding>
                            {post.comments.map((comment) => (
                              <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                                <ListItemAvatar sx={{ minWidth: 40 }}>
                                  <Avatar
                                    src={comment.author.avatar}
                                    alt={comment.author.name}
                                    sx={{ width: 32, height: 32 }}
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={
                                    <Box
                                      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {comment.author.name}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {comment.date}
                                      </Typography>
                                    </Box>
                                  }
                                  secondary={
                                    <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                                      {comment.content}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                            {t("noComments")}
                          </Typography>
                        )}

                        {/* Add Comment */}
                        <Box sx={{ display: "flex", mt: 2 }}>
                          <Avatar
                            sx={{ width: 32, height: 32, mr: 1, ml: language === 'ar' ? 1 : 0 }}
                            src="/images/Omar.jpg"
                          />
                          <TextField
                            fullWidth
                            size="small"
                            placeholder={t("writeComment")}
                            value={commentInputs[post.id] || ""}
                            onChange={(e) => handleCommentInputChange(post.id, e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleAddComment(post.id)
                              }
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    edge="end"
                                    size="small"
                                    disabled={!commentInputs[post.id] || !commentInputs[post.id].trim()}
                                    onClick={() => handleAddComment(post.id)}
                                  >
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
                <Typography variant="body2" color="text.secondary">
                  {t("firstToPost")}
                </Typography>
              </Paper>
            )}

            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDeletePost}>{t("deletePost") || "Delete Post"}</MenuItem>
              <MenuItem onClick={handleMenuClose}>{t("reportPost") || "Report Post"}</MenuItem>
            </Menu>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ mb: 3, borderRadius: 2 }}>
              <CardHeader title={t("trendingTopics")} />
              <CardContent sx={{ pt: 0 }}>
                <List disablePadding>
                  {trendingTopics.map((topic, index) => (
                    <ListItem key={index} disablePadding sx={{ pb: 1 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              #{topic.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {topic.posts} {t("posts")}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 2 }}>
              <CardHeader title={t("communityGuidelines")} />
              <CardContent>
                <Typography variant="body2" paragraph>
                  • {t("guideline1")}
                </Typography>
                <Typography variant="body2" paragraph>
                  • {t("guideline2")}
                </Typography>
                <Typography variant="body2" paragraph>
                  • {t("guideline3")}
                </Typography>
                <Typography variant="body2" paragraph>
                  • {t("guideline4")}
                </Typography>
                <Button variant="outlined" color="primary" fullWidth sx={{ mt: 1 }}>
                  {t("readFullGuidelines")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CommunityPage
