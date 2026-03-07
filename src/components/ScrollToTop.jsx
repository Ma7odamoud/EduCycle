"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Component that scrolls to the top of the page when the route changes
 */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Use "auto" for instant scrolling without animation
    })
  }, [pathname])

  return null
}

export default ScrollToTop

