import React, { useState } from "react";
import api from "../services/api";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import { toast } from "react-toastify";

export default function UpdateUserBox({ user, onClose, onUpdated }) {
    const { language } = useLanguage();
    const t = translations[language];

    const [name, setName] = useState(user.name || "");
    const [postname, setPostname] = useState(user.postname || "");
    const [email, setEmail] = useState(user.email || "");
    const [role, setRole] = useState(user.role || "user");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            await api.put(`/users/${user.id}`, { name, postname, email, role });
            setSuccess(t.updateSuccess || "Utilisateur mis à jour !");
            toast.success("Utilisateur mis à jour avec succès !")
            if (onUpdated) onUpdated(); // Permet au parent de recharger la liste
            setTimeout(() => onClose(), 1000); // Ferme après succès
        } catch (err) {
            console.error("Erreur de mise à jour :", err);
            setError(t.updateError || "Erreur lors de la mise à jour.");
            toast.error("Erreur lors de la mise à jour de l'utilisateur !")
        }
    };

    return (
        <div className="sensor_modal create-user-main">
            <form className="sensor_container create-user-container" onSubmit={handleSubmit}>
                <div className="create-user-top">
                    <span>{t.updateUser || "Modifier l'utilisateur"}</span>

                    <div className="input-update">
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        {name !== '' && <i className='bxr  bx-x clear-update' onClick={() => setName('')}></i>}
                    </div>

                    <div className="input-update">
                        <input
                            type="text"
                            placeholder="Nom"
                            value={postname}
                            onChange={(e) => setPostname(e.target.value)}
                            required
                        />
                        {postname !== '' && <i className='bxr  bx-x clear-update' onClick={() => setPostname('')} ></i>}
                    </div>


                    <div className="input-update">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {email !== '' && <i className='bxr  bx-x clear-update' onClick={() => setEmail('')}></i>}

                    </div>



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
