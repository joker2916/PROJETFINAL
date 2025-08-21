// authController.js (controller)
const { admin } = require("../config/firebase");

// Créer un nouvel utilisateur
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    res.status(201).json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Connexion utilisateur + génération d’un token
const login = async (req, res) => {
  // Ici, on suppose que tu vas gérer ça côté front avec Firebase JS SDK
  res.status(501).json({
    message: "Connexion à gérer côté front avec Firebase Client SDK.",
  });
};

module.exports = { signup, login };
