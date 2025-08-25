import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/NavBar.css';
import { useSidebar } from "../contexts/SidebarContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";



const NavBar = ({ active }) => {
    const { language } = useLanguage();
    const t = translations[language];

    const { sidebarVisible, closeSidebar } = useSidebar();

    const menuNav = [
        { title: t.home, id: 1, link: "/dashboardhome" },
        { title: t.history, id: 2, link: "/history" },
        { title: t.settings, id: 3, link: "/setting" }
    ];


    const menuItems = menuNav.map(menu => (
        <li key={menu.id}>
            <Link
                to={menu.link}
                id={menu.id}
                className={menu.id === active ? "active" : "lambda"}
                style={{ textTransform: "capitalize" }}
                onClick={closeSidebar}
            >
                {menu.title}
            </Link>
        </li>
    ));

    return (
        <aside
            className={`header ${sidebarVisible ? "visible" : ""}`}
        >
            <nav>
                <div className="header_top">
                    <div className="headerTop_top">
                        <h1>A<span>.I</span></h1>
                        <i className='bxr  bx-x' onClick={closeSidebar} ></i>
                    </div>
                    <ul>{menuItems}</ul>
                </div>
                <div className="header_bot">
                    <Link to='/' style={{ textTransform: "capitalize" }}>{t.disconnect}</Link>
                </div>
            </nav>
        </aside>
    );
};

export default NavBar;
