import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import '../styles/Headers.css';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import { useUser } from "../contexts/UserContext";

export default function Headers({ children }) {
    const { user } = useUser();
    const { language, toggleLanguage } = useLanguage(); // Nouveau
    const t = translations[language];

    const { toggleSidebar } = useSidebar();

    return (
        <header className="head">
            <div className="head_left">
                <button className="hamburger" onClick={toggleSidebar}>
                    <div className="burger"></div>
                    <div className="burger"></div>
                    <div className="burger"></div>
                </button>
                <p>{children}</p>
            </div>
            <Link className="head_right" to='/notif'>
                <i className='bxr  bxs-bell'  ></i>
            </Link>
        </header>
    );
}
