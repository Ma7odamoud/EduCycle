"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

const SignupPage = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!email) {
      newErrors.email = t("required") || "Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-$$$$]{10,15}$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (!password) {
      newErrors.password = t("required") || "Required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (validateForm()) {
      // In a real app, you would send this data to your backend
      console.log("Signup with:", {
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      // Show success message
      setFormSuccess(
        t("accountCreated")
      );

      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ py: 8, minHeight: "calc(100vh - 64px - 300px)" }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Left side - Signup form */}
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ borderRadius: dir === 'rtl' ? { md: "0 8px 8px 0" } : { md: "8px 0 0 8px" } }}
        >
          <Box
            sx={{
              my: 4,
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
                mb: 4,
                textDecoration: "none",
                color: "inherit",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <RecyclingIcon
                sx={{ color: "primary.main", mr: 1, ml: language === 'ar' ? 1 : 0, fontSize: 30 }}
              />
              <Typography component="h1" variant="h5">
                <Box component="span" sx={{ color: "primary.main" }}>
                  Edu
                </Box>
                Cycle
              </Typography>
            </Box>

            <Typography
              component="h1"
              variant="h4"
              sx={{ mb: 3, fontWeight: 700 }}
            >
              {t("joinCommunity")}
            </Typography>

            {formError && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {formError}
              </Alert>
            )}

            {formSuccess && (
              <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                {formSuccess}
              </Alert>
            )}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ width: "100%", mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label={t("firstName")}
                    autoFocus
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label={t("lastName")}
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label={t("emailAddress")}
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label={t("phoneNumber")}
                    name="phone"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={t("password") || "Password"}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label={t("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        {t("agreeTerms")}
                      </Typography>
                    }
                  />
                  {errors.agreedToTerms && (
                    <Typography
                      color="error"
                      variant="caption"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      {errors.agreedToTerms}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                {t("signup")}
              </Button>

              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mx: 2 }}
                >
                  {t("or")}
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<FacebookIcon sx={{ mr: language === 'ar' ? 1 : 0 }} />}
                  sx={{
                    flex: 1,
                    borderColor: "#1877F2",
                    color: "#1877F2",
                    "&:hover": {
                      borderColor: "#166FE5",
                      bgcolor: "rgba(24, 119, 242, 0.04)",
                    },
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
                    "&:hover": {
                      borderColor: "#C53929",
                      bgcolor: "rgba(219, 68, 55, 0.04)",
                    },
                  }}
                >
                  Google
                </Button>
              </Box>

              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    component={RouterLink}
                    to="/login"
                    color="primary"
                    fontWeight="medium"
                  >
                    {t("login")}
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
            backgroundImage: "url(/images/signup.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => t.palette.grey[50],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: dir === 'rtl' ? { md: "8px 0 0 8px" } : { md: "0 8px 8px 0" },
          }}
        />
      </Grid>
    </Container>
  );
};

export default SignupPage;
