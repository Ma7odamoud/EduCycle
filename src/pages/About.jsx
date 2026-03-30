import { Box, Container, Typography, Grid, Paper, Card, Avatar } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SavingsIcon from "@mui/icons-material/Savings";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { useLanguage } from "../contexts/LanguageContext";
import AnimatedSection from "../components/AnimatedSection";

const About = () => {
  const { t } = useLanguage()

  const missionGoals = [
    { text: t("missionGoal1"), icon: <MenuBookIcon fontSize="large" color="primary" /> },
    { text: t("missionGoal2"), icon: <SavingsIcon fontSize="large" color="primary" /> },
    { text: t("missionGoal3"), icon: <RecyclingIcon fontSize="large" color="primary" /> },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)",
          pt: { xs: 10, md: 15 },
          pb: { xs: 10, md: 15 },
          mb: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: "0 0 30px 30px", md: "0 0 80px 80px" },
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
          <AnimatedSection>
            <Typography
              variant="h2"
              component="h1"
              align="center"
              color="primary.dark"
              gutterBottom
              sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '2.5rem', md: '3.75rem' } }}
            >
              {t("aboutTitle")}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ fontWeight: 500, lineHeight: 1.6, opacity: 0.9, fontSize: { xs: "1rem", md: "1.5rem" }, px: { xs: 2, md: 0 } }}
            >
              {t("aboutSubtitle")}
            </Typography>
          </AnimatedSection>
        </Container>

        {/* Decorative Background Elements */}
        <Box sx={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.4)', zIndex: 1 }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(65, 171, 93, 0.15)', zIndex: 1 }} />
      </Box>

      <Container maxWidth="lg">
        {/* Story Section */}
        <Grid container spacing={8} alignItems="center" sx={{ mb: { xs: 8, md: 14 } }}>
          <Grid item xs={12} md={6}>
            <AnimatedSection>
              <Box>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2, display: 'block', mb: 1 }}>
                  HOW IT ALL STARTED
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, color: "text.primary", fontSize: { xs: "1.6rem", md: "3rem" } }}>
                  {t("ourStory")}
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}>
                  {t("storyP1")}
                </Typography>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8 }}>
                  {t("storyP2")}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary', lineHeight: 1.8, fontWeight: 500 }}>
                  {t("storyP3")}
                </Typography>
              </Box>
            </AnimatedSection>
          </Grid>
          <Grid item xs={12} md={6}>
            <AnimatedSection delay={0.2}>
              <Box sx={{ position: 'relative', mx: { xs: 2, md: 0 } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 4, md: 6 },
                    bgcolor: "primary.main",
                    color: "white",
                    borderRadius: 6,
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: "0 20px 40px rgba(65, 171, 93, 0.25)",
                    overflow: 'hidden'
                  }}
                >
                  <AutoStoriesIcon sx={{ fontSize: 64, mb: 3, opacity: 0.9 }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.4 }}>
                    {t("storyCardTitle")}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.7 }}>
                    {t("storyCardDesc")}
                  </Typography>

                  {/* Subtle decorative curves inside the card */}
                  <Box sx={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                </Paper>

                {/* Decorative blob behind the paper */}
                <Box sx={{
                  position: 'absolute',
                  top: 20,
                  right: -20,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'secondary.main',
                  borderRadius: 6,
                  zIndex: 1,
                  opacity: 0.6
                }} />
              </Box>
            </AnimatedSection>
          </Grid>
        </Grid>

        {/* Mission Section */}
        <AnimatedSection delay={0.3}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>
              {t("ourMission")}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1, mb: 3, color: "text.primary", fontSize: { xs: "1.6rem", md: "3rem" } }}>
              {t("missionTitle")}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto", fontWeight: 400, mb: 6, lineHeight: 1.6 }}>
              {t("missionText")}
            </Typography>

            <Grid container spacing={4}>
              {missionGoals.map((goal, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 5,
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'grey.100',
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
                        borderColor: 'primary.light'
                      }
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "rgba(65, 171, 93, 0.1)",
                        color: "primary.main",
                        width: 80,
                        height: 80,
                        mb: 3
                      }}
                    >
                      {goal.icon}
                    </Avatar>
                    <Typography variant="h6" align="center" sx={{ fontWeight: 600, color: "text.primary" }}>
                      {goal.text}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AnimatedSection>

        {/* Closing Highlight */}
        <AnimatedSection delay={0.5}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 5, md: 8 },
              mt: { xs: 8, md: 12 },
              borderRadius: 6,
              bgcolor: "primary.dark",
              color: "white",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(45, 122, 66, 0.3)"
            }}
          >
            <VolunteerActivismIcon sx={{ fontSize: 48, mb: 3, opacity: 0.9 }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontStyle: "italic",
                mb: 0,
                position: 'relative',
                zIndex: 2,
                lineHeight: 1.5,
                fontSize: { xs: '1.5rem', md: '2.125rem' }
              }}
            >
              "{t("missionClosing")}"
            </Typography>

            {/* Background elements */}
            <Box sx={{ position: 'absolute', top: -50, left: -50, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', zIndex: 1 }} />
            <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', zIndex: 1 }} />
          </Paper>
        </AnimatedSection>

      </Container>
    </Box>
  )
}

export default About;
