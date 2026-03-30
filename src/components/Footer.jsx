import { Box, Container, Grid, Typography, Link, IconButton, Divider, Button, TextField } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import InstagramIcon from "@mui/icons-material/Instagram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import RecyclingIcon from "@mui/icons-material/Recycling"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { useLanguage } from "../contexts/LanguageContext"

const Footer = () => {
  const { t } = useLanguage()

  return (
    <Box sx={{ bgcolor: "#41AB5D", color: "white", pt: { xs: 4, md: 6 }, pb: 3 }}>
      <Container maxWidth="lg">
        {/* Company Info */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <RecyclingIcon sx={{ fontSize: 36, mr: 1 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                EduCycle
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t("footerText")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">educycle@email.com</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">+1 (234) 567-8900</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">123 Green Street, Eco City, EC 12345</Typography>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("quickLinks")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link component={RouterLink} to="/" color="inherit" underline="hover">
                {t("home")}
              </Link>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                {t("about")}
              </Link>
              <Link component={RouterLink} to="/marketplace" color="inherit" underline="hover">
                {t("marketplace")}
              </Link>
              <Link component={RouterLink} to="/community" color="inherit" underline="hover">
                {t("community")}
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("resources")}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link component={RouterLink} to="/faq" color="inherit" underline="hover">
                FAQ
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit" underline="hover">
                Blog
              </Link>
              <Link component={RouterLink} to="/partners" color="inherit" underline="hover">
                Partners
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                {t("contact")}
              </Link>
              <Link component={RouterLink} to="/privacy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              {t("newsletter")}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t("newsletterDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              <TextField
                placeholder={t("emailPlaceholder")}
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "white",
                  borderRadius: { xs: "4px", sm: "4px 0 0 4px" },
                  flexGrow: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "transparent",
                      borderRadius: { xs: "4px", sm: "4px 0 0 4px" },
                    },
                    "&:hover fieldset": {
                      borderColor: "transparent",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "transparent",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2d7a42",
                  color: "white",
                  borderRadius: { xs: "4px", sm: "0 4px 4px 0" },
                  mt: { xs: 0, sm: 0 },
                  whiteSpace: "nowrap",
                  "&:hover": { bgcolor: "#236335" },
                }}
              >
                {t("subscribe")}
              </Button>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  sx={{
                    color: "white",
                    bgcolor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", my: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ textAlign: { xs: "center", sm: "left" } }}>
            &copy; {new Date().getFullYear()} EduCycle. {t("rightsReserved")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Link color="inherit" underline="hover" href="#">
              <Typography variant="body2">Terms of Service</Typography>
            </Link>
            <Link color="inherit" underline="hover" href="#">
              <Typography variant="body2">Privacy Policy</Typography>
            </Link>
            <Link color="inherit" underline="hover" href="#">
              <Typography variant="body2">Cookies</Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box >
  )
}

export default Footer

