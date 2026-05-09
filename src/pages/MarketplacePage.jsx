"use client"

import { useState, useEffect } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Pagination,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import FilterListIcon from "@mui/icons-material/FilterList"
import { useLanguage } from "../contexts/LanguageContext"
import AnimatedSection from "../components/AnimatedSection"
import { api } from "../lib/api"

const ITEMS_PER_PAGE = 8

const staticItems = [
  { id: 1, name: "كتاب المتاحف و المعارض التعليمية", description: "حالة جيدة.", price: "Free", imageUrl: "/images/mta7f.jpeg", rating: 4.5, category: "book", type: "book", department: "tech", grade: "grade1", semester: "sem1" },
  { id: 2, name: "محاضرات في التعليم الإلكتروني", description: "حالة جيدة.", price: "Free", imageUrl: "/images/elta3lem.jpeg", rating: 4.8, category: "book", type: "book", department: "tech", grade: "grade2", semester: "sem2" },
  { id: 3, name: "مدخل الي علوم نفسية", description: "حالة جيدة.", price: "Free", imageUrl: "/images/nafsia.jpeg", rating: 4.2, category: "book", type: "book", department: "tech", grade: "grade1", semester: "sem2" },
  { id: 4, name: "علم نفس النمو", description: "حالة جيدة الي حد ما", price: "Free", imageUrl: "/images/elm-nafs.jpeg", rating: 4.6, category: "book", type: "book", department: "tech", grade: "grade2", semester: "sem1" },
  { id: 5, name: "معالجة الصور و الرسومات", description: "حالة جيدة.", price: 50, imageUrl: "/images/photos.jpeg", rating: 4.7, category: "book", type: "book", department: "tech", grade: "grade2", semester: "sem2" },
  { id: 6, name: "مقدمة البرمجة", description: "حالة جيدة.", price: 1800, imageUrl: "/images/Programming.jpeg", rating: 4.9, category: "book", type: "book", department: "tech", grade: "grade2", semester: "sem1" },
  { id: 7, name: "لغات البرمجة المتقدمة", description: "حالة جيدة.", price: 750, imageUrl: "/images/lang.jpeg", rating: 4.4, category: "book", type: "book", department: "tech", grade: "grade1", semester: "sem2" },
  { id: 8, name: "مقدمة في الشبكات", description: "كتاب بحالة جيدة جدا.", price: 20, imageUrl: "/images/Shabakat.jpeg", rating: 4.8, category: "book", type: "book", department: "tech", grade: "grade2", semester: "sem1" },
]

const departments = [
  { value: "all", labelKey: "allDepts" },
  { value: "tech", labelKey: "deptTech" },
  { value: "art", labelKey: "deptArt" },
  { value: "media", labelKey: "deptMedia" },
  { value: "music", labelKey: "deptMusic" },
  { value: "econ", labelKey: "deptEcon" },
]

const grades = [
  { value: "all", labelKey: "allYears" },
  { value: "grade1", labelKey: "grade1" },
  { value: "grade2", labelKey: "grade2" },
  { value: "grade3", labelKey: "grade3" },
  { value: "grade4", labelKey: "grade4" },
]

const semesters = [
  { value: "all", labelKey: "allSemesters" },
  { value: "sem1", labelKey: "sem1" },
  { value: "sem2", labelKey: "sem2" },
]

const itemTypes = [
  { value: "all", labelKey: "allTypes" },
  { value: "book", labelKey: "typeBook" },
  { value: "item", labelKey: "typeItem" },
]

// Condition badge colors
const conditionColor = {
  good: { bg: "#e8f5e9", color: "#2e7d32", label: "Good" },
  fair: { bg: "#fff8e1", color: "#f57f17", label: "Fair" },
  new: { bg: "#e3f2fd", color: "#1565c0", label: "New" },
}

const semesterShort = { sem1: "S1", sem2: "S2" }

function getCondition(rating) {
  if (rating >= 4.7) return "new"
  if (rating >= 4.3) return "good"
  return "fair"
}

// Individual Book Card styled like the reference image
const BookCard = ({ item, onFavoriteToggle, isFavorited, onClick, t }) => {
  const cond = getCondition(item.rating)
  const condStyle = conditionColor[cond]
  const isFree = item.price === "Free" || item.price === 0

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        bgcolor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        height: "100%",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 28px rgba(65,171,93,0.18)",
        },
      }}
    >
      {/* Book Cover */}
      <Box sx={{ position: "relative", width: "100%", pt: "130%", bgcolor: "#f4f4f4" }}>
        <Box
          component="img"
          src={item.imageUrl}
          alt={item.name}
          sx={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => { e.target.src = "/placeholder.svg" }}
        />

        {/* Condition Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10, left: 10,
            bgcolor: condStyle.bg,
            color: condStyle.color,
            fontSize: "0.65rem",
            fontWeight: 700,
            px: 1,
            py: 0.3,
            borderRadius: "6px",
            letterSpacing: 0.5,
            textTransform: "uppercase",
          }}
        >
          {condStyle.label}
        </Box>

        {/* Favorite Button */}
        <IconButton
          size="small"
          onClick={(e) => { e.stopPropagation(); onFavoriteToggle(item.id) }}
          sx={{
            position: "absolute",
            top: 6, right: 6,
            bgcolor: "rgba(255,255,255,0.9)",
            "&:hover": { bgcolor: "#fff" },
            width: 30, height: 30,
          }}
        >
          {isFavorited
            ? <FavoriteIcon sx={{ fontSize: 16, color: "#e53935" }} />
            : <FavoriteBorderIcon sx={{ fontSize: 16, color: "#aaa" }} />
          }
        </IconButton>
      </Box>

      {/* Card Content */}
      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* Course code chip */}
        <Chip
          label={
            item.department?.toUpperCase() +
            " · " +
            item.grade?.replace("grade", "Y") +
            " · " +
            (semesterShort[item.semester] || item.semester || "")
          }
          size="small"
          sx={{
            alignSelf: "flex-start",
            mb: 0.7,
            fontSize: "0.6rem",
            height: 20,
            bgcolor: "#f0faf2",
            color: "#41AB5D",
            fontWeight: 700,
            letterSpacing: 0.3,
          }}
        />

        {/* Title */}
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            fontSize: "0.82rem",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            mb: 0.5,
            flexGrow: 1,
            color: "#1a1a2e",
          }}
        >
          {item.name}
        </Typography>

        {/* Delivery method */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          {item.isUserItem
            ? <LocalShippingOutlinedIcon sx={{ fontSize: 13, color: "#888" }} />
            : <StorefrontOutlinedIcon sx={{ fontSize: 13, color: "#888" }} />
          }
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
            {item.isUserItem ? "Delivery" : "Campus Pickup"}
          </Typography>
        </Box>

        {/* Price row */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: "auto" }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "1rem",
              color: isFree ? "#41AB5D" : "#1a1a2e",
            }}
          >
            {isFree ? (t("free") || "Free") : `${item.price} EGP`}
          </Typography>

          <Button
            size="small"
            variant="text"
            onClick={(e) => { e.stopPropagation(); onClick() }}
            sx={{
              fontSize: "0.65rem",
              color: "#41AB5D",
              fontWeight: 700,
              p: 0,
              minWidth: "auto",
              "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
            }}
          >
            {t("message") || "Message"}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const MarketplacePage = () => {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("all")
  const [grade, setGrade] = useState("all")
  const [semester, setSemester] = useState("all")
  const [itemType, setItemType] = useState("all")
  const [allItems, setAllItems] = useState([])
  const [favorites, setFavorites] = useState({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products")
        const formatted = data.data.map((item) => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.isFree ? "Free" : `${item.price}`,
          imageUrl: item.images[0] || "/placeholder.svg",
          rating: 5.0,
          category: item.category.toLowerCase(),
          type: item.category.toLowerCase() === "book" ? "book" : "item",
          department: "tech",
          grade: "grade1",
          semester: "sem1",
          isUserItem: true,
        }))
        setAllItems([...formatted, ...staticItems])
      } catch {
        setAllItems(staticItems)
      }
    }
    fetchProducts()
  }, [])

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1) }, [searchQuery, department, grade, semester, itemType])

  const filteredItems = allItems.filter((item) => {
    const q = searchQuery.toLowerCase()
    const searchMatch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
    const departmentMatch = department === "all" || item.department === department
    const gradeMatch = grade === "all" || item.grade === grade
    const semesterMatch = semester === "all" || item.semester === semester
    const typeMatch = itemType === "all" || item.type === itemType
    return searchMatch && departmentMatch && gradeMatch && semesterMatch && typeMatch
  })

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const paginatedItems = filteredItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleFavorite = (id) => setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))

  const filterSelectSx = {
    bgcolor: "#fff",
    borderRadius: "10px",
    fontSize: "0.82rem",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#41AB5D" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#41AB5D" },
    minWidth: 130,
  }

  return (
    <Box sx={{ bgcolor: "#f8faf8", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedSection>

          {/* ── Header ── */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: "#1a1a2e", mb: 0.3 }}>
                {t("marketplace")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {filteredItems.length} {t("itemsFound") || "items found"}
              </Typography>
              {/* Note: add itemsFound key to translations.js as "items found" (en) and "عنصر بتطابق" (ar) */}
            </Box>

            <Button
              component={RouterLink}
              to="/list-item"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#41AB5D",
                borderRadius: "10px",
                fontWeight: 700,
                px: 2.5,
                py: 1,
                boxShadow: "0 4px 14px rgba(65,171,93,0.35)",
                "&:hover": { bgcolor: "#2d7a42" },
              }}
            >
              {t("listYourItem")}
            </Button>
          </Box>

          {/* ── Search + Filters Bar ── */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "14px",
              p: 2,
              mb: 4,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              alignItems: "center",
            }}
          >
            {/* Filter icon label */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#41AB5D" }}>
              <FilterListIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#41AB5D", whiteSpace: "nowrap" }}>
                {t("filter") || "Filter"}
              </Typography>
            </Box>

            {/* Search */}
            <TextField
              placeholder={t("searchPlaceholder")}
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#aaa", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                flex: "1 1 200px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  fontSize: "0.82rem",
                  "& fieldset": { borderColor: "#e0e0e0" },
                  "&:hover fieldset": { borderColor: "#41AB5D" },
                  "&.Mui-focused fieldset": { borderColor: "#41AB5D" },
                },
              }}
            />

            {/* Type */}
            <FormControl size="small">
              <Select
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                displayEmpty
                sx={filterSelectSx}
              >
                {itemTypes.map((t2) => (
                  <MenuItem key={t2.value} value={t2.value}>{t(t2.labelKey)}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Department */}
            <FormControl size="small">
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                displayEmpty
                sx={filterSelectSx}
              >
                {departments.map((d) => (
                  <MenuItem key={d.value} value={d.value}>{t(d.labelKey)}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Grade */}
            <FormControl size="small">
              <Select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                displayEmpty
                sx={filterSelectSx}
              >
                {grades.map((g) => (
                  <MenuItem key={g.value} value={g.value}>{t(g.labelKey)}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Semester */}
            <FormControl size="small">
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                displayEmpty
                sx={filterSelectSx}
              >
                {semesters.map((s) => (
                  <MenuItem key={s.value} value={s.value}>{t(s.labelKey)}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Active filter chips */}
            {department !== "all" && (
              <Chip label={t(departments.find(d => d.value === department)?.labelKey)} onDelete={() => setDepartment("all")} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
            )}
            {grade !== "all" && (
              <Chip label={t(grades.find(g => g.value === grade)?.labelKey)} onDelete={() => setGrade("all")} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
            )}
            {semester !== "all" && (
              <Chip label={t(semesters.find(s => s.value === semester)?.labelKey)} onDelete={() => setSemester("all")} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
            )}
            {itemType !== "all" && (
              <Chip label={t(itemTypes.find(x => x.value === itemType)?.labelKey)} onDelete={() => setItemType("all")} size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: 600 }} />
            )}
          </Box>

          {/* ── Grid ── */}
          {paginatedItems.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h6" color="text.secondary">{t("noItemsFound")}</Typography>
            </Box>
          ) : (
            <Grid container spacing={2.5}>
              {paginatedItems.map((item) => (
                <Grid item key={item.id} xs={6} sm={4} md={3}>
                  <BookCard
                    item={item}
                    t={t}
                    isFavorited={!!favorites[item.id]}
                    onFavoriteToggle={toggleFavorite}
                    onClick={() => navigate(`/item/${item.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <Stack alignItems="center" sx={{ mt: 5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, v) => { setPage(v); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                color="primary"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "8px",
                    fontWeight: 600,
                  },
                  "& .Mui-selected": {
                    bgcolor: "#41AB5D !important",
                    color: "#fff",
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                {t("page") || "Page"} {page} {t("of") || "of"} {totalPages}
              </Typography>
            </Stack>
          )}

        </AnimatedSection>
      </Container>
    </Box>
  )
}

export default MarketplacePage