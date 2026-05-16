"use client"

import { useState } from "react"
import { useNavigate, Link as RouterLink } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  InputAdornment,
  FormHelperText,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../lib/api"

const MAX_IMAGE_SIZE_MB = 8
const MAX_IMAGE_COUNT = 4

const departments = ["تكنولوجيا التعليم", "فنية", "اعلام", "موسيقي", "اقتصاد"]

// ── Helper: turn any API/network error into a friendly message ────────────────
function getFriendlyError(error, context = "general") {
  const status = error?.response?.status
  const serverMsg = error?.response?.data?.error

  if (!error?.response) {
    // No response at all → network / CORS issue
    return {
      severity: "error",
      title: "Connection problem",
      message: "Could not reach the server. Check your internet connection and try again.",
    }
  }

  if (status === 401) {
    return {
      severity: "warning",
      title: "Session expired",
      message: "Your login session has expired. Please log out and log back in, then try again.",
    }
  }

  if (status === 413) {
    return {
      severity: "error",
      title: "Photo too large",
      message: `One or more photos exceed the ${MAX_IMAGE_SIZE_MB} MB limit. Please compress or resize them and try again.`,
    }
  }

  if (status === 500) {
    if (context === "upload") {
      return {
        severity: "error",
        title: "Upload service unavailable",
        message: "The image upload service is temporarily down. Please wait a moment and try again.",
      }
    }
    return {
      severity: "error",
      title: "Server error",
      message: "Something went wrong on our end. Please try again in a few seconds.",
    }
  }

  if (status === 400 && serverMsg) {
    return {
      severity: "error",
      title: "Invalid data",
      message: serverMsg,
    }
  }

  if (serverMsg) {
    return {
      severity: "error",
      title: "Error",
      message: serverMsg,
    }
  }

  return {
    severity: "error",
    title: "Unexpected error",
    message: "Something went wrong. Please try again.",
  }
}

const ListItemPage = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user } = useAuth()

  const grades = [t("grade1Label"), t("grade2Label"), t("grade3Label"), t("grade4Label")]
  const semesters = [t("sem1Label"), t("sem2Label")]
  const itemTypes = [
    { value: "book", label: `📚 ${t("typeBook")}` },
    { value: "item", label: `🛠️ ${t("typeItem")}` }
  ]

  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    grade: "",
    semester: "",
    department: "",
    images: [],
    price: "",
    isFree: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // ── Toast state ──────────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ open: false, severity: "error", title: "", message: "" })
  const showToast = ({ severity, title, message }) =>
    setToast({ open: true, severity, title, message })
  const closeToast = (_, reason) => {
    if (reason === "clickaway") return
    setToast(prev => ({ ...prev, open: false }))
  }

  // ── Field change ─────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value })
    if (errors[name]) setErrors({ ...errors, [name]: null })
  }

  // ── Image upload ─────────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    // Check total count
    const totalAfter = formData.images.length + files.length
    if (totalAfter > MAX_IMAGE_COUNT) {
      showToast({
        severity: "warning",
        title: "Too many photos",
        message: `You can upload up to ${MAX_IMAGE_COUNT} photos. You already have ${formData.images.length}.`,
      })
      return
    }

    // Check individual file sizes
    const oversized = files.find(f => f.size > MAX_IMAGE_SIZE_MB * 1024 * 1024)
    if (oversized) {
      showToast({
        severity: "error",
        title: "Photo too large",
        message: `"${oversized.name}" is ${(oversized.size / 1024 / 1024).toFixed(1)} MB. Maximum allowed size is ${MAX_IMAGE_SIZE_MB} MB per photo. Please compress or resize it.`,
      })
      return
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setFormData({ ...formData, images: [...formData.images, ...newImages] })
    if (errors.images) setErrors({ ...errors, images: null })
  }

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images]
    URL.revokeObjectURL(newImages[index].preview)
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  // ── Validation ───────────────────────────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {}
    if (!formData.type) newErrors.type = t("errSelectType")
    if (!formData.title.trim()) newErrors.title = t("errName")
    if (!formData.description.trim()) newErrors.description = t("errDescription")
    if (!formData.grade) newErrors.grade = t("errGrade")
    if (!formData.semester) newErrors.semester = t("errSemester")
    if (!formData.department) newErrors.department = t("errDepartment")
    if (!formData.isFree && (!formData.price || formData.price <= 0)) {
      newErrors.price = t("errPrice")
    }
    if (formData.images.length === 0) {
      newErrors.images = t("errPhotos") || "Please upload at least one photo"
    }
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      showToast({
        severity: "warning",
        title: "Missing required fields",
        message: "Please fill in all highlighted fields before posting.",
      })
      return false
    }
    return true
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      showToast({
        severity: "warning",
        title: "Not logged in",
        message: "You must be logged in to list an item. Please log in and try again.",
      })
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      let uploadedImageUrls = []

      // ── Step 1: upload photos ──────────────────────────────────────────────
      if (formData.images.length > 0) {
        const uploadData = new FormData()
        formData.images.forEach(imgObj => {
          if (imgObj.file) uploadData.append("files", imgObj.file)
        })

        let uploadRes
        try {
          uploadRes = await api.post("/upload", uploadData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        } catch (uploadErr) {
          showToast(getFriendlyError(uploadErr, "upload"))
          setIsSubmitting(false)
          return
        }

        const urls = uploadRes?.data?.urls
        if (!Array.isArray(urls) || urls.length === 0 || urls.some(u => !u?.startsWith("http"))) {
          showToast({
            severity: "error",
            title: "Upload failed",
            message: "Photos were not saved correctly. Please remove them and try uploading again.",
          })
          setIsSubmitting(false)
          return
        }
        uploadedImageUrls = urls
      }

      // ── Step 2: create the listing ─────────────────────────────────────────
      const payload = {
        title: formData.title,
        description: `${formData.description}\n\nGrade: ${formData.grade}\nSemester: ${formData.semester}\nDepartment: ${formData.department}`,
        price: Number(formData.price) || 0,
        isFree: formData.isFree,
        category: formData.type === "book" ? "BOOK" : "OTHER",
        images: uploadedImageUrls,
      }

      await api.post("/products", payload)
      navigate("/marketplace")

    } catch (error) {
      console.error("Failed to create product:", error)
      showToast(getFriendlyError(error, "general"))
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ── Floating error/warning toast ── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={7000}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: { xs: 16, sm: 24 } }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={closeToast}
          sx={{
            width: "100%",
            maxWidth: 520,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            borderRadius: 2,
            fontSize: "0.95rem",
          }}
        >
          {toast.title && (
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.3 }}>
              {toast.title}
            </Typography>
          )}
          {toast.message}
        </Alert>
      </Snackbar>

      <Button component={RouterLink} to="/marketplace" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        {t("backToMarket")}
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {t("listYourResourceTitle")}
        </Typography>

        {/* Phone number info */}
        {user?.phoneNumber && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {t("contactPhone") || "Buyers will contact you via"}: <strong>{user.phoneNumber}</strong>
            {" "}— {t("updatePhoneInProfile") || "Update in your profile settings if needed."}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>

            {/* Type */}
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.type}>
                <InputLabel>{t("whatListing")}</InputLabel>
                <Select name="type" value={formData.type} onChange={handleChange} label={t("whatListing")}>
                  {itemTypes.map((item) => (
                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.type}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Title */}
            <Grid item xs={12}>
              <TextField
                required fullWidth
                label={formData.type === "book" ? t("bookTitle") : t("itemName")}
                name="title"
                value={formData.title} onChange={handleChange}
                error={!!errors.title} helperText={errors.title}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                required fullWidth multiline rows={3}
                label={t("descriptionLabel")}
                name="description"
                value={formData.description} onChange={handleChange}
                error={!!errors.description} helperText={errors.description}
              />
            </Grid>

            {/* Grade & Semester */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.grade}>
                <InputLabel>{t("collegeGrade")}</InputLabel>
                <Select name="grade" value={formData.grade} onChange={handleChange} label={t("collegeGrade")}>
                  {grades.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.grade}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.semester}>
                <InputLabel>{t("semester")}</InputLabel>
                <Select name="semester" value={formData.semester} onChange={handleChange} label={t("semester")}>
                  {semesters.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.semester}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Department */}
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.department}>
                <InputLabel>{t("department")}</InputLabel>
                <Select name="department" value={formData.department} onChange={handleChange} label={t("department")}>
                  {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.department}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label={t("price")} name="price" type="number"
                disabled={formData.isFree}
                InputProps={{ startAdornment: <InputAdornment position="start">EGP</InputAdornment> }}
                value={formData.isFree ? "0" : formData.price} onChange={handleChange}
                error={!!errors.price} helperText={errors.price}
              />
              <FormControlLabel
                control={<Checkbox checked={formData.isFree} onChange={handleChange} name="isFree" color="primary" />}
                label={t("giveForFree")}
              />
            </Grid>

            {/* Photos */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                {t("photos")}
                <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                  (max {MAX_IMAGE_COUNT} photos · {MAX_IMAGE_SIZE_MB} MB each)
                </Typography>
              </Typography>
              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: errors.images ? "error.main" : "divider",
                  p: 3, textAlign: "center", borderRadius: 1,
                }}
              >
                <input
                  accept="image/*"
                  id="image-upload"
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} sx={{ mb: 1 }}>
                    {t("uploadPhotos")}
                  </Button>
                </label>
                {errors.images && (
                  <Typography variant="caption" display="block" color="error">
                    {errors.images}
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {formData.images.map((img, i) => (
                  <Grid item xs={4} sm={3} key={i}>
                    <Box sx={{ position: "relative", height: 80, borderRadius: 1, overflow: "hidden", border: "1px solid #ddd" }}>
                      <img src={img.preview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveImage(i)}
                        sx={{ position: "absolute", top: 0, right: 0, bgcolor: "rgba(255,255,255,0.8)" }}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={18} color="inherit" /> : <AddPhotoAlternateIcon />}
                sx={{ borderRadius: 2, py: 1.5, fontSize: "1.1rem" }}
              >
                {isSubmitting ? t("posting") || "Posting…" : t("postNow")}
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default ListItemPage