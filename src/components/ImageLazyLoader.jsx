"use client"

import { useEffect } from "react"

/**
 * A utility component to apply lazy loading to all images on the site
 * This can be added to App.jsx to automatically enhance all images
 */
const ImageLazyLoader = () => {
  useEffect(() => {
    // Find all images that don't already have loading="lazy"
    const images = document.querySelectorAll('img:not([loading="lazy"])')

    // Add loading="lazy" attribute to all images
    images.forEach((img) => {
      img.setAttribute("loading", "lazy")

      // Optional: Add a fade-in effect when images load
      img.style.opacity = "0"
      img.style.transition = "opacity 0.3s ease"

      img.onload = () => {
        img.style.opacity = "1"
      }
    })

    console.log(`Applied lazy loading to ${images.length} images`)
  }, [])

  return null // This component doesn't render anything
}

export default ImageLazyLoader

