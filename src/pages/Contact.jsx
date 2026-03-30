"use client"

import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Card,
  Stack,
  MenuItem,
} from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import SendIcon from "@mui/icons-material/Send"
import SectionTitle from "../components/SectionTitle"
import { useLanguage } from "../contexts/LanguageContext" // Changed import path
import AnimatedSection from "../components/AnimatedSection" // New import

const Contact = () => {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    console.log("Form submitted:", formData)
    setSubmitted(true)
    // Reset form after delay
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <EmailIcon fontSize="large" color="primary" />,
      title: t("emailUs"),
      content: "support@educycle.com",
      link: "mailto:support@educycle.com",
    },
    {
      icon: <PhoneIcon fontSize="large" color="primary" />,
      title: t("callUs"),
      content: "+20 123 456 7890",
      link: "tel:+201234567890",
    },
    {
      icon: <LocationOnIcon fontSize="large" color="primary" />,
      title: t("visitUs"),
      content: "Cairo, Egypt",
      link: "https://maps.google.com",
    },
  ]

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 5, md: 8 },
          mb: { xs: 3, md: 6 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <AnimatedSection>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", md: "3rem" } }}
            >
              {t("contactTitle")}
            </Typography>
            <Typography variant="h6" align="center" sx={{ opacity: 0.9, fontSize: { xs: "0.95rem", md: "1.25rem" }, px: { xs: 2, md: 0 } }}>
              {t("contactSubtitle")}
            </Typography>
          </AnimatedSection>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Info and Map */}
          <Grid item xs={12} md={5}>
            <AnimatedSection direction="right">
              <Box sx={{ mb: 6 }}>
                <SectionTitle align="left">{t("getInTouch")}</SectionTitle>
                <Typography variant="body1" paragraph color="text.secondary">
                  {t("getInTouchDesc")}
                </Typography>

                <Stack spacing={3} sx={{ mt: 4 }}>
                  {contactInfo.map((info, index) => (
                    <Paper
                      key={index}
                      elevation={2}
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        borderRadius: 2,
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Box sx={{ mr: 2 }}>{info.icon}</Box>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {info.title}
                        </Typography>
                        <Typography
                          component="a"
                          href={info.link}
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "none", "&:hover": { color: "primary.main" } }}
                        >
                          {info.content}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </AnimatedSection>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <AnimatedSection direction="left" delay={0.2}>
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
                  {t("sendMessage")}
                </Typography>

                {submitted ? (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    {t("messageSent")}
                  </Alert>
                ) : null}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label={t("yourName")}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label={t("emailAddress")}
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label={t("phoneNumber")}
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label={t("inquiryType")}
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                      >
                        <MenuItem value="general">{t("generalInquiry")}</MenuItem>
                        <MenuItem value="support">{t("techSupport")}</MenuItem>
                        <MenuItem value="partnership">{t("partnership")}</MenuItem>
                        <MenuItem value="feedback">{t("feedback")}</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label={t("subject")}
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label={t("yourMessage")}
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={language === 'en' ? <SendIcon /> : <SendIcon sx={{ transform: "scaleX(-1)" }} />}
                        fullWidth
                        sx={{ mt: 1 }}
                      >
                        {t("sendBtn")}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </AnimatedSection>
          </Grid>
        </Grid>
      </Container>

      {/* Map Section */}
      <Box sx={{ height: { xs: 220, md: 400 }, width: "100%", bgcolor: "grey.200", mb: 4 }}>
        {/* Replace with actual map component */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.200",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Map will be displayed here
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={submitted}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {t("messageSent")}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Contact

