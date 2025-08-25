import { useState } from "react";
import '../styles/CreateUser.css'
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";


export default function DeleteUser({ onClose }) {
    const { language } = useLanguage();
    const t = translations[language];


}