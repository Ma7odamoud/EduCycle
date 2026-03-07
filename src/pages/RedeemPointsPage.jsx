"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import RecyclingIcon from "@mui/icons-material/Recycling"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

// Mock rewards data
const rewards = [
  {
    id: 1,
    title: "50 EGP Discount Voucher",
    description: "Get 50 EGP off your next purchase in our marketplace",
    pointsRequired: 500,
    category: "discounts",
    image: "/images/voucher.png",
  },
  {
    id: 2,
    title: "Free Shipping",
    description: "Free shipping on your next order",
    pointsRequired: 1000,
    category: "services",
    image: "/images/shipping.jpg",
  },
  {
    id: 3,
    title: "75 EGP Gift Coupon",
    description: "75 EGP gift coupon for any eco-friendly product",
    pointsRequired: 750,
    category: "coupons",
    image: "/images/gift.jpg",
  },

  {
    id: 5,
    title: "25 EGP Discount Voucher",
    description: "Get 25 EGP off your next purchase in our marketplace",
    pointsRequired: 300,
    category: "discounts",
    image: "/images/voucher.png",
  },

]

// Mock redemption history
const redemptionHistory = [
  {
    id: 1,
    date: "May 15, 2025",
    item: "25 EGP Coupon",
    pointsUsed: 300,
    status: "Redeemed",
  },
  {
    id: 2,
    date: "May 1, 2025",
    item: "Product Delivery",
    pointsUsed: 1000,
    status: "Redeemed",
  },
  {
    id: 3,
    date: "April 10, 2025",
    item: "50 EGP Discount Voucher",
    pointsUsed: 500,
    status: "Redeemed",
  },
]

const RedeemPointsPage = () => {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)

  // User points - in a real app, this would come from user data/context
  const userPoints = 1350

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleRedeemClick = (reward) => {
    setSelectedReward(reward)
    setDialogOpen(true)
  }

  const handleConfirmRedeem = () => {
    // In a real app, you would make an API call to redeem the points
    // and update the user's points balance
    setDialogOpen(false)

    // Show success message or redirect to confirmation page
    alert(`Successfully redeemed ${selectedReward.pointsRequired} points for ${selectedReward.title}!`)
  }

  const handleBackToProfile = () => {
    navigate("/profile")
  }

  // Filter rewards based on selected tab
  const getFilteredRewards = () => {
    if (tabValue === 0) return rewards

    const categories = ["discounts", "products", "services", "coupons"]
    return rewards.filter((reward) => reward.category === categories[tabValue - 1])
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={handleBackToProfile} sx={{ mb: 3 }}>
          Back to Profile
        </Button>

        <Grid container spacing={4}>
          {/* Left Column - Points Balance and History */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Points Balance
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  p: 3,
                  my: 2,
                }}
              >
                <RecyclingIcon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
                <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>
                  {userPoints}
                </Typography>
              </Box>

              <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                🎯 Your Current Points: <strong>{userPoints}</strong>
              </Typography>

              <Typography variant="body2" color="text.secondary" align="center">
                Use your points to redeem rewards and discounts on eco-friendly products and services.
              </Typography>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Redemption History
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell>Points</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {redemptionHistory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.item}</TableCell>
                        <TableCell>{item.pointsUsed}</TableCell>
                        <TableCell>
                          <Chip icon={<CheckCircleIcon />} label={item.status} color="success" size="small" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Right Column - Rewards */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ borderRadius: 2, p: 3 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Redeem Your Points
              </Typography>

              <Typography variant="body1" paragraph color="text.secondary">
                Choose from a variety of rewards and redeem your hard-earned recycling points.
              </Typography>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="All" />
                <Tab label="Discounts" />
                <Tab label="Products" />
                <Tab label="Services" />
                <Tab label="Coupons" />
              </Tabs>

              <Grid container spacing={3}>
                {getFilteredRewards().map((reward) => (
                  <Grid item xs={12} sm={6} key={reward.id}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardMedia component="img" height="140" image={reward.image} alt={reward.title} />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {reward.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {reward.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Chip
                            icon={<RecyclingIcon />}
                            label={`${reward.pointsRequired} points`}
                            color="primary"
                            variant="outlined"
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={userPoints < reward.pointsRequired}
                            onClick={() => handleRedeemClick(reward)}
                          >
                            Redeem Now
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Redemption</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedReward && (
                <>
                  Are you sure you want to redeem <strong>{selectedReward.pointsRequired} points</strong> for{" "}
                  <strong>{selectedReward.title}</strong>?
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmRedeem} color="primary" variant="contained">
              Yes, Redeem
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default RedeemPointsPage
