"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Divider,
  Paper,
  Rating,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  IconButton,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser"
import RecyclingIcon from "@mui/icons-material/Recycling"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import { api } from "../lib/api"

// --- ORIGINAL FULL DATA ARRAY (600+ LINES STYLE) ---
const items = [
  {
    id: 1,
    name: "كتاب المتاحف و المعارض التعليمية",
    description: "حالة جيدة.",
    longDescription: "حالة جيدة. كتاب المتاحف و المعارض التعليمية.",
    price: 0,
    imageUrl: "/images/mta7f.jpeg",
    additionalImages: ["/images/mta7f.jpeg", "/images/mta7f.jpeg", "/images/mta7f.jpeg"],
    rating: 4.5,
    reviews: 24,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.8,
      sales: 15,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 2,
    name: "محاضرات في التعليم الإلكتروني",
    description: "حالة جيدة.",
    longDescription: "محاضرات في التعليم الإلكتروني. حالة جيدة.",
    price: 0,
    imageUrl: "/images/elta3lem.jpeg",
    additionalImages: ["/images/elta3lem.jpeg", "/images/elta3lem.jpeg", "/images/elta3lem.jpeg"],
    rating: 4.8,
    reviews: 12,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.9,
      sales: 22,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 3,
    name: "مدخل الي علوم نفسية",
    description: "حالة جيدة.",
    longDescription: "مدخل الي علوم نفسية. حالة جيدة.",
    price: 0,
    imageUrl: "/images/nafsia.jpeg",
    additionalImages: ["/images/nafsia.jpeg", "/images/nafsia.jpeg", "/images/nafsia.jpeg"],
    rating: 4.2,
    reviews: 5,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.7,
      sales: 8,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 4,
    name: "علم نفس النمو",
    description: "حالة جيدةالي حد ما",
    longDescription: "علم نفس النمو. حالة جيدةالي حد ما",
    price: 0,
    imageUrl: "/images/elm-nafs.jpeg",
    additionalImages: ["/images/elm-nafs.jpeg", "/images/elm-nafs.jpeg", "/images/elm-nafs.jpeg"],
    rating: 4.6,
    reviews: 18,
    category: "book",
    condition: "Fair",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.5,
      sales: 11,
      avatar: "/images/Omar.jpg",
    },
    features: ["Fair condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 5,
    name: "معالجة الصور و الرسومات",
    description: "حالة جيدة.",
    longDescription: "معالجة الصور و الرسومات. حالة جيدة.",
    price: 50,
    imageUrl: "/images/photos.jpeg",
    additionalImages: ["/images/photos.jpeg", "/images/photos.jpeg", "/images/photos.jpeg"],
    rating: 4.7,
    reviews: 30,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.9,
      sales: 45,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 6,
    name: "مقدمة البرمجة",
    description: "حالة جيدة.",
    longDescription: "مقدمة البرمجة. حالة جيدة.",
    price: 1800,
    imageUrl: "/images/Programming.jpeg",
    additionalImages: ["/images/Programming.jpeg", "/images/Programming.jpeg", "/images/Programming.jpeg"],
    rating: 4.9,
    reviews: 42,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 5.0,
      sales: 50,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 7,
    name: "لغات البرمجة المتقدمة",
    description: "حالة جيدة.",
    longDescription: "لغات البرمجة المتقدمة. حالة جيدة.",
    price: 750,
    imageUrl: "/images/lang.jpeg",
    additionalImages: ["/images/lang.jpeg", "/images/lang.jpeg", "/images/lang.jpeg"],
    rating: 4.4,
    reviews: 14,
    category: "book",
    condition: "Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.6,
      sales: 20,
      avatar: "/images/Omar.jpg",
    },
    features: ["Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
  {
    id: 8,
    name: "مقدمة في الشبكات",
    description: "كتاب بحالة جيدة جدا.",
    longDescription: "مقدمة في الشبكات. كتاب بحالة جيدة جدا.",
    price: 20,
    imageUrl: "/images/Shabakat.jpeg",
    additionalImages: ["/images/Shabakat.jpeg", "/images/Shabakat.jpeg", "/images/Shabakat.jpeg"],
    rating: 4.8,
    reviews: 35,
    category: "book",
    condition: "Very Good",
    phoneNumber: "+201027643232",
    seller: {
      name: "Student",
      rating: 4.9,
      sales: 38,
      avatar: "/images/Omar.jpg",
    },
    features: ["Very Good condition", "Educational Book"],
    sustainabilityImpact: "By sharing this item within the community, you're reducing waste and supporting a circular economy.",
  },
]

const ItemDetailsPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true)
      try {
        // 1. Search in our static list first
        const foundItem = items.find((item) => item.id === Number.parseInt(id))
        
        if (foundItem) {
          setItem(foundItem)
          setMainImage(foundItem.imageUrl)
          setLoading(false)
          return
        }

        // 2. Fetch from backend API
        const response = await api.get(`/products/${id}`)
        const dynamicItem = response.data

        const formatted = {
          id: dynamicItem.id,
          name: dynamicItem.title,
          description: dynamicItem.description,
          longDescription: dynamicItem.description,
          price: dynamicItem.isFree ? 0 : dynamicItem.price,
          imageUrl: dynamicItem.images?.[0] || "/images/placeholder.svg",
          additionalImages: dynamicItem.images?.length > 0 ? dynamicItem.images : ["/images/placeholder.svg", "/images/placeholder.svg", "/images/placeholder.svg"],
          rating: 0,
          reviews: 0,
          category: dynamicItem.category?.toLowerCase() || "item",
          condition: "Used",
          phoneNumber: dynamicItem.phoneNumber || "",
          seller: {
            name: dynamicItem.seller?.name || "Member",
            rating: 0,
            sales: 0,
            avatar: dynamicItem.seller?.avatar || "/images/placeholder.svg",
          },
          features: ["Community Item"],
          sustainabilityImpact: "By sharing this item, you reduce waste and support the circular economy.",
        }
        
        setItem(formatted)
        setMainImage(formatted.imageUrl)
      } catch (error) {
        console.error("Failed to load item:", error)
        setItem(null)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleImageClick = (image) => {
    setMainImage(image)
  }

  const handleAddToCart = () => {
    navigate("/payment", { state: { item } })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleContactSeller = () => {
    if (!item.phoneNumber) return
    const message = encodeURIComponent("I am interested in your product.")
    const whatsappUrl = `https://wa.me/${item.phoneNumber}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  if (loading) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!item) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4">Item not found</Typography>
        <Button component={RouterLink} to="/marketplace" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Marketplace
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/marketplace" color="inherit">
            Marketplace
          </Link>
          <Link component={RouterLink} to={`/marketplace?category=${item.category}`} color="inherit">
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Link>
          <Typography color="text.primary">{item.name}</Typography>
        </Breadcrumbs>

        <Button
          component={RouterLink}
          to="/marketplace"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
          color="primary"
          variant="text"
        >
          Back to Marketplace
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.100",
              }}
            >
              <Box
                component="img"
                src={mainImage}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Paper>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 1,
                    overflow: "hidden",
                    height: 80,
                    cursor: "pointer",
                    border: mainImage === (item.imageUrl || item.additionalImages[0]) ? "2px solid" : "none",
                    borderColor: "primary.main",
                  }}
                  onClick={() => handleImageClick(item.imageUrl || item.additionalImages[0])}
                >
                  <Box
                    component="img"
                    src={item.imageUrl || item.additionalImages[0]}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Paper>
              </Grid>
              {item.additionalImages.slice(1).map((image, index) => (
                <Grid item xs={3} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 1,
                      overflow: "hidden",
                      height: 80,
                      cursor: "pointer",
                      border: mainImage === image ? "2px solid" : "none",
                      borderColor: "primary.main",
                    }}
                    onClick={() => handleImageClick(image)}
                  >
                    <Box component="img" src={image} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                  {item.name}
                </Typography>
                <IconButton onClick={handleToggleFavorite} color="primary">
                  {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={item.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({item.reviews} reviews)
                </Typography>
                <Chip label={item.condition} size="small" color="primary" variant="outlined" sx={{ ml: 2 }} />
              </Box>

              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700, mb: 3 }}>
                {item.price === 0 ? "FREE" : `${item.price} EGP`}
              </Typography>

              <Typography variant="body1" paragraph sx={{ whiteSpace: "pre-line" }}>
                {item.longDescription}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar src={item.seller.avatar} sx={{ mr: 2 }}>{item.seller.name[0]}</Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Seller: {item.seller.name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating value={item.seller.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      ({item.seller.sales} sales)
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Sustainability Impact
                </Typography>
                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                  <RecyclingIcon color="primary" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography variant="body2">{item.sustainabilityImpact}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                {item.phoneNumber ? (
                  <Button
                    variant="outlined"
                    color="success"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleContactSeller}
                  >
                    Contact via WhatsApp
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    startIcon={<WhatsAppIcon />}
                    disabled
                  >
                    Contact Unavailable
                  </Button>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <VerifiedUserIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Buyer protection guarantee" />
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tab label="Features" />
            <Tab label="Reviews" />
            <Tab label="Shipping" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Product Features
              </Typography>
              <List>
                {item.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Customer Reviews
              </Typography>
              <Typography variant="body2">Reviews will be displayed here. This feature is coming soon.</Typography>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Shipping Information
              </Typography>
              <Typography variant="body2" paragraph>
                We offer campus-wide delivery. Standard delivery typically takes 1-2 business days.
              </Typography>
              <Typography variant="body2">
                For more information about shipping options and rates, please contact the seller via WhatsApp.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default ItemDetailsPage