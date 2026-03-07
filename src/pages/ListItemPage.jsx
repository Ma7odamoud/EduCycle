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
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import DeleteIcon from "@mui/icons-material/Delete"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import { useLanguage } from "../contexts/LanguageContext"

const departments = ["تكنولوجيا التعليم", "فنية", "اعلام", "موسيقي", "اقتصاد"]

const ListItemPage = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()

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
    if (formData.images.length === 0) newErrors.images = t("errPhotos")
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      const newItem = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        displayImage: formData.images[0]?.preview || ""
      }
      const existingItems = JSON.parse(localStorage.getItem("marketplace_items") || "[]")
      localStorage.setItem("marketplace_items", JSON.stringify([newItem, ...existingItems]))
      navigate("/marketplace")
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
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{ borderRadius: 2, py: 1.5, fontSize: "1.1rem" }}
              >
                {t("postNow")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  )
}

export default ListItemPage