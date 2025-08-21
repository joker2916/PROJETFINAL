const User = require("../models/User");
const { admin } = require("../config/firebase");

const userController = {
  async create(req, res) {
    try {
      const creatorRole = req.user?.role || "user";
      const newUser = await User.create(req.body, creatorRole); // gère aussi l'envoi du lien de mot de passe dans User.create()
      res.status(201).json(newUser);
    } catch (err) {
      console.error("Erreur lors de la création :", err);
      res.status(500).json({ error: "Erreur lors de la création de l'utilisateur", err });
    }
  },

  async getById(req, res) {
    try {
      const user = await User.getByUID(req.params.id);
      if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
  },

  async promoteToAdmin(req, res) {
    try {
      const { uid } = req.params;
      await admin.auth().setCustomUserClaims(uid, { role: "admin" });
      await db.collection("users").doc(uid).update({ role: "admin" });
      res.status(200).json({ message: "Utilisateur promu administrateur avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la promotion de l'utilisateur" });
    }
  },

  async getAll(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
  },

  async update(req, res) {
    try {
      const updateUser = await User.update(req.params.id, req.body);
      res.json(updateUser);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
  },

  async delete(req, res) {
    try {
      await User.delete(req.params.id);
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur", err });
    }
  },

  // 🔐 Nouveau contrôleur : demande de lien de réinitialisation
  async sendResetLink(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email requis" });

    try {
      const actionCodeSettings = {
        url: "http://localhost:3000/new-password", // à adapter selon ton front
        handleCodeInApp: true,
      };

      const link = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

      // En vrai projet, tu devrais envoyer ce lien par email via nodemailer ou autre
      console.log(`Lien de réinitialisation envoyé : ${link}`);

      res.status(200).json({ message: "Lien de réinitialisation envoyé", link });
    } catch (err) {
      console.error("Erreur reset password :", err);
      res.status(500).json({ error: "Impossible d'envoyer le lien de réinitialisation", err });
    }
  }
};


module.exports = userController;
