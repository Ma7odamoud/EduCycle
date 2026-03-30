"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Badge,
  Card,
  CardContent,
  CardHeader,
  Alert,
  CircularProgress,
} from "@mui/material"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../lib/api"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import RecyclingIcon from "@mui/icons-material/Recycling"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import SettingsIcon from "@mui/icons-material/Settings"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import BarChartIcon from "@mui/icons-material/BarChart"
import PostAddIcon from "@mui/icons-material/PostAdd"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import CommentIcon from "@mui/icons-material/Comment"
import FavoriteIcon from "@mui/icons-material/Favorite"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import PhoneIcon from "@mui/icons-material/Phone"

const ProfilePage = () => {
  const { t } = useLanguage()
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const avatarInputRef = useRef(null)

  const [tabValue, setTabValue] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // ── Profile data from API ──────────────────────────────────────────────────
  const [profileData, setProfileData] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  // ── Edit form ──────────────────────────────────────────────────────────────
  const [profileForm, setProfileForm] = useState({ name: "", bio: "", phoneNumber: "" })

  // ── Settings (password change) ─────────────────────────────────────────────
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [passwordSaving, setPasswordSaving] = useState(false)

  // ── Posts & listings ───────────────────────────────────────────────────────
  const [myPosts, setMyPosts] = useState([])
  const [myListings, setMyListings] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  // ── Avatar uploading ───────────────────────────────────────────────────────
  const [avatarUploading, setAvatarUploading] = useState(false)

  // ─── Fetch profile on mount ────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true)
        const { data } = await api.get("/users/me")
        setProfileData(data)
        setProfileForm({ name: data.name || "", bio: data.bio || "", phoneNumber: data.phoneNumber || "" })
      } catch (err) {
        console.error("Failed to load profile:", err)
        // Fallback to session user
        if (user) {
          setProfileData({ ...user, createdAt: new Date().toISOString() })
          setProfileForm({ name: user.name || "", bio: user.bio || "", phoneNumber: user.phoneNumber || "" })
        }
      } finally {
        setProfileLoading(false)
      }
    }
    if (user) fetchProfile()
  }, [user])

  // ─── Fetch posts & listings ────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setDataLoading(true)
      try {
        const [postsRes, productsRes] = await Promise.all([
          api.get("/posts"),
          api.get(`/products?limit=50`)
        ])

        if (postsRes.data?.data) {
          const userPosts = postsRes.data.data
            .filter(p => p.authorId === user.id)
            .map(p => ({
              id: p.id,
              author: { name: p.author?.name, avatar: p.author?.avatar, role: p.author?.role },
              date: new Date(p.createdAt).toLocaleDateString(),
              content: p.content,
              image: p.mediaUrl,
              likes: p.likeCount,
              comments: p.comments?.length || 0,
              tags: []
            }))
          setMyPosts(userPosts)
        }

        if (productsRes.data?.data) {
          const userProducts = productsRes.data.data
            .filter(p => p.sellerId === user.id)
            .map(p => ({
              id: p.id,
              name: p.title,
              price: p.isFree ? 0 : p.price,
              status: "active",
              image: p.images?.[0] || "/images/placeholder.svg",
            }))
          setMyListings(userProducts)
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err)
      } finally {
        setDataLoading(false)
      }
    }
    fetchData()
  }, [user])

  // ─── Save profile edit ─────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    try {
      setErrorMessage("")
      const { data } = await api.put("/users/me", {
        name: profileForm.name,
        bio: profileForm.bio,
        phoneNumber: profileForm.phoneNumber,
      })
      setProfileData(prev => ({ ...prev, ...data }))
      setUser(prev => ({ ...prev, name: data.name, avatar: data.avatar, phoneNumber: data.phoneNumber }))
      setEditMode(false)
      setSuccessMessage(t("profileUpdated") || "Profile updated successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (err) {
      setErrorMessage(err.response?.data?.error || "Failed to update profile.")
    }
  }

  // ─── Avatar upload ─────────────────────────────────────────────────────────
  const handleAvatarFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatarUploading(true)
    setErrorMessage("")
    try {
      const formData = new FormData()
      formData.append("files", file)
      // Use the /upload proxy endpoint which calls UploadThing
      const uploadRes = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const newUrl = uploadRes.data?.urls?.[0]
      if (newUrl) {
        // Also persist via users/me as a fallback if server-side didn't run
        await api.put("/users/me", { avatar: newUrl })
        setProfileData(prev => ({ ...prev, avatar: newUrl }))
        setUser(prev => ({ ...prev, avatar: newUrl }))
        setSuccessMessage(t("avatarUpdated") || "Profile photo updated!")
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (err) {
      console.error("Avatar upload failed:", err)
      setErrorMessage("Failed to upload photo. Please try again.")
    } finally {
      setAvatarUploading(false)
    }
  }

  // ─── Change password ───────────────────────────────────────────────────────
  const handlePasswordChange = async () => {
    setPasswordError("")
    setPasswordSuccess("")

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setPasswordError("Please fill in all password fields.")
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.")
      return
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.")
      return
    }

    setPasswordSaving(true)
    try {
      await api.put("/users/me/password", {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })
      setPasswordSuccess("Password updated successfully!")
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setPasswordSuccess(""), 4000)
    } catch (err) {
      setPasswordError(err.response?.data?.error || "Failed to update password.")
    } finally {
      setPasswordSaving(false)
    }
  }

  const handleRedeemPoints = () => navigate("/redeem-points")

  if (profileLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  const displayData = profileData || {}
  const joinDate = displayData.createdAt
    ? new Date(displayData.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "—"

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* ─── Left Column: User Card ─── */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              {successMessage && (
                <Box sx={{ mb: 3 }}>
                  <Alert severity="success" onClose={() => setSuccessMessage("")}>{successMessage}</Alert>
                </Box>
              )}
              {errorMessage && (
                <Box sx={{ mb: 3 }}>
                  <Alert severity="error" onClose={() => setErrorMessage("")}>{errorMessage}</Alert>
                </Box>
              )}

              {/* Avatar — clickable to upload */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <input
                  accept="image/*"
                  type="file"
                  ref={avatarInputRef}
                  style={{ display: "none" }}
                  onChange={handleAvatarFileChange}
                />
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      size="small"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={avatarUploading}
                      sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" }, width: 34, height: 34 }}
                    >
                      {avatarUploading
                        ? <CircularProgress size={16} color="inherit" />
                        : <PhotoCameraIcon fontSize="small" />}
                    </IconButton>
                  }
                >
                  <Avatar
                    src={displayData.avatar}
                    alt={displayData.name}
                    onClick={() => avatarInputRef.current?.click()}
                    sx={{
                      width: 120, height: 120, mb: 2,
                      border: "4px solid", borderColor: "primary.light",
                      cursor: "pointer",
                      "&:hover": { opacity: 0.85 },
                    }}
                  />
                </Badge>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {displayData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t("memberSince")} {joinDate}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap", justifyContent: "center" }}>
                  <Chip
                    icon={<VerifiedUserIcon />}
                    label={t("verified") || "Verified"}
                    color="success"
                    size="small"
                    sx={{ bgcolor: "success.light", color: "success.dark" }}
                  />
                  {displayData.role && (
                    <Chip label={displayData.role} size="small" color="primary" variant="outlined" />
                  )}
                </Box>
              </Box>

              {!editMode ? (
                <Box>
                  {displayData.bio && (
                    <Typography variant="body1" paragraph>{displayData.bio}</Typography>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">{t("email")}</Typography>
                    <Typography variant="body2">{displayData.email}</Typography>
                  </Box>
                  {displayData.phoneNumber && (
                    <Box sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">{t("phone")}</Typography>
                        <Typography variant="body2">{displayData.phoneNumber}</Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box component="form">
                  <TextField fullWidth label={t("name") || "Name"} name="name" value={profileForm.name}
                    onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} margin="normal" />
                  <TextField fullWidth label={t("bio")} name="bio" value={profileForm.bio}
                    onChange={e => setProfileForm(p => ({ ...p, bio: e.target.value }))} multiline rows={3} margin="normal" />
                  <TextField fullWidth label={t("phone")} name="phoneNumber" value={profileForm.phoneNumber}
                    onChange={e => setProfileForm(p => ({ ...p, phoneNumber: e.target.value }))} margin="normal"
                    placeholder="+201012345678" />
                </Box>
              )}

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                {editMode ? (
                  <>
                    <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSaveProfile} sx={{ mr: 1 }}>
                      {t("save")}
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={() => setEditMode(false)}>
                      {t("cancel")}
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
                    {t("editProfile")}
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* ─── Right Column: Tabs ─── */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 2 }}>
              <Tabs
                value={tabValue}
                onChange={(_, v) => setTabValue(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ px: 2, pt: 2, borderBottom: 1, borderColor: "divider", "& .MuiTab-root": { minWidth: 110, fontWeight: 600 } }}
              >
                <Tab icon={<PostAddIcon />} label={t("tabPosts")} iconPosition="start" />
                <Tab icon={<ShoppingBagIcon />} label={t("tabMarketplace")} iconPosition="start" />
                <Tab icon={<BarChartIcon />} label={t("tabStatistics")} iconPosition="start" />
                <Tab icon={<SettingsIcon />} label={t("settings")} iconPosition="start" />
              </Tabs>

              <Box sx={{ p: 3 }}>

                {/* ── Posts Tab (0) ── */}
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t("tabPosts")}</Typography>
                    {dataLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress /></Box>
                    ) : myPosts.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">{t("noPosts")}</Typography>
                    ) : (
                      myPosts.map((post) => (
                        <Card key={post.id} sx={{ mb: 2, borderRadius: 2 }}>
                          <CardHeader
                            avatar={<Avatar src={post.author.avatar} alt={post.author.name} />}
                            title={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{post.author.name}</Typography>}
                            subheader={post.date}
                            action={
                              <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                            }
                          />
                          <CardContent sx={{ pt: 0 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>{post.content}</Typography>
                            {post.image && (
                              <Box component="img" src={post.image} alt="post"
                                sx={{ width: "100%", borderRadius: 1, mb: 1, maxHeight: 200, objectFit: "cover" }} />
                            )}
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: "flex", gap: 3 }}>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <FavoriteIcon sx={{ fontSize: 16, color: "error.main" }} />
                                <Typography variant="caption" color="text.secondary">{post.likes}</Typography>
                              </Box>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <CommentIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                                <Typography variant="caption" color="text.secondary">{post.comments}</Typography>
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </Box>
                )}

                {/* ── Marketplace Tab (1) ── */}
                {tabValue === 1 && (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>{t("yourListings")}</Typography>
                      <Button variant="contained" color="primary" size="small" onClick={() => navigate("/list-item")}>
                        {t("newListing")}
                      </Button>
                    </Box>
                    {dataLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}><CircularProgress /></Box>
                    ) : myListings.length === 0 ? (
                      <Typography variant="body2" color="text.secondary">{t("noItemsFound") || "No listings found."}</Typography>
                    ) : (
                      <List disablePadding>
                        {myListings.map((item) => (
                          <ListItem key={item.id} sx={{ mb: 2, bgcolor: "background.paper", borderRadius: 1, boxShadow: "0px 2px 8px rgba(0,0,0,0.05)" }}>
                            <ListItemAvatar>
                              <Avatar variant="rounded" src={item.image} alt={item.name} sx={{ width: 60, height: 60, mr: 1 }} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={<Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.name}</Typography>}
                              secondary={
                                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                                  {item.price === 0 ? t("free") : `${item.price} EGP`}
                                </Typography>
                              }
                            />
                            <ListItemSecondaryAction>
                              <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                    )}
                  </Box>
                )}

                {/* ── Statistics Tab (2) ── */}
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{t("tabStatistics")}</Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {[
                        { icon: <ShoppingBagIcon sx={{ fontSize: 32, color: "success.main" }} />, value: displayData._count?.products ?? 0, label: t("itemsListed") },
                        { icon: <PostAddIcon sx={{ fontSize: 32, color: "primary.main" }} />, value: displayData._count?.posts ?? 0, label: t("tabPosts") },
                      ].map((stat, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                          <Paper sx={{ p: 2, borderRadius: 2, textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
                            {stat.icon}
                            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{stat.value}</Typography>
                            <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 3, borderRadius: 2, display: "flex", alignItems: "center", gap: 2 }}>
                          <CalendarTodayIcon sx={{ color: "primary.main", fontSize: 36 }} />
                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">{t("joinDate")}</Typography>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>{joinDate}</Typography>
                          </Box>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Paper sx={{ p: 3, borderRadius: 2, textAlign: "center" }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {t("redeemPointsDescription")}
                          </Typography>
                          <Button variant="contained" color="primary" onClick={handleRedeemPoints}>
                            {t("redeemPoints")}
                          </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {/* ── Settings Tab (3) ── */}
                {tabValue === 3 && (
                  <Box>
                    {/* ── Update Name & Phone ── */}
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("accountSettings")}
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label={t("name") || "Full Name"}
                          value={profileForm.name}
                          onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label={t("phone") || "Phone Number"}
                          value={profileForm.phoneNumber}
                          onChange={e => setProfileForm(p => ({ ...p, phoneNumber: e.target.value }))}
                          placeholder="+201012345678"
                          InputProps={{ startAdornment: <PhoneIcon sx={{ color: "text.secondary", mr: 1 }} /> }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSaveProfile}
                        >
                          {t("save") || "Save Changes"}
                        </Button>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* ── Change Password ── */}
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("changePassword") || "Change Password"}
                    </Typography>
                    {passwordError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setPasswordError("")}>{passwordError}</Alert>}
                    {passwordSuccess && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setPasswordSuccess("")}>{passwordSuccess}</Alert>}
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth label={t("currentPassword") || "Current Password"}
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                          autoComplete="current-password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label={t("enterNewPassword") || "New Password"}
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth label={t("confirmNewPassword") || "Confirm New Password"}
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                          autoComplete="new-password"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlePasswordChange}
                          disabled={passwordSaving}
                          startIcon={passwordSaving ? <CircularProgress size={16} color="inherit" /> : null}
                        >
                          {t("updatePassword") || "Update Password"}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}

              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProfilePage
