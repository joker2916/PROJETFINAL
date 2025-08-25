import { useState } from "react";
import '../styles/CreateUser.css'
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import api from "../services/api"; // <-- Assure-toi que ton instance axios est bien configurée
import { toast } from "react-toastify";

export default function CreateUser({ onClose }) {
    const { language } = useLanguage();
    const t = translations[language];

    const [name, setName] = useState("");
    const [postname, setPostname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user"); // par défaut
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/users/register", {
                name,
                postname,
                email,
                role
            });

            setSuccess("Utilisateur créé avec succès !");
            setError("");
            toast.success('Utilisateur créé avec succès !');
            onClose(); // Ferme la modal après succès
        } catch (err) {
            console.error("Erreur API:", err.response?.data || err.message); // <
            setError("Erreur lors de la création");
            setSuccess("");
            toast.error('Erreur lors de la création de l\'utilisateur');
        }
    };

    return (
        <div className="sensor_modal create-user-main">
            <form className="sensor_container create-user-container" onSubmit={handleSubmit}>
                <div className="create-user-top">
                    <span>Créer un utilisateur</span>

                    <input
                        type="text"
                        placeholder="Prénom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Nom"
                        value={postname}
                        onChange={(e) => setPostname(e.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="input-select-role">
                        <input
                            type="radio"
                            name="role"
                            id="admin"
                            className="select-role"
                            checked={role === "admin"}
                            onChange={() => setRole("admin")}
                        />
                        <label htmlFor="admin">Admin</label>

                        <input
                            type="radio"
                            name="role"
                            id="user"
                            className="select-role"
                            checked={role === "user"}
                            onChange={() => setRole("user")}
                        />
                        <label htmlFor="user">User</label>
                    </div>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <div className="sensor_button">
                    <button type="submit">{t.validate}</button>
                    <button type="button" onClick={onClose}>{t.cancel}</button>
                </div>
            </form>
        </div>
    );
}
