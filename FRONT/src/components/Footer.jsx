import React from "react";
import '../styles/Footer.css';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="footer_container">
                <div className="footer_top">
                    <div className="footerTop_container">
                        <h4>Liens</h4>

                        <ul>
                            <li><Link to='/home'>Accueil</Link></li>
                            <li><Link to='/menu'>Menu</Link></li>
                            <li><Link to='/event'>Jeux Et Evénements</Link></li>
                            <li><Link to='/profil'>Profil</Link></li>
                            <li><Link to='/event'>Historique</Link></li>
                            <li><Link to='/event'>Parrainage</Link></li>
                            <li><Link to='/event'>Déconnexion</Link></li>
                        </ul>
                    </div>

                    <div className="footerTop_container">
                        <h4>Suivez-nous</h4>

                        <ul>
                            <li><a href="">Linkedin</a></li>
                            <li><a href="">Twitter</a></li>
                            <li><a href="">Instagram</a></li>
                            <li><a href="">Facebook</a></li>
                        </ul>
                    </div>

                    <div className="footerTop_container footer_contact">
                        <h4>Contactez-nous</h4>
                        <a href="">ntambube@gmail.com</a>
                    </div>
                </div>

                <div className="footer_bot">
                    <p>© 2024 Zeduc-Sp@ce. Tous les droits reservés</p>
                </div>
            </div>
        </footer>
    )
}