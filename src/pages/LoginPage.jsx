"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import RecyclingIcon from "@mui/icons-material/Recycling"
import { Link as RouterLink } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"

const LoginPage = () => {
  const { t, language, dir } = useLanguage()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState("")

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!email) {
      newErrors.email = t("required") || "Required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!password) {
      newErrors.password = t("required") || "Required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    if (validateForm()) {
      // In a real app, you would authenticate with a backend
      console.log("Login with:", { email, password, rememberMe })

      // Simulate authentication check
      if (email === "user@example.com" && password === "password123") {
        // Successful login - redirect to home page
        navigate("/")
      } else {
        // Show generic error for demo purposes
        setFormError("Invalid email or password. Try user@example.com / password123")
      }
    }
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 8, minHeight: "calc(100vh - 64px - 300px)" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Left side - Login form */}
        <Grid item xs={12} md={6} component={Paper} elevation={6} square sx={{ borderRadius: dir === 'rtl' ? { md: "0 8px 8px 0" } : { md: "8px 0 0 8px" } }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Logo - Make it clickable to go back to home */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 6,
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <RecyclingIcon sx={{ color: "primary.main", mr: 1, ml: language === 'ar' ? 1 : 0, fontSize: 30 }} />
              <Typography component="h1" variant="h5">
                <Box component="span" sx={{ color: "primary.main" }}>
                  Edu
                </Box>
                Cycle
              </Typography>
            </Box>

            <Typography component="h1" variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
              {t("welcomeBack")}
            </Typography>

            {formError && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {formError}
              </Alert>
            )}

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("emailAddress")}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("password") || "Password"}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                      size="small"
                    />
                  }
                  label={t("rememberMe")}
                />
                <Link component={RouterLink} to="/forgot-password" variant="body2" color="primary">
                  {t("forgotPassword")}
                </Link>
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {t("login")}
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography variant="body2" color="text.secondary" sx={{ mx: 2 }}>
                  {t("or")}
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FacebookIcon sx={{ mr: language === 'ar' ? 1 : 0 }} />}
                  sx={{
                    flex: 1,
                    borderColor: "#1877F2",
                    color: "#1877F2",
                    "&:hover": { borderColor: "#166FE5", bgcolor: "rgba(24, 119, 242, 0.04)" },
                  }}
                >
                  Facebook
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GoogleIcon sx={{ mr: language === 'ar' ? 1 : 0 }} />}
                  sx={{
                    flex: 1,
                    borderColor: "#DB4437",
                    color: "#DB4437",
                    "&:hover": { borderColor: "#C53929", bgcolor: "rgba(219, 68, 55, 0.04)" },
                  }}
                >
                  Google
                </Button>
              </Box>

              <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {t("dontHaveAccount")}{" "}
                  <Link component={RouterLink} to="/signup" color="primary" fontWeight="medium">
                    {t("signup")}
                  </Link>
                </Typography>
              </Box>

              {/* Back to Home link */}
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Link
                  component={RouterLink}
                  to="/"
                  color="primary"
                  sx={{ display: "inline-flex", alignItems: "center" }}
                >
                  <Typography variant="body2">{language === 'ar' ? "→" : "←"} {t("backToHome")}</Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right side - Image */}
        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: "url(/images/login.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => t.palette.grey[50],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: dir === 'rtl' ? { md: "8px 0 0 8px" } : { md: "0 8px 8px 0" },
          }}
        />
      </Grid>
    </Container>
  )
}

export default LoginPage

