"use client"

import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useScrollTrigger,
  Menu,
  MenuItem,
} from "@mui/material"
import { Link as RouterLink, useLocation } from "react-router-dom"
import RecyclingIcon from "@mui/icons-material/Recycling"
import MenuIcon from "@mui/icons-material/Menu"
import PersonIcon from "@mui/icons-material/Person"
import { useLanguage } from "../contexts/LanguageContext"

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    sx: {
      ...children.props.sx,
      borderBottom: trigger ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
    },
  })
}

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const location = useLocation()
  const { t, language, toggleLanguage } = useLanguage()

  const navItems = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    { name: t("services"), path: "/services" },
    { name: t("marketplace"), path: "/marketplace" },
    { name: t("community"), path: "/community" },
    { name: t("contact"), path: "/contact" },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}>
        <RecyclingIcon sx={{ mr: 1, color: "primary.main", fontSize: "1.8rem" }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "primary.main",
            textDecoration: "none",
            fontSize: "1.3rem",
          }}
        >
          EduCycle
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: "center",
                bgcolor: isActive(item.path) ? "primary.light" : "transparent",
                color: isActive(item.path) ? "primary.main" : "inherit",
                fontSize: "1rem",
              }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/login" sx={{ textAlign: "center", fontSize: "1rem" }}>
            <ListItemText primary={t("login")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/signup"
            sx={{ textAlign: "center", bgcolor: "primary.main", color: "white", my: 1, mx: 2, fontSize: "1rem" }}
          >
            <ListItemText primary={t("signup")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <ElevationScroll>
      <AppBar position="sticky" sx={{ bgcolor: "white", color: "text.primary", boxShadow: "none" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center", mr: { xs: 1, md: 4 } }}>
              <RecyclingIcon sx={{ mr: 1, color: "primary.main", fontSize: { xs: "1.8rem", md: "2rem" } }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "primary.main",
                  textDecoration: "none",
                  fontSize: { xs: "1.3rem", md: "1.5rem" },
                  ":hover": {
                    color: "primary.dark",
                  },
                }}
              >
                EduCycle
              </Typography>
            </Box>

            {/* Mobile menu button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    color: isActive(item.path) ? "primary.main" : "text.primary",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 2,
                    position: "relative",
                    "&::after": isActive(item.path)
                      ? {
                        content: '""',
                        position: "absolute",
                        bottom: 8,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40%",
                        height: 3,
                        bgcolor: "primary.main",
                        borderRadius: 1.5,
                      }
                      : {},
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>

            {/* Auth buttons & Language Toggle */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", ml: 2 }}>
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                sx={{
                  minWidth: "auto",
                  color: "text.primary",
                  fontWeight: 600,
                  mr: 2,
                  fontSize: "0.95rem"
                }}
              >
                {language === "en" ? "AR" : "EN"}
              </Button>

              <Button
                component={RouterLink}
                to="/login"
                variant="outlined"
                color="primary"
                sx={{
                  fontWeight: 600,
                  mr: 1.5,
                  px: 2.5,
                  py: 0.8,
                  fontSize: "0.95rem",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    backgroundColor: "rgba(65, 171, 93, 0.04)",
                  },
                }}
              >
                {t("login")}
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="primary"
                sx={{
                  fontWeight: 600,
                  px: 2.5,
                  py: 0.8,
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 10px rgba(65, 171, 93, 0.3)",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(65, 171, 93, 0.4)",
                    backgroundColor: "#3a9a54",
                  },
                }}
              >
                {t("signup")}
              </Button>
              <IconButton
                aria-label="user account"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleUserMenuOpen}
                color="primary"
                sx={{
                  ml: 1.5,
                  border: "1px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "rgba(65, 171, 93, 0.04)",
                  },
                }}
              >
                <PersonIcon />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={userMenuAnchor}
                keepMounted
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem component={RouterLink} to="/profile" onClick={handleUserMenuClose} sx={{ minWidth: 150 }}>
                  {t("profile")}
                </MenuItem>
                <MenuItem component={RouterLink} to="/admin" onClick={handleUserMenuClose}>
                  {t("adminDashboard")}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleUserMenuClose}>{t("logout")}</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </ElevationScroll>
  )
}

export default Navbar

