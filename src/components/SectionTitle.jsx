import { Typography } from "@mui/material"

/**
 * A reusable section title component with a green underline
 */
const SectionTitle = ({ children, align = "center", ...props }) => {
  return (
    <Typography
      variant="h4"
      component="h2"
      align={align}
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1.75rem", md: "2.25rem" },
        mb: 5,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -12,
          left: align === "center" ? "50%" : 0,
          transform: align === "center" ? "translateX(-50%)" : "none",
          width: 80,
          height: 4,
          backgroundColor: "primary.main",
          borderRadius: 2,
        },
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Typography>
  )
}

export default SectionTitle

