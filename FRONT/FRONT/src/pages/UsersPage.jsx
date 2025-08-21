import { useEffect, useState } from "react";
import api from "../services/api"; // assure-toi que ce fichier existe

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erreur lors de la récupération des utilisateurs :", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Utilisateurs enregistrés</h2>
      <ul>
        {users.map((user) => (
          <li key={user.uid || user.id}>
            {user.name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
