// src/pages/ForgotPassword.jsx
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import '../styles/LogIn.css';
import { toast } from "react-toastify";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Un lien de réinitialisation a été envoyé à votre adresse email.");
        } catch (err) {
            console.error(err);
            if (err.code === "auth/user-not-found") {
                setError("Aucun compte trouvé avec cet email.");
                toast.error(err)
                console.log(err, error)
            } else if (err.code === "auth/invalid-email") {
                setError("Email invalide.");
                console.log(err, error)
            } else {
                setError("Erreur lors de l'envoi du lien.");
                console.log(err, error)
            }
        }
    };

    return (
        <div className="container">
            <div className="left_content">
                <span>Mot de passe oublié ?</span>
                <p>Entrez votre email pour recevoir un lien de réinitialisation</p>

                <form onSubmit={handleSubmit}>
                    <div className="input_item">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button type="submit">Valider</button>
                </form>
            </div>

            <div className="right_content">
                <div className="bg"></div>
            </div>
        </div>
    );
}
