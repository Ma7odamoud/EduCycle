"use client"

import { useEffect } from "react"
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom"
import { Box, Container, Typography, Paper, Button, Divider, Grid, Chip } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HomeIcon from "@mui/icons-material/Home"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"

const PaymentSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { item, formData } = location.state || {}

  // Generate a random order number
  const orderNumber = `ZW-${Math.floor(100000 + Math.random() * 900000)}`

  // Get current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  useEffect(() => {
    // If no item data, redirect to marketplace
    if (!item && !formData) {
      navigate("/marketplace")
    }
  }, [item, formData, navigate])

  if (!item || !formData) {
    return null // Will redirect via useEffect
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: "center" }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "success.light",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 3,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 50, color: "success.main" }} />
        </Box>

        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Payment Successful!
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Thank you for your purchase. Your order has been confirmed.
        </Typography>

        <Chip label={`Order #${orderNumber}`} color="primary" sx={{ fontSize: "1rem", py: 2, px: 3, mb: 4 }} />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Order Date
              </Typography>
              <Typography variant="body1" gutterBottom>
                {currentDate}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Shipping To
              </Typography>
              <Typography variant="body1">
                {formData.firstName} {formData.lastName}
              </Typography>
              <Typography variant="body1">{formData.address}</Typography>
              <Typography variant="body1">
                {formData.city}, {formData.state} {formData.zipCode}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formData.country}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Payment Method
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formData.paymentMethod === "credit"
                  ? `Credit Card (ending in ${formData.cardNumber.slice(-4)})`
                  : formData.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : "PayPal"}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Contact Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {formData.email}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ textAlign: "left", mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={3} sm={2}>
              <Box
                component="img"
                src={item.imageUrl}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            </Grid>
            <Grid item xs={9} sm={6}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ textAlign: { xs: "left", sm: "right" } }}>
              <Typography variant="h6" color="primary.main">
                {item.price} EGP
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">{item.price} EGP</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Shipping</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">5.00 EGP</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Tax</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="body1">{(item.price * 0.08).toFixed(2)} EGP</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                  {(item.price + 5 + item.price * 0.08).toFixed(2)} EGP
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<HomeIcon />}
            component={RouterLink}
            to="/"
          >
            Back to Home
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<ShoppingBagIcon />}
            component={RouterLink}
            to="/marketplace"
          >
            Continue Shopping
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default PaymentSuccessPage
