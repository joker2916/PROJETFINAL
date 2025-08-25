import { useState } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../services/firebase"; // chemin vers ta config Firebase
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";
import '../styles/LogIn.css'

export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useUser();

    // Fonction pour afficher ou masquer le mot de passe
    function showPassword() {
        const passwordInput = document.getElementById('user-password');
        const showbtn = document.querySelector('.input_item i');

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            showbtn.className = 'bxr bx-eye-slash ye show_log show_password'
        } else {
            passwordInput.type = "password";
            showbtn.className = 'bxr bx-eye show_log show_password'
        }
    }
    /* <i class='bxr  bx-eye-slash'  ></i>  */
    async function handleLogin(event) {
        event.preventDefault();
        setError("");

        try {
            // 1. Connexion avec Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. Récupération du token Firebase
            const token = await user.getIdToken();

            // 3. Récupération des données utilisateur depuis Firestore
            const userRef = doc(db, "users", user.uid); // ou "utilisateurs", selon ta collection
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                throw new Error("Aucun utilisateur trouvé dans Firestore");
            }

            const userData = userSnap.data();

            // 4. Stockage dans localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({
                id: user.uid,
                firstName: userData.name,
                lastName: userData.postname,
                role: userData.role
            }));

            // 5. Mise à jour du contexte utilisateur
            login({
                id: user.uid,
                firstName: userData.name,
                lastName: userData.postname,
                role: userData.role
            });

            toast.success("Connexion réussie !")

            // 6. Redirection vers le dashboard
            navigate("/dashboardhome");

        } catch (err) {
            console.error("Erreur lors de la connexion :", err);
            setError("Email ou mot de passe incorrect");
        }
    }


    return (
        <div className="container">
            <div className="left_content">
                <span>Bienvenue</span>
                <p>Entrez vos identifiants pour vous connecter</p>

                <form onSubmit={handleLogin}>
                    <div className="input_item">
                        <input
                            type="email"
                            name="email"
                            id="user-email"
                            placeholder='Email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input_item">
                        <input
                            type="password"
                            name="password"
                            id="user-password"
                            placeholder='Mot de passe'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <i className='bxr bx-eye eye show_log show_password' onClick={showPassword}></i>
                    </div>

                    {error && <div className="error-div">
                        <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>
                    </div>}

                    <div className="forgot_link">
                        <a href="/forgot">Mot de passe oublié ?</a>
                    </div>

                    <button type='submit'>Se Connecter</button>
                </form>
            </div>

            <div className="right_content">
                <div className="bg"></div>
            </div>
        </div>
    );
}
