import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import SwapHorizIcon from "@mui/icons-material/SwapHoriz"
import GroupsIcon from "@mui/icons-material/Groups"
import SchoolIcon from "@mui/icons-material/School"
import { Link as RouterLink } from "react-router-dom"
import SectionTitle from "../components/SectionTitle"
import AnimatedSection from "../components/AnimatedSection"
import { useLanguage } from "../contexts/LanguageContext"

const Services = () => {
  const { t } = useLanguage()

  const services = [
    {
      title: t("freeBookSharing"),
      description: t("freeBookSharingDesc"),
      icon: MenuBookIcon,
      image: "/images/books.jpg",
      features: [
        t("s1f1"),
        t("s1f2"),
        t("s1f3"),
        t("s1f4"),
      ],
    },
    {
      title: t("studentExchange"),
      description: t("studentExchangeDesc"),
      icon: SwapHorizIcon,
      image: "/images/Exchange.png",
      features: [
        t("s2f1"),
        t("s2f2"),
        t("s2f3"),
        t("s2f4"),
      ],
    },
    {
      title: t("studentCommunity"),
      description: t("studentCommunityDesc"),
      icon: GroupsIcon,
      image: "/images/community.png",
      features: [
        t("s3f1"),
        t("s3f2"),
        t("s3f3"),
        t("s3f4"),
      ],
    },
    {
      title: t("learningResources"),
      description: t("learningResourcesDesc"),
      icon: SchoolIcon,
      image: "/images/resources.png",
      features: [
        t("s4f1"),
        t("s4f2"),
        t("s4f3"),
        t("s4f4"),
      ],
    },
  ]

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: { xs: 5, md: 8 } }}>
        <Container>
          <AnimatedSection>
            <Typography
              variant="h3"
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, fontSize: { xs: "1.8rem", md: "3rem" } }}
            >
              {t("ourServices")}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ maxWidth: 800, mx: "auto", fontSize: { xs: "0.95rem", md: "1.25rem" }, px: { xs: 2, md: 0 } }}
            >
              {t("servicesSubtitle")}
            </Typography>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Services Overview */}
      <Container sx={{ py: 8 }}>
        <AnimatedSection delay={0.2}>
          <SectionTitle>{t("whatWeOffer")}</SectionTitle>

          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-8px)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          color: "white",
                          borderRadius: "50%",
                          p: 1,
                          mr: 2,
                        }}
                      >
                        <service.icon />
                      </Box>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        {service.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" color="text.secondary" paragraph>
                      {service.description}
                    </Typography>

                    <List>
                      {service.features.map((feature, idx) => (
                        <ListItem key={idx} disableGutters sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </AnimatedSection>
      </Container>

      {/* Call to Action */}
      <Box sx={{ bgcolor: "grey.100", py: { xs: 5, md: 8 } }}>
        <Container>
          <AnimatedSection delay={0.4}>
            <Box
              sx={{
                bgcolor: "white",
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                textAlign: "center",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: "1.4rem", md: "2.125rem" } }}>
                {t("readyToJoin")}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ maxWidth: 800, mx: "auto", mb: 4, fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                {t("joinDesc")}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/signup"
                  sx={{ px: 4, py: 1.5, minWidth: 140 }}
                >
                  {t("signUpNow")}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  sx={{ px: 4, py: 1.5, minWidth: 140 }}
                >
                  {t("contactUs")}
                </Button>
              </Box>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
    </Box>
  )
}

export default Services
