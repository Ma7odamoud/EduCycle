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
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import RecyclingIcon from "@mui/icons-material/Recycling"
import { Link as RouterLink } from "react-router-dom"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"

const LoginPage = () => {
  const { t, language, dir } = useLanguage()
  const { login } = useAuth();
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

    if (!email) {
      newErrors.email = t("required") || "Required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = t("required") || "Required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError("")

    if (validateForm()) {
      try {
        await login(email, password);
        navigate("/");
      } catch (err) {
        setFormError(err.message || "Invalid email or password");
      }
    }
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 8 }, minHeight: "calc(100vh - 64px - 300px)" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Left side - Login form */}
        <Grid item xs={12} md={6} component={Paper} elevation={6} square sx={{ borderRadius: dir === 'rtl' ? { md: "0 8px 8px 0" } : { md: "8px 0 0 8px" } }}>
          <Box
            sx={{
              my: { xs: 4, md: 8 },
              mx: { xs: 2, md: 4 },
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Logo */}
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
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <RecyclingIcon sx={{ color: "primary.main", mr: 1, ml: language === 'ar' ? 1 : 0, fontSize: 30 }} />
              <Typography component="h1" variant="h5">
                <Box component="span" sx={{ color: "primary.main" }}>Edu</Box>Cycle
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
              </Box>

              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2, py: 1.5 }}>
                {t("login")}
              </Button>

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
