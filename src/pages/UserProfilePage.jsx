"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box, Container, Grid, Paper, Typography, Avatar, Button, Chip,
  CircularProgress, Alert, Divider, Card, CardContent, CardHeader,
} from "@mui/material"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CheckIcon from "@mui/icons-material/Check"
import PeopleIcon from "@mui/icons-material/People"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import PostAddIcon from "@mui/icons-material/PostAdd"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useAuth } from "../contexts/AuthContext"
import { useLanguage } from "../contexts/LanguageContext"
import { api } from "../lib/api"

const UserProfilePage = () => {
  const { userId } = useParams()
  const { user: currentUser } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Friendship status
  const [friendshipStatus, setFriendshipStatus] = useState(null) // null | "PENDING_SENT" | "PENDING_RECEIVED" | "ACCEPTED"
  const [friendshipId, setFriendshipId] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [actionMessage, setActionMessage] = useState("")

  useEffect(() => {
    if (!userId) return

    const fetchProfile = async () => {
      setLoading(true)
      setError("")
      try {
        const { data } = await api.get(`/users/${userId}`)
        setProfile(data)
      } catch (err) {
        setError("User not found.")
      } finally {
        setLoading(false)
      }
    }

    const fetchFriendshipStatus = async () => {
      if (!currentUser) return
      try {
        const { data } = await api.get("/friends")
        const accepted = data.friends?.find(f => f.friend.id === userId)
        if (accepted) {
          setFriendshipStatus("ACCEPTED")
          setFriendshipId(accepted.friendshipId)
          return
        }
        const pending = data.pendingRequests?.find(r => r.requester.id === userId)
        if (pending) {
          setFriendshipStatus("PENDING_RECEIVED")
          setFriendshipId(pending.id)
        }
      } catch {}
    }

    fetchProfile()
    fetchFriendshipStatus()
  }, [userId, currentUser])

  const handleSendRequest = async () => {
    if (!currentUser) { navigate("/login"); return }
    setActionLoading(true)
    try {
      await api.post(`/friends/request/${userId}`)
      setFriendshipStatus("PENDING_SENT")
      setActionMessage(t("requestSentSuccess") || "Friend request sent!")
    } catch (err) {
      setActionMessage(err.response?.data?.error || "Failed to send request.")
    } finally {
      setActionLoading(false)
    }
  }

  const handleRespondToRequest = async (action) => {
    setActionLoading(true)
    try {
      await api.put(`/friends/${friendshipId}`, { action })
      setFriendshipStatus(action === "ACCEPTED" ? "ACCEPTED" : null)
      setActionMessage(action === "ACCEPTED" ? (t("nowFriends") || "You are now friends!") : (t("requestRejected") || "Request declined."))
    } catch (err) {
      setActionMessage(err.response?.data?.error || "Failed.")
    } finally {
      setActionLoading(false)
    }
  }

  const handleUnfriend = async () => {
    setActionLoading(true)
    try {
      await api.delete(`/friends/${friendshipId}`)
      setFriendshipStatus(null)
      setFriendshipId(null)
      setActionMessage(t("unfriended") || "Removed from friends.")
    } catch {
      setActionMessage("Failed to unfriend.")
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error || !profile) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Alert severity="error">{error || "User not found."}</Alert>
        <Button startIcon={<ArrowBackIcon />} sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    )
  }

  const joinDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })
    : "—"

  const isOwnProfile = currentUser?.id === userId

  const FriendButton = () => {
    if (isOwnProfile) return null

    if (friendshipStatus === "ACCEPTED") {
      return (
        <Button
          variant="outlined"
          color="error"
          startIcon={<CheckIcon />}
          onClick={handleUnfriend}
          disabled={actionLoading}
          size="small"
        >
          {t("unfriend") || "Unfriend"}
        </Button>
      )
    }

    if (friendshipStatus === "PENDING_SENT") {
      return (
        <Button variant="outlined" disabled size="small" startIcon={<CheckIcon />}>
          {t("requestSent") || "Request Sent"}
        </Button>
      )
    }

    if (friendshipStatus === "PENDING_RECEIVED") {
      return (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained" color="primary" size="small"
            onClick={() => handleRespondToRequest("ACCEPTED")}
            disabled={actionLoading}
          >
            {t("acceptRequest") || "Accept"}
          </Button>
          <Button
            variant="outlined" color="error" size="small"
            onClick={() => handleRespondToRequest("REJECTED")}
            disabled={actionLoading}
          >
            {t("rejectRequest") || "Decline"}
          </Button>
        </Box>
      )
    }

    return (
      <Button
        variant="contained" color="primary"
        startIcon={actionLoading ? <CircularProgress size={16} color="inherit" /> : <PersonAddIcon />}
        onClick={handleSendRequest}
        disabled={actionLoading}
      >
        {t("addFriend") || "Add Friend"}
      </Button>
    )
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }} onClick={() => navigate(-1)}>
          {t("back") || "Back"}
        </Button>

        {actionMessage && (
          <Alert severity="info" sx={{ mb: 3 }} onClose={() => setActionMessage("")}>{actionMessage}</Alert>
        )}

        <Paper sx={{ p: 4, borderRadius: 2, mb: 3 }}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "center", sm: "flex-start" }, gap: 3 }}>
            <Avatar
              src={profile.avatar}
              alt={profile.name}
              sx={{ width: 120, height: 120, border: "4px solid", borderColor: "primary.light", flexShrink: 0 }}
            />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1, flexWrap: "wrap", gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{profile.name}</Typography>
                <FriendButton />
              </Box>

              <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                {profile.role && <Chip label={profile.role} size="small" color="primary" />}
                {friendshipStatus === "ACCEPTED" && (
                  <Chip icon={<PeopleIcon />} label={t("friends") || "Friends"} size="small" color="success" />
                )}
              </Box>

              {profile.bio && (
                <Typography variant="body1" color="text.secondary" paragraph>{profile.bio}</Typography>
              )}

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
                <CalendarTodayIcon fontSize="small" />
                <Typography variant="body2">{t("memberSince")} {joinDate}</Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Stats */}
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <ShoppingBagIcon sx={{ fontSize: 28, color: "success.main" }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{profile._count?.products ?? 0}</Typography>
                <Typography variant="caption" color="text.secondary">{t("itemsListed") || "Items Listed"}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box sx={{ textAlign: "center" }}>
                <PostAddIcon sx={{ fontSize: 28, color: "primary.main" }} />
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{profile._count?.posts ?? 0}</Typography>
                <Typography variant="caption" color="text.secondary">{t("tabPosts") || "Posts"}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Gated content — only visible to friends */}
        {friendshipStatus === "ACCEPTED" ? (
          <Card sx={{ borderRadius: 2 }}>
            <CardHeader title={t("communityActivity") || "Community Activity"} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {t("friendsContentVisible") || "You can see this user's full community activity because you are friends."}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          !isOwnProfile && (
            <Paper sx={{ p: 3, textAlign: "center", borderRadius: 2, bgcolor: "grey.50" }}>
              <PeopleIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
              <Typography variant="h6" color="text.secondary">
                {t("addFriendToSeeMore") || "Add as a friend to see their full profile & activity"}
              </Typography>
            </Paper>
          )
        )}
      </Container>
    </Box>
  )
}

export default UserProfilePage
