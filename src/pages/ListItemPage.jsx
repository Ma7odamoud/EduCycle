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
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { useLanguage } from "../contexts/LanguageContext"
import { useAuth } from "../contexts/AuthContext"
import { api } from "../lib/api"

const departments = ["تكنولوجيا التعليم", "فنية", "اعلام", "موسيقي", "اقتصاد"]

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
  const [submitError, setSubmitError] = useState(null)

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    if (errors[name]) setErrors({ ...errors, [name]: null })
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
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
    if (formData.images.length === 0) newErrors.images = t("errPhotos") || "Please upload at least one photo"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    if (!user) {
      setSubmitError("You must be logged in to list an item.")
      return
    }
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      let uploadedImageUrls = [];

      if (formData.images.length > 0) {
        const uploadData = new FormData();
        formData.images.forEach(imgObj => {
          if (imgObj.file) uploadData.append("files", imgObj.file);
        });

        let uploadRes;
        try {
          uploadRes = await api.post("/upload", uploadData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        } catch (uploadErr) {
          // Check if the server returned 401 (not authenticated)
          if (uploadErr.response?.status === 401) {
            setSubmitError("Your session has expired. Please log in again.");
          } else {
            const uploadErrMsg = uploadErr.response?.data?.error || "Failed to upload images. Please try again.";
            setSubmitError(uploadErrMsg);
          }
          return; // outer finally will call setIsSubmitting(false)
        }

        // Validate that we got back real URLs (not an HTML page or empty response)
        const urls = uploadRes.data?.urls;
        if (!Array.isArray(urls) || urls.length === 0 || urls.some(u => !u || !u.startsWith('http'))) {
          setSubmitError("Image upload failed: server returned no valid URLs. Please try again.");
          return; // outer finally will call setIsSubmitting(false)
        }
        uploadedImageUrls = urls;
      }

      // phoneNumber is automatically pulled from the user's profile on the backend
      const payload = {
        title: formData.title,
        description: `${formData.description}\n\nGrade: ${formData.grade}\nSemester: ${formData.semester}\nDepartment: ${formData.department}`,
        price: Number(formData.price) || 0,
        isFree: formData.isFree,
        category: formData.type === "book" ? "BOOK" : "OTHER",
        images: uploadedImageUrls,
      };

      await api.post("/products", payload);
      navigate("/marketplace")
    } catch (error) {
      console.error("Failed to create product:", error);
      // Check for 401 auth error
      if (error.response?.status === 401) {
        setSubmitError("Your session has expired. Please log in again.");
      } else {
        const msg = error.response?.data?.error
          || error.response?.data?.details?.[Object.keys(error.response?.data?.details || {})[0]]?.[0]
          || "Failed to create listing. Please try again.";
        setSubmitError(msg);
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button component={RouterLink} to="/marketplace" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        {t("backToMarket")}
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          {t("listYourResourceTitle")}
        </Typography>

        {/* Show seller's phone number info */}
        {user?.phoneNumber && (
          <Alert severity="info" sx={{ mb: 3 }}>
            {t("contactPhone") || "Buyers will contact you via"}: <strong>{user.phoneNumber}</strong>
            {" "}— {t("updatePhoneInProfile") || "Update in your profile settings if needed."}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>

            {/* Type Selection */}
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

            {/* Name */}
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
              <Typography variant="subtitle1" gutterBottom>{t("photos")}</Typography>
              <Box sx={{ border: "2px dashed", borderColor: errors.images ? "error.main" : "divider", p: 3, textAlign: "center", borderRadius: 1 }}>
                <input accept="image/*" id="image-upload" type="file" multiple onChange={handleImageUpload} style={{ display: "none" }} />
                <label htmlFor="image-upload">
                  <Button variant="outlined" component="span" startIcon={<CloudUploadIcon />} sx={{ mb: 1 }}>
                    {t("uploadPhotos")}
                  </Button>
                </label>
                {errors.images && <Typography variant="caption" display="block" color="error">{errors.images}</Typography>}
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
              {submitError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError(null)}>
                  {submitError}
                </Alert>
              )}
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