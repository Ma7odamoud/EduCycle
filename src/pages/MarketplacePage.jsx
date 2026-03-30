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
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Rating,
  Tabs,
  Tab,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import { useLanguage } from "../contexts/LanguageContext"
import AnimatedSection from "../components/AnimatedSection"
import { api } from "../lib/api"

// Updated static items with codes instead of hardcoded strings
const staticItems = [
  {
    id: 1,
    name: "كتاب المتاحف و المعارض التعليمية",
    description: "حالة جيدة.",
    price: "Free",
    imageUrl: "/images/mta7f.jpeg",
    rating: 4.5,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade1",
    semester: "sem1",
  },
  {
    id: 2,
    name: "محاضرات في التعليم الإلكتروني",
    description: "حالة جيدة.",
    price: "Free",
    imageUrl: "/images/elta3lem.jpeg",
    rating: 4.8,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade2",
    semester: "sem2",
  },
  {
    id: 3,
    name: "مدخل الي علوم نفسية",
    description: "حالة جيدة.",
    price: "Free",
    imageUrl: "/images/nafsia.jpeg",
    rating: 4.2,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade1",
    semester: "sem2",
  },
  {
    id: 4,
    name: "علم نفس النمو",
    description: "  حالة جيدةالي حد ما",
    price: "Free",
    imageUrl: "/images/elm-nafs.jpeg",
    rating: 4.6,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade2",
    semester: "sem1",
  },
  {
    id: 5,
    name: " معالجة الصور و الرسومات",
    description: "حالة جيدة.",
    price: 50,
    imageUrl: "/images/photos.jpeg",
    rating: 4.7,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade2",
    semester: "sem2",
  },
  {
    id: 6,
    name: "مقدمة البرمجة",
    description: "حالة جيدة.",
    price: 1800,
    imageUrl: "/images/Programming.jpeg",
    rating: 4.9,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade2",
    semester: "sem1",
  },
  {
    id: 7,
    name: " لغات البرمجة المتقدمة",
    description: "حالة جيدة.",
    price: 750,
    imageUrl: "/images/lang.jpeg",
    rating: 4.4,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade1",
    semester: "sem2",
  },
  {
    id: 8,
    name: "مقدمة في الشبكات",
    description: "كتاب بحالة جيدة جدا.",
    price: 20,
    imageUrl: "/images/Shabakat.jpeg",
    rating: 4.8,
    category: "book",
    type: "book",
    department: "tech",
    grade: "grade2",
    semester: "sem1",
  },
]

const departments = [
  { value: "tech", labelKey: "deptTech" },
  { value: "art", labelKey: "deptArt" },
  { value: "media", labelKey: "deptMedia" },
  { value: "music", labelKey: "deptMusic" },
  { value: "econ", labelKey: "deptEcon" },
]

const grades = [
  { value: "grade1", labelKey: "grade1" },
  { value: "grade2", labelKey: "grade2" },
  { value: "grade3", labelKey: "grade3" },
  { value: "grade4", labelKey: "grade4" },
]

const semesters = [
  { value: "sem1", labelKey: "sem1" },
  { value: "sem2", labelKey: "sem2" },
]

const MarketplacePage = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [department, setDepartment] = useState("all")
  const [grade, setGrade] = useState("all")
  const [semester, setSemester] = useState("all")
  const [itemType, setItemType] = useState("all")
  const [allItems, setAllItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from API instead of localStorage
        const { data } = await api.get('/products');
        
        const formattedUserItems = data.data.map(item => ({
          id: item.id,
          name: item.title,
          description: item.description,
          price: item.isFree ? "Free" : `${item.price}`,
          imageUrl: item.images[0] || "/placeholder.svg",
          rating: 5.0, // Default rating for new items
          category: item.category.toLowerCase(),
          type: item.category.toLowerCase() === 'book' ? 'book' : 'item',
          department: "tech", // Defaulting filter values since backend doesn't store them strictly
          grade: "grade1",
          semester: "sem1",
          isUserItem: true
        }));

        setAllItems([...formattedUserItems, ...staticItems]);
      } catch (error) {
        console.error("Failed to load marketplace items:", error);
        setAllItems(staticItems); // Fallback to static items
      }
    };

    fetchProducts();
  }, [])

  // Helper to get translated labels
  const getDeptLabel = (val) => {
    const dept = departments.find(d => d.value === val)
    return dept ? t(dept.labelKey) : val
  }

  const getGradeLabel = (val) => {
    const g = grades.find(g => g.value === val)
    return g ? t(g.labelKey) : val
  }

  const getSemLabel = (val) => {
    const s = semesters.find(s => s.value === val)
    return s ? t(s.labelKey) : val
  }

  const filteredItems = allItems.filter((item) => {
    const searchMatch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Check filters
    const departmentMatch = department === "all" || item.department === department
    const gradeMatch = grade === "all" || item.grade === grade
    const semesterMatch = semester === "all" || item.semester === semester
    const typeMatch = itemType === "all" || item.type === itemType

    return searchMatch && departmentMatch && gradeMatch && semesterMatch && typeMatch
  })

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`)
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AnimatedSection>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "flex-start" },
              mb: 4,
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {t("marketplace")}
            </Typography>

            {/* Right Side Container (Search + Filter) */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: { xs: "100%", md: "auto" } }}>

              {/* Top Row: Search and Button */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ position: "relative", flexGrow: 1, minWidth: "250px" }}>
                  <TextField
                    placeholder={t("searchPlaceholder")}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Button
                  component={RouterLink}
                  to="/list-item"
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{ whiteSpace: "nowrap", fontWeight: 600 }}
                >
                  {t("listYourItem")}
                </Button>
              </Box>

            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", md: "flex-start" },
              mb: 4,
              gap: 2,
            }}
          >
            {/* Note: Removed Tabs based on earlier user preference to use filters instead */}

            {/* Filters */}
            <Box sx={{ alignSelf: { xs: "stretch", md: "flex-end" }, display: "flex", gap: 2, flexWrap: "wrap", width: "100%" }}>

              {/* Type Filter */}
              <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'background.paper', flexGrow: 1 }}>
                <InputLabel id="type-select-label">{t("filterType")}</InputLabel>
                <Select
                  labelId="type-select-label"
                  value={itemType}
                  label={t("filterType")}
                  onChange={(e) => setItemType(e.target.value)}
                >
                  <MenuItem value="all"><em>{t("allTypes")}</em></MenuItem>
                  <MenuItem value="book">📚 {t("typeBook")}</MenuItem>
                  <MenuItem value="item">🛠️ {t("typeItem")}</MenuItem>
                </Select>
              </FormControl>

              {/* Department Filter */}
              <FormControl size="small" sx={{ minWidth: 150, bgcolor: 'background.paper', flexGrow: 1 }}>
                <InputLabel id="department-select-label">{t("filterDepartment")}</InputLabel>
                <Select
                  labelId="department-select-label"
                  value={department}
                  label={t("filterDepartment")}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <MenuItem value="all"><em>{t("allDepts")}</em></MenuItem>
                  {departments.map((dept) => (
                    <MenuItem key={dept.value} value={dept.value}>{t(dept.labelKey)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Grade Filter */}
              <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'background.paper', flexGrow: 1 }}>
                <InputLabel id="grade-select-label">{t("filterYear")}</InputLabel>
                <Select
                  labelId="grade-select-label"
                  value={grade}
                  label={t("filterYear")}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <MenuItem value="all"><em>{t("allYears")}</em></MenuItem>
                  {grades.map((g) => (
                    <MenuItem key={g.value} value={g.value}>{t(g.labelKey)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Semester Filter */}
              <FormControl size="small" sx={{ minWidth: 120, bgcolor: 'background.paper', flexGrow: 1 }}>
                <InputLabel id="semester-select-label">{t("filterSemester")}</InputLabel>
                <Select
                  labelId="semester-select-label"
                  value={semester}
                  label={t("filterSemester")}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <MenuItem value="all"><em>{t("allSemesters")}</em></MenuItem>
                  {semesters.map((s) => (
                    <MenuItem key={s.value} value={s.value}>{t(s.labelKey)}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Box>
          </Box>


          <Grid container spacing={3}>
            {filteredItems.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleItemClick(item.id)}>
                    <CardMedia component="img" height="200" image={item.imageUrl} alt={item.name} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, whiteSpace: "pre-line", overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {item.description}
                      </Typography>

                      {/* Show Details on card */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {getDeptLabel(item.department)} • {getGradeLabel(item.grade)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.type === 'book' ? `📚 ${t("typeBook")}` : `🛠️ ${t("typeItem")}`} • {getSemLabel(item.semester)}
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.main" }}>
                        {item.price === 'Free' ? (t("free") || "Free") : `${item.price} EGP`}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                        <Rating name="read-only" value={item.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({item.rating})
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            {filteredItems.length === 0 && (
              <Grid item xs={12}>
                <Typography variant="h6" align="center" color="text.secondary" sx={{ py: 4 }}>
                  {t("noItemsFound")}
                </Typography>
              </Grid>
            )}
          </Grid>
        </AnimatedSection>
      </Container>
    </Box>
  )
}


export default MarketplacePage