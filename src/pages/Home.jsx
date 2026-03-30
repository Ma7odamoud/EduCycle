import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Rating,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import PlasticIcon from "@mui/icons-material/RestoreFromTrash";
import PaperIcon from "@mui/icons-material/Description";
import ElectronicsIcon from "@mui/icons-material/SettingsRemote";
import ToysIcon from "@mui/icons-material/SportsEsports";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
// Import the components
import SectionTitle from "../components/SectionTitle";
import CategoryCard from "../components/CategoryCard";
import AnimatedSection from "../components/AnimatedSection";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Ali Meligi",
      role: "Regular User",
      avatar: "https://source.unsplash.com/100x100/?portrait,woman",
      rating: 5,
      text: "Edu Cycle has completely changed how I think about my old books and unused tools.",
    },
    {
      id: 2,
      name: "Salma Elsayed",
      role: "Student",
      avatar: "https://source.unsplash.com/100x100/?portrait,man",
      rating: 4.5,
      text: "As a student,using Edu Cycle has helped me get rid of my old books and get new ones easily.",
    },
    {
      id: 3,
      name: "Mahmoud Youssef",
      role: "Community Leader",
      avatar: "https://source.unsplash.com/100x100/?portrait,woman2",
      rating: 5,
      text: "Our platform Edu Cycle has helped many students learn by leaving the books and tools they no longer need to other students who do.",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: "white" }}>
        <Container>
          <AnimatedSection>
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.9rem", sm: "2.8rem", md: "3.75rem" },
                lineHeight: { xs: 1.2, md: 1.3 },
              }}
            >
              {t("welcomeTitle")}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                px: { xs: 1, sm: 0 },
              }}
            >
              {t("welcomeSubtitle")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5, minWidth: 160 }}
                onClick={() => navigate(user ? "/marketplace" : "/signup")}
              >
                {t("getStarted")}
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5, minWidth: 160 }}
              >
                {t("learnMore")}
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 6, bgcolor: "#ffffff" }}>
        <Container>
          <AnimatedSection delay={0.2}>
            <SectionTitle>{t("ourCategories")}</SectionTitle>

            <Box
              sx={{
                mt: 6,
                p: { xs: 2, sm: 4 },
                bgcolor: "white",
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Grid container spacing={3} justifyContent="center">
                <Grid item xs={6} sm={3}>
                  <CategoryCard
                    icon={ImportContactsIcon}
                    title={t("books")}
                    description={t("booksDesc")}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <CategoryCard
                    icon={PaperIcon}
                    title={t("papers")}
                    description={t("papersDesc")}
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <CategoryCard
                    icon={ElectronicsIcon}
                    title={t("tools")}
                    description={t("toolsDesc")}
                  />
                </Grid>
              </Grid>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>

      {/* How to Use Section */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "white", color: "text.primary" }}>
        <Container>
          <AnimatedSection delay={0.3}>
            <SectionTitle>{t("howToUse")}</SectionTitle>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    bgcolor: "white",
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-10px)" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 64, md: 80 },
                      height: { xs: 64, md: 80 },
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }} />
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
                    {t("createAccount")}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    {t("createAccountDesc")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    bgcolor: "white",
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-10px)" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 64, md: 80 },
                      height: { xs: 64, md: 80 },
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <RecyclingIcon sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }} />
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
                    {t("uploadBooks")}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    {t("uploadBooksDesc")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    textAlign: "center",
                    bgcolor: "white",
                    p: { xs: 3, md: 4 },
                    borderRadius: 2,
                    height: "100%",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-10px)" },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 64, md: 80 },
                      height: { xs: 64, md: 80 },
                      bgcolor: "primary.main",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 3,
                    }}
                  >
                    <AutorenewIcon sx={{ fontSize: { xs: 30, md: 40 }, color: "white" }} />
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: "1.1rem", md: "1.5rem" } }}>
                    {t("buyBooks")}
                  </Typography>
                  <Typography color="text.secondary" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                    {t("buyBooksDesc")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </Box>

      {/* Testimonials Section - "Our Customers Say" */}
      <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#f8f9fa" }}>
        <Container>
          <AnimatedSection delay={0.4}>
            <SectionTitle>{t("testimonials")}</SectionTitle>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6, maxWidth: 700, mx: "auto" }}
            >
              {t("testimonialsDesc")}
            </Typography>

            <Grid container spacing={{ xs: 2, md: 4 }}>
              {testimonials.map((testimonial) => (
                <Grid item xs={12} md={4} key={testimonial.id}>
                  <Card
                    sx={{
                      height: "100%",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      transition: "transform 0.3s",
                      "&:hover": { transform: "translateY(-10px)" },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ position: "relative", mb: 4 }}>
                        <FormatQuoteIcon
                          sx={{
                            position: "absolute",
                            top: -10,
                            left: -10,
                            fontSize: 40,
                            color: "primary.light",
                            opacity: 0.4,
                          }}
                        />
                        <Typography
                          variant="body1"
                          sx={{
                            fontStyle: "italic",
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          "{testimonial.text}"
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                          <Rating
                            value={testimonial.rating}
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                component={RouterLink}
                to="/community"
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                {t("viewMoreTestimonials")}
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
