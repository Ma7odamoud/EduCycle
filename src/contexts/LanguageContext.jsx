/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react"
import { translations } from "../data/translations"

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "en")

    useEffect(() => {
        localStorage.setItem("language", language)
        document.dir = language === "ar" ? "rtl" : "ltr"
        document.documentElement.lang = language
    }, [language])

    const t = (key) => {
        return translations[language][key] || key
    }

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "ar" : "en"))
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            <div dir={language === "ar" ? "rtl" : "ltr"}>
                {children}
            </div>
        </LanguageContext.Provider>
    )
}
