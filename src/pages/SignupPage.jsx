"use client";

import { useState, useRef } from "react";
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
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
  Avatar,
  CircularProgress,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link as RouterLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../lib/api";

// ─── Country dial-code list ───────────────────────────────────────────────────
const COUNTRIES = [
  { code: "AF", name: "Afghanistan",       dial: "+93"  },
  { code: "AL", name: "Albania",           dial: "+355" },
  { code: "DZ", name: "Algeria",           dial: "+213" },
  { code: "AR", name: "Argentina",         dial: "+54"  },
  { code: "AU", name: "Australia",         dial: "+61"  },
  { code: "AT", name: "Austria",           dial: "+43"  },
  { code: "BH", name: "Bahrain",           dial: "+973" },
  { code: "BD", name: "Bangladesh",        dial: "+880" },
  { code: "BE", name: "Belgium",           dial: "+32"  },
  { code: "BR", name: "Brazil",            dial: "+55"  },
  { code: "CA", name: "Canada",            dial: "+1"   },
  { code: "CN", name: "China",             dial: "+86"  },
  { code: "CO", name: "Colombia",          dial: "+57"  },
  { code: "HR", name: "Croatia",           dial: "+385" },
  { code: "CY", name: "Cyprus",            dial: "+357" },
  { code: "CZ", name: "Czech Republic",    dial: "+420" },
  { code: "DK", name: "Denmark",           dial: "+45"  },
  { code: "EG", name: "Egypt",             dial: "+20"  },
  { code: "ET", name: "Ethiopia",          dial: "+251" },
  { code: "FI", name: "Finland",           dial: "+358" },
  { code: "FR", name: "France",            dial: "+33"  },
  { code: "DE", name: "Germany",           dial: "+49"  },
  { code: "GH", name: "Ghana",             dial: "+233" },
  { code: "GR", name: "Greece",            dial: "+30"  },
  { code: "HU", name: "Hungary",           dial: "+36"  },
  { code: "IN", name: "India",             dial: "+91"  },
  { code: "ID", name: "Indonesia",         dial: "+62"  },
  { code: "IR", name: "Iran",              dial: "+98"  },
  { code: "IQ", name: "Iraq",              dial: "+964" },
  { code: "IE", name: "Ireland",           dial: "+353" },
  { code: "IT", name: "Italy",             dial: "+39"  },
  { code: "JP", name: "Japan",             dial: "+81"  },
  { code: "JO", name: "Jordan",            dial: "+962" },
  { code: "KW", name: "Kuwait",            dial: "+965" },
  { code: "LB", name: "Lebanon",           dial: "+961" },
  { code: "LY", name: "Libya",             dial: "+218" },
  { code: "MY", name: "Malaysia",          dial: "+60"  },
  { code: "MA", name: "Morocco",           dial: "+212" },
  { code: "NL", name: "Netherlands",       dial: "+31"  },
  { code: "NZ", name: "New Zealand",       dial: "+64"  },
  { code: "NG", name: "Nigeria",           dial: "+234" },
  { code: "NO", name: "Norway",            dial: "+47"  },
  { code: "OM", name: "Oman",              dial: "+968" },
  { code: "PK", name: "Pakistan",          dial: "+92"  },
  { code: "PS", name: "Palestine",         dial: "+970" },
  { code: "PH", name: "Philippines",       dial: "+63"  },
  { code: "PL", name: "Poland",            dial: "+48"  },
  { code: "PT", name: "Portugal",          dial: "+351" },
  { code: "QA", name: "Qatar",             dial: "+974" },
  { code: "RO", name: "Romania",           dial: "+40"  },
  { code: "RU", name: "Russia",            dial: "+7"   },
  { code: "SA", name: "Saudi Arabia",      dial: "+966" },
  { code: "SN", name: "Senegal",           dial: "+221" },
  { code: "ZA", name: "South Africa",      dial: "+27"  },
  { code: "KR", name: "South Korea",       dial: "+82"  },
  { code: "ES", name: "Spain",             dial: "+34"  },
  { code: "SD", name: "Sudan",             dial: "+249" },
  { code: "SE", name: "Sweden",            dial: "+46"  },
  { code: "CH", name: "Switzerland",       dial: "+41"  },
  { code: "SY", name: "Syria",             dial: "+963" },
  { code: "TW", name: "Taiwan",            dial: "+886" },
  { code: "TZ", name: "Tanzania",          dial: "+255" },
  { code: "TH", name: "Thailand",          dial: "+66"  },
  { code: "TN", name: "Tunisia",           dial: "+216" },
  { code: "TR", name: "Turkey",            dial: "+90"  },
  { code: "AE", name: "UAE",               dial: "+971" },
  { code: "UG", name: "Uganda",            dial: "+256" },
  { code: "UA", name: "Ukraine",           dial: "+380" },
  { code: "GB", name: "United Kingdom",    dial: "+44"  },
  { code: "US", name: "United States",     dial: "+1"   },
  { code: "YE", name: "Yemen",             dial: "+967" },
];

// ─── Step 2: Optional avatar upload ─────────────────────────────────────────
const AvatarStep = ({ onDone }) => {
  const { t } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError("");
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("files", file);
      const uploadRes = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const avatarUrl = uploadRes.data?.urls?.[0];
      if (avatarUrl) {
        await api.put("/users/me", { avatar: avatarUrl });
        setUploaded(true);
      } else {
        setError("Upload failed. You can add a photo later from your profile.");
      }
    } catch {
      setError("Upload failed. You can add a photo later from your profile.");
      setUploaded(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", py: 4, px: 2 }}>
      <CheckCircleIcon sx={{ fontSize: 56, color: "success.main", mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
        {t("accountCreated") || "Account Created!"}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        {t("addProfilePhoto") || "Add a profile photo to personalise your account (optional)"}
      </Typography>

      {/* Avatar preview */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={preview}
            alt="avatar"
            sx={{ width: 120, height: 120, border: "4px solid", borderColor: "primary.light" }}
          />
          <input
            accept="image/*"
            id="avatar-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="avatar-upload">
            <IconButton
              component="span"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
                width: 36,
                height: 36,
              }}
              disabled={uploading}
            >
              {uploading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <PhotoCameraIcon fontSize="small" />
              )}
            </IconButton>
          </label>
        </Box>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 2, mx: "auto", maxWidth: 340 }}>
          {error}
        </Alert>
      )}

      {uploaded && (
        <Alert severity="success" sx={{ mb: 2, mx: "auto", maxWidth: 340 }}>
          {t("photoUploaded") || "Photo uploaded! You can proceed."}
        </Alert>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: 240, py: 1.5, borderRadius: 2 }}
          onClick={onDone}
          disabled={uploading}
        >
          {t("goToLogin") || "Go to Login"}
        </Button>
        <Button
          variant="text"
          color="inherit"
          startIcon={<SkipNextIcon />}
          onClick={onDone}
          sx={{ color: "text.secondary" }}
        >
          {t("skipForNow") || "Skip for now"}
        </Button>
      </Box>
    </Box>
  );
};

// ─── Main Signup Page ─────────────────────────────────────────────────────────
const SignupPage = () => {
  const { t, language, dir } = useLanguage();
  const { register, sendOtp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [step, setStep] = useState(1); // 1=form 2=otp 3=avatar

  // ── OTP step state ───────────────────────────────────────────────────────
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0); // seconds
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [phoneLocal, setPhoneLocal]   = useState("");
  const [password, setPassword]       = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Start 60-s resend countdown
  const startCooldown = () => {
    setResendCooldown(60);
    const id = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) { clearInterval(id); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  // Strict email regex: local@domain.tld — no consecutive dots, valid TLD (2+ chars)
  const validateEmail = (value) => {
    if (!value) return t("required") || "Required";
    const trimmed = value.trim();
    // Must match: local-part @ domain . tld (≥2 letters)
    const emailRe = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRe.test(trimmed))           return "Please enter a valid email address (e.g. name@example.com)";
    if (/\.{2,}/.test(trimmed))           return "Email must not contain consecutive dots";
    if (trimmed.startsWith(".") || trimmed.split("@")[0].endsWith("."))
      return "Email local part must not start or end with a dot";
    const domain = trimmed.split("@")[1] || "";
    if (!domain.includes("."))            return "Email domain must include a dot (e.g. gmail.com)";
    const tld = domain.split(".").pop();
    if (tld.length < 2)                   return "Email TLD must be at least 2 characters";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";

    const emailErr = validateEmail(email);
    if (emailErr) newErrors.email = emailErr;

    if (!phoneLocal.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{4,15}$/.test(phoneLocal.replace(/[\s\-()]/g, ""))) {
      newErrors.phone = "Enter digits only after the country code (4–15 digits)";
    }

    if (!password) {
      newErrors.password = t("required") || "Required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    if (!validateForm()) return;
    setOtpLoading(true);
    try {
      const fullPhone = `${countryCode}${phoneLocal.replace(/^0+/, "")}`;
      await sendOtp(email, fullPhone);
      startCooldown();
      setStep(2); // go to OTP step
    } catch (err) {
      setFormError(err.response?.data?.error || "Failed to send verification code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
    if (value && index < 3) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otpDigits.join("");
    if (code.length < 4) { setOtpError("Please enter all 4 digits."); return; }
    setOtpError("");
    setOtpLoading(true);
    try {
      const fullPhone = `${countryCode}${phoneLocal.replace(/^0+/, "")}`;
      await register({ firstName, lastName, email, phoneNumber: fullPhone, password, otp: code });
      setStep(3);
    } catch (err) {
      setOtpError(err.response?.data?.error || "Invalid code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setOtpDigits(["", "", "", ""]);
    setOtpError("");
    setOtpLoading(true);
    try {
      const fullPhone = `${countryCode}${phoneLocal.replace(/^0+/, "")}`;
      await sendOtp(email, fullPhone);
      startCooldown();
    } catch (err) {
      setOtpError(err.response?.data?.error || "Failed to resend. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleDone = () => navigate("/login");

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ py: 8, minHeight: "calc(100vh - 64px - 300px)" }}
    >
      <Grid container sx={{ height: "100%" }}>
        {/* Left side */}
        <Grid
          item
          xs={12}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ borderRadius: dir === 'rtl' ? { md: "0 8px 8px 0" } : { md: "8px 0 0 8px" } }}
        >
          <Box sx={{ my: 4, mx: 4, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* Logo */}
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
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <RecyclingIcon sx={{ color: "primary.main", mr: 1, ml: language === 'ar' ? 1 : 0, fontSize: 30 }} />
              <Typography component="h1" variant="h5">
                <Box component="span" sx={{ color: "primary.main" }}>Edu</Box>Cycle
              </Typography>
            </Box>

            {step === 1 ? (
              <>
                <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
                  {t("joinCommunity")}
                </Typography>

                {formError && (
                  <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                    {formError}
                  </Alert>
                )}

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%", mt: 1 }}>
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
                        helperText={errors.email || "e.g. name@gmail.com"}
                      />
                    </Grid>

                    {/* ── Phone: country code + local number ── */}
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {/* Country code selector */}
                        <FormControl sx={{ minWidth: 155 }} error={!!errors.phone}>
                          <InputLabel id="country-code-label">Country</InputLabel>
                          <Select
                            labelId="country-code-label"
                            id="country-code"
                            value={countryCode}
                            label="Country"
                            onChange={(e) => setCountryCode(e.target.value)}
                            MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                          >
                            {COUNTRIES.map((c) => (
                              <MenuItem key={c.code} value={c.dial}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: 1 }}>
                                  <span>{c.name}</span>
                                  <Box component="span" sx={{ color: "text.secondary", fontWeight: 600 }}>{c.dial}</Box>
                                </Box>
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        {/* Local number input */}
                        <TextField
                          required
                          fullWidth
                          id="phone"
                          label={t("phoneNumber")}
                          name="phone"
                          autoComplete="tel-national"
                          placeholder="1012345678"
                          value={phoneLocal}
                          onChange={(e) => setPhoneLocal(e.target.value.replace(/[^0-9\s\-()]/g, ""))}
                          error={!!errors.phone}
                          inputProps={{ inputMode: "numeric" }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Box component="span" sx={{ color: "text.secondary", fontWeight: 700, mr: 0.5 }}>
                                  {countryCode}
                                </Box>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                      {errors.phone && (
                        <FormHelperText error sx={{ ml: 1.5 }}>{errors.phone}</FormHelperText>
                      )}
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
                                onClick={() => setShowPassword(!showPassword)}
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
                                aria-label="toggle confirm password visibility"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                        label={<Typography variant="body2">{t("agreeTerms")}</Typography>}
                      />
                      {errors.agreedToTerms && (
                        <Typography color="error" variant="caption" sx={{ display: "block", mt: 0.5 }}>
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
                    disabled={otpLoading}
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                  >
                    {otpLoading
                      ? <CircularProgress size={22} color="inherit" />
                      : t("signup")}
                  </Button>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      {t("alreadyHaveAccount")}{" "}
                      <Link component={RouterLink} to="/login" color="primary" fontWeight="medium">
                        {t("login")}
                      </Link>
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Link
                      component={RouterLink}
                      to="/"
                      color="primary"
                      sx={{ display: "inline-flex", alignItems: "center" }}
                    >
                      <Typography variant="body2">
                        {language === 'ar' ? "→" : "←"} {t("backToHome")}
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </>
            ) : step === 2 ? (
              /* ── OTP Verification Step ── */
              <Box sx={{ py: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                  {t("verifyEmail") || "Verify Your Email"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                  {t("otpSentTo") || "We sent a 4-digit code to"}{" "}
                  <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>{email}</Box>
                </Typography>

                {/* 4 digit boxes */}
                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
                  {otpDigits.map((digit, i) => (
                    <TextField
                      key={i}
                      inputRef={otpRefs[i]}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onFocus={e => e.target.select()}
                      inputProps={{
                        maxLength: 1,
                        inputMode: "numeric",
                        style: { textAlign: "center", fontSize: 28, fontWeight: 700, padding: "12px 0" },
                      }}
                      sx={{ width: 64 }}
                      autoFocus={i === 0}
                    />
                  ))}
                </Box>

                {otpError && (
                  <Alert severity="error" sx={{ mb: 2 }}>{otpError}</Alert>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.5, mb: 2, borderRadius: 2 }}
                  onClick={handleVerifyOtp}
                  disabled={otpLoading || otpDigits.join("").length < 4}
                >
                  {otpLoading ? <CircularProgress size={22} color="inherit" /> : (t("verifyCode") || "Verify Code")}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="text"
                    size="small"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || otpLoading}
                    sx={{ color: resendCooldown > 0 ? "text.disabled" : "primary.main" }}
                  >
                    {resendCooldown > 0
                      ? `${t("resendIn") || "Resend in"} ${resendCooldown}s`
                      : (t("resendCode") || "Resend Code")}
                  </Button>
                </Box>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button variant="text" size="small" onClick={() => setStep(1)} sx={{ color: "text.secondary" }}>
                    ← {t("backToForm") || "Back to form"}
                  </Button>
                </Box>
              </Box>
            ) : (
              <AvatarStep onDone={handleDone} />
            )}
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
