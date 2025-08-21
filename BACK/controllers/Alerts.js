// alert.js (controller)
const Alert = require("../models/Alert");

const alertController = {
  async getAll(req, res) {
    try {
      const alerts = await Alert.getAll();
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des alertes" });
    }
  },

  async getById(req, res) {
    try {
      const alert = await Alert.getById(req.params.id);
      if (!alert) return res.status(404).json({ error: "Alerte non trouvée" });
      res.json(alert);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'alerte" });
    }
  },

  async create(req, res) {
    try {
      const newAlert = await Alert.create(req.body);
      res.status(201).json(newAlert);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création de l'alerte" });
    }
  },

  async update(req, res) {
    try {
      const updatedAlert = await Alert.update(req.params.id, req.body);
      res.json(updatedAlert);
    } catch (err) {
      console.error("Erreur mise à jour alerte:", err.message);
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'alerte" });
    }
  },

  async delete(req, res) {
    try {
      await Alert.delete(req.params.id);
      res.status(200).json({ message: "Alerte supprimée avec succès" });
    } catch (err) {
      console.error("Erreur suppression alerte:", err.message);
      res.status(500).json({ error: "Erreur lors de la suppression de l'alerte" });
    }
  }
};

module.exports = alertController;
