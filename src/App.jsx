import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MarketplacePage from "./pages/MarketplacePage"
import CommunityPage from "./pages/CommunityPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

import ItemDetailsPage from "./pages/ItemDetailsPage"
import PaymentPage from "./pages/PaymentPage"
import PaymentSuccessPage from "./pages/PaymentSuccessPage"
import ListItemPage from "./pages/ListItemPage"
import ProfilePage from "./pages/ProfilePage"
import UserProfilePage from "./pages/UserProfilePage"
import RedeemPointsPage from "./pages/RedeemPointsPage" // Import the RedeemPointsPage
import ScrollToTop from "./components/ScrollToTop" // Import the ScrollToTop component
import ImageLazyLoader from "./components/ImageLazyLoader" // Import the new component
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext"
import PageTransition from "./components/PageTransition"
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/marketplace" element={<PageTransition><MarketplacePage /></PageTransition>} />
        <Route path="/list-item" element={<PageTransition><ListItemPage /></PageTransition>} />
        <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignupPage /></PageTransition>} />

        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />
        <Route path="/user/:userId" element={<PageTransition><UserProfilePage /></PageTransition>} />
        <Route path="/redeem-points" element={<PageTransition><RedeemPointsPage /></PageTransition>} />
        <Route path="/item/:id" element={<PageTransition><ItemDetailsPage /></PageTransition>} />
        <Route path="/payment" element={<PageTransition><PaymentPage /></PageTransition>} />
        <Route path="/payment-success" element={<PageTransition><PaymentSuccessPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

const AppContent = () => {
  const { language } = useLanguage();

  // Create RTL cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
  });

  const theme = createTheme({
    direction: language === 'ar' ? 'rtl' : 'ltr',
    palette: {
      primary: {
        main: "#41AB5D",
        light: "#6ede8a",
        dark: "#2d7a42",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f1f1f5",
        light: "#ffffff",
        dark: "#c1c1c5",
        contrastText: "#18191f",
      },
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      },
    },
    typography: {
      fontFamily: language === 'ar' ? '"Cairo", "Roboto", "Helvetica", "Arial", sans-serif' : '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
  })

  return (
    <CacheProvider value={language === 'ar' ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <ImageLazyLoader />
          <Routes>
            {/* Regular Routes with Navbar/Footer */}
            <Route
              path="*"
              element={
                <div className="app-container">
                  <Navbar />
                  <main>
                    <AnimatedRoutes />
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  )
}

import { AuthProvider } from "./contexts/AuthContext"
import ErrorBoundary from "./components/ErrorBoundary"

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
