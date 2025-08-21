// getTokens.js
const fetch = require('node-fetch'); // require au lieu de import

const email = "test@agri-projet.com";
const password = "160804";
const apiKey = "AIzaSyBY10LaWpDOs0Oqo5y5AWemIMVayUdX1MU";

// Fonction d'inscription
async function signUp() {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await res.json();
  if (data.error) {
    if (data.error.message === "EMAIL_EXISTS") {
      console.log("L'utilisateur existe déjà, on passe à la connexion...");
    } else {
      console.error("Erreur lors de l'inscription :", data.error.message);
      return null;
    }
  } else {
    console.log("✅ Utilisateur créé !");
  }

  return true;
}

// Fonction de connexion
async function signIn() {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  const data = await res.json();
  if (data.error) {
    console.error("❌ Erreur de connexion :", data.error.message);
    return null;
  }

  return data.idToken;
}

// Routine principale
(async () => {
  await signUp();
  const token = await signIn();
  if (token) {
    console.log("🔐 ID Token :", token);
  }
  setTimeout(() => process.exit(0), 100);
})();
