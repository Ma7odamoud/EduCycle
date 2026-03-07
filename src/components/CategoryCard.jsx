/* eslint-disable no-unused-vars */
import { Box, Typography } from "@mui/material"

/**
 * A reusable category card component with hover animation
 */
const CategoryCard = ({ icon: Icon, title, description }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-10px)" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: 70, sm: 100 },
          height: { xs: 70, sm: 100 },
          bgcolor: "primary.light",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          mb: 2,
        }}
      >
        <Icon sx={{ fontSize: { xs: 30, sm: 40 }, color: "#ffffff" }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            px: { xs: 1, sm: 0 },
            // Ensure text doesn't overflow on small screens
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  )
}

export default CategoryCard

