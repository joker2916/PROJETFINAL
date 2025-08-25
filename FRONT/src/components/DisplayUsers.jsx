// DisplayUsers.jsx
import { useEffect, useState } from "react";
import axios from "../services/api";
import '../styles/CreateUser.css';
import { useUser } from "../contexts/UserContext";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18/translations";
import { disableButton } from "../pages/Settings";

export default function DisplayUsers({ selectedUsers, onSelectUser, selectAll, onUsersLoaded, disableButton, userGrade, onEditUser }) {
    const { language } = useLanguage();
    const t = translations[language];
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("/users")
            .then(res => {
                setUsers(res.data);
                onUsersLoaded(res.data); // 👈 renvoie la liste à SettingsContainer
            })
            .catch(err => {
                console.error("Erreur API GET /users :", err);
                setError(t.errorFetchingUsers || "Erreur lors du chargement.");
            });
    }, []);

    if (error) return <p className="error">{error}</p>;

    return (
        <>
            {users.map(user => (
                <li key={user.id}>
                    <input
                        type="checkbox"
                        id={`user${user.id}`}
                        checked={selectAll || selectedUsers.includes(user.id)}
                        onChange={(e) => onSelectUser(user.id, e.target.checked)}
                    />
                    <label htmlFor={`user${user.id}`}>
                        {user.name} {user.postname} ({user.role})
                    </label>
                    <button className="update-user" disabled={disableButton} onClick={() => onEditUser(user)}>Modifier </button>
                </li>
            ))}
        </>
    );
}
