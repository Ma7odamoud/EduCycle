"use client"

import { useState } from "react"
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
  FormControlLabel,
  Checkbox,
  Alert,
} from "@mui/material"
import { useLanguage } from "../contexts/LanguageContext"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import CancelIcon from "@mui/icons-material/Cancel"
import DeleteIcon from "@mui/icons-material/Delete"
import RecyclingIcon from "@mui/icons-material/Recycling"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SettingsIcon from "@mui/icons-material/Settings"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import StarIcon from "@mui/icons-material/Star"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"

// Initial user data
const initialUserData = {
  name: "Mahmoud Youssef",
  email: "mahmoudyoussef928@gmail.com",
  phone: "+20 101 922 6744",
  address: "6 October",
  bio: "Computer Science student passionate about making tech education accessible. I love sharing reference books and helping others succeed!",
  avatar: "/images/Mahmoud.jpeg",
  joinDate: "January 2023",
  recyclingPoints: 1350,
  itemsRecycled: 48,
  itemsListed: 12,
  itemsSold: 8,
  favoriteItems: 15,
}

// Mock activity data
const recentActivity = [
  {
    id: 1,
    type: "recycling",
    title: "Donated 5 old notebooks",
    date: "2 days ago",
    points: 25,
    icon: RecyclingIcon,
  },
  {
    id: 2,
    type: "marketplace",
    title: "Listed 'Intro to Networks' Book",
    date: "1 week ago",
    points: 0,
    icon: ShoppingBagIcon,
  },
  {
    id: 3,
    type: "recycling",
    title: "Shared lecture summaries",
    date: "2 weeks ago",
    points: 150,
    icon: RecyclingIcon,
  },
  {
    id: 4,
    type: "marketplace",
    title: "Received 'Advanced Programming' Book",
    date: "3 weeks ago",
    points: 0,
    icon: ShoppingBagIcon,
  },
]

// Mock listed items
const listedItems = [
  {
    id: 1,
    name: "مقدمة البرمجة",
    price: 1800,
    status: "active",
    image: "/images/Programming.jpeg",
    views: 45,
  },
  {
    id: 2,
    name: "كتاب المتاحف و المعارض التعليمية",
    price: 0,
    status: "sold",
    image: "/images/mta7f.jpeg",
    views: 78,
  },
  {
    id: 3,
    name: "معالجة الصور و الرسومات",
    price: 50,
    status: "active",
    image: "/images/photos.jpeg",
    views: 32,
  },
]

// Mock purchase history
const purchaseHistory = [
  {
    id: 1,
    name: "لغات البرمجة المتقدمة",
    price: 750,
    date: "May 15, 2023",
    status: "Delivered",
    image: "/images/lang.jpeg",
    seller: "Ali Hassan",
  },
  {
    id: 2,
    name: "علم نفس النمو",
    price: 0,
    date: "April 3, 2023",
    status: "Delivered",
    image: "/images/elm-nafs.jpeg",
    seller: "Fatma Ibrahim",
  },
  {
    id: 3,
    name: "محاضرات في التعليم الإلكتروني",
    price: 0,
    date: "March 22, 2023",
    status: "Delivered",
    image: "/images/elta3lem.jpeg",
    seller: "Arwa Mohammed",
  },
]

const ProfilePage = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [userData, setUserData] = useState(initialUserData)
  const [userForm, setUserForm] = useState({ ...userData })
  const [successMessage, setSuccessMessage] = useState("")

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleEditToggle = () => {
    if (editMode) {
      // If canceling edit, reset form
      setUserForm({ ...userData })
    }
    setEditMode(!editMode)
  }

  const handleSaveProfile = () => {
    // Update the userData state with the form values
    setUserData({ ...userForm })
    setEditMode(false)
    setSuccessMessage("Profile updated successfully!")

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("")
    }, 3000)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setUserForm({
      ...userForm,
      [name]: value,
    })
  }

  const handleRedeemPoints = () => {
    navigate("/redeem-points")
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column - User Profile */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              {successMessage && (
                <Box sx={{ mb: 3 }}>
                  <Alert severity="success" onClose={() => setSuccessMessage("")}>
                    {successMessage}
                  </Alert>
                </Box>
              )}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    editMode ? (
                      <IconButton
                        size="small"
                        sx={{ bgcolor: "primary.main", color: "white", "&:hover": { bgcolor: "primary.dark" } }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    ) : null
                  }
                >
                  <Avatar
                    src={userData.avatar}
                    alt={userData.name}
                    sx={{ width: 120, height: 120, mb: 2, border: "4px solid", borderColor: "primary.light" }}
                  />
                </Badge>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {userData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {t("memberSince")} {userData.joinDate}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                  <Chip
                    icon={<RecyclingIcon />}
                    label={`${userData.recyclingPoints} ${t("points")}`}
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<VerifiedUserIcon />}
                    label={t("verified")}
                    color="success"
                    size="small"
                    sx={{ bgcolor: "success.light", color: "success.dark" }}
                  />
                </Box>
              </Box>

              {!editMode ? (
                <Box>
                  <Typography variant="body1" paragraph>
                    {userData.bio}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t("email")}
                    </Typography>
                    <Typography variant="body2">{userData.email}</Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t("phone")}
                    </Typography>
                    <Typography variant="body2">{userData.phone}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t("address")}
                    </Typography>
                    <Typography variant="body2">{userData.address}</Typography>
                  </Box>
                </Box>
              ) : (
                <Box component="form">
                  <TextField
                    fullWidth
                    label={t("bio")}
                    name="bio"
                    value={userForm.bio}
                    onChange={handleFormChange}
                    multiline
                    rows={3}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label={t("email")}
                    name="email"
                    value={userForm.email}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label={t("phone")}
                    name="phone"
                    value={userForm.phone}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label={t("address")}
                    name="address"
                    value={userForm.address}
                    onChange={handleFormChange}
                    margin="normal"
                  />
                </Box>
              )}

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                {editMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveIcon />}
                      onClick={handleSaveProfile}
                      sx={{ mr: 1 }}
                    >
                      {t("save")}
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={handleEditToggle}>
                      {t("cancel")}
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" color="primary" startIcon={<EditIcon />} onClick={handleEditToggle}>
                    {t("editProfile")}
                  </Button>
                )}
              </Box>
            </Paper>


          </Grid>

          {/* Right Column - Tabs and Content */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 2 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  px: 2,
                  pt: 2,
                  borderBottom: 1,
                  borderColor: "divider",
                  "& .MuiTab-root": {
                    minWidth: 120,
                    fontWeight: 600,
                  },
                }}
              >
                <Tab icon={<RecyclingIcon />} label={t("activity")} iconPosition="start" />
                <Tab icon={<ShoppingBagIcon />} label={t("listings")} iconPosition="start" />
                <Tab icon={<LocalShippingIcon />} label={t("purchases")} iconPosition="start" />
                <Tab icon={<FavoriteIcon />} label={t("favorites")} iconPosition="start" />
                <Tab icon={<SettingsIcon />} label={t("settings")} iconPosition="start" />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {/* Activity Tab */}
                {tabValue === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("recentActivity")}
                    </Typography>
                    <List>
                      {recentActivity.map((activity) => (
                        <ListItem
                          key={activity.id}
                          sx={{
                            mb: 2,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              sx={{
                                bgcolor: activity.type === "recycling" ? "success.light" : "primary.light",
                              }}
                            >
                              <activity.icon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={activity.title}
                            secondary={activity.date}
                            primaryTypographyProps={{ fontWeight: 600 }}
                          />
                          {activity.points > 0 && (
                            <Chip
                              label={`+${activity.points} pts`}
                              color="success"
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>

                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {t("statistics")}
                      </Typography>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                          <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                            <Grid container spacing={2} sx={{ mt: 1 }}>
                              <Grid item xs={6}>
                                <Box sx={{ textAlign: "center", p: 1 }}>
                                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                                    {userData.itemsRecycled}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {t("itemsRecycled")}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ textAlign: "center", p: 1 }}>
                                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                                    {userData.itemsListed}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {t("itemsListed")}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ textAlign: "center", p: 1 }}>
                                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                                    {userData.itemsSold}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {t("itemsSold")}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ textAlign: "center", p: 1 }}>
                                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                                    {userData.favoriteItems}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {t("favorites")}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>

                        <Grid item xs={12} md={5}>
                          <Paper sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                              <RecyclingIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                                {userData.recyclingPoints}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                              {t("redeemPointsDescription")}
                            </Typography>
                            <Box sx={{ textAlign: "center" }}>
                              <Button variant="contained" color="primary" onClick={handleRedeemPoints}>
                                {t("redeemPoints")}
                              </Button>
                            </Box>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* Listings Tab */}
                {tabValue === 1 && (
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {t("yourListings")}
                      </Typography>
                      <Button variant="contained" color="primary" size="small">
                        {t("newListing")}
                      </Button>
                    </Box>

                    <List>
                      {listedItems.map((item) => (
                        <ListItem
                          key={item.id}
                          sx={{
                            mb: 2,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              variant="rounded"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 60, height: 60, mr: 1 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {item.name}
                                </Typography>
                                <Chip
                                  label={item.status === "active" ? t("active") : t("sold")}
                                  color={item.status === "active" ? "success" : "default"}
                                  size="small"
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                                  {item.price} EGP
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {item.views} {t("views")}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" sx={{ ml: 1 }}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Purchases Tab */}
                {tabValue === 2 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("purchaseHistory")}
                    </Typography>
                    <List>
                      {purchaseHistory.map((item) => (
                        <ListItem
                          key={item.id}
                          sx={{
                            mb: 2,
                            bgcolor: "background.paper",
                            borderRadius: 1,
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              variant="rounded"
                              src={item.image}
                              alt={item.name}
                              sx={{ width: 60, height: 60, mr: 1 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                  {item.name}
                                </Typography>
                                <Chip label={t("delivered")} color="success" size="small" sx={{ ml: 1 }} />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600 }}>
                                  {item.price} EGP
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {t("purchasedOn")} {item.date} {t("from")} {item.seller}
                                </Typography>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <Button size="small" variant="outlined" color="primary">
                              {t("buyAgain")}
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Favorites Tab */}
                {tabValue === 3 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("favoriteItems")}
                    </Typography>
                    <Grid container spacing={2}>
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={12} sm={6} key={item}>
                          <Card sx={{ display: "flex", height: "100%" }}>
                            <Box
                              sx={{
                                width: 100,
                                height: 100,
                                backgroundImage: `url(https://source.unsplash.com/100x100/?product,${item})`,
                                backgroundSize: "cover",
                              }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Favorite Item {item}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Short description of the item
                              </Typography>
                              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                <Typography variant="body1" color="primary.main" sx={{ fontWeight: 600, mr: 1 }}>
                                  99 EGP
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                                  <StarIcon sx={{ fontSize: 16, color: "warning.main" }} />
                                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                                    4.5
                                  </Typography>
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* Settings Tab */}
                {tabValue === 4 && (
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("accountSettings")}
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField fullWidth label={t("changePassword")} type="password" placeholder={t("enterNewPassword")} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label={t("confirmPassword")}
                          type="password"
                          placeholder={t("confirmNewPassword")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button variant="contained" color="primary">
                          {t("updatePassword")}
                        </Button>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {t("notificationPreferences")}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={t("emailNotifMessage")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={t("emailNotifMarket")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox defaultChecked />}
                          label={t("emailNotifRecycle")}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel control={<Checkbox />} label={t("smsNotif")} />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3 }}>
                      <Button variant="contained" color="primary">
                        {t("savePreferences")}
                      </Button>
                    </Box>
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
