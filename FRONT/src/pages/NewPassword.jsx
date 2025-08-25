import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import "../styles/LogIn.css";

export default function NewPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const auth = getAuth();

    const [password, setPassword] = useState("");
    const [passwordConf, setConfPass] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [email, setEmail] = useState("");
    const [validCode, setValidCode] = useState(false);

    const oobCode = searchParams.get("oobCode");

    useEffect(() => {
        // 🔐 Vérifie le code Firebase
        if (oobCode) {
            verifyPasswordResetCode(auth, oobCode)
                .then(email => {
                    setEmail(email);
                    setValidCode(true);
                })
                .catch(() => {
                    setError("Lien invalide ou expiré.");
                });
        }
    }, [oobCode]);

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== passwordConf) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            await confirmPasswordReset(auth, oobCode, password);
            setInfo("Mot de passe mis à jour avec succès !");
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.error(err);
            setError("Erreur lors de la mise à jour du mot de passe.");
        }
    };

    return (
        <div className="container">
            <div className="left_content">
                <span>Nouveau mot de passe</span>
                {email && <p>Réinitialisation pour : {email}</p>}
                {error && <p className="error">{error}</p>}
                {info && <p className="success">{info}</p>}

                {validCode && (
                    <form onSubmit={handleReset}>
                        <div className="input_item">
                            <input
                                type="password"
                                placeholder="Nouveau mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input_item">
                            <input
                                type="password"
                                placeholder="Confirmer mot de passe"
                                value={passwordConf}
                                onChange={(e) => setConfPass(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Valider</button>
                    </form>
                )}
            </div>

            <div className="right_content">
                <div className="bg"></div>
            </div>
        </div>
    );
}
