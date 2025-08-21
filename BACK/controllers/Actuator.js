// actuators.js (controller)
const Actuator = require("../models/Actuator");

const actuatorController = {
  async getAll(req, res) {
    try {
      const actuators = await Actuator.getAll();
      res.json(actuators);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération des actionneurs" });
    }
  },

  async getById(req, res) {
    try {
      const actuator = await Actuator.getById(req.params.id);
      if (!actuator) return res.status(404).json({ error: "Actionneur non trouvé" });
      res.json(actuator);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la récupération de l'actionneur" });
    }
  },
  async toggleStatus(req, res) {
    try {
      const updated = await Actuator.toggleStatus(req.params.id);
      if (!updated) return res.status(404).json({ error: 'Actionneur non trouvé' });
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors du changement de statut de l'actionneur" });
    }
  },
  async toggleStatus(req, res) {
    try {
      const updated = await Actuator.toggleStatus(req.params.id);
      if (!updated) return res.status(404).json({ error: 'Actionneur non trouvé' });
      res.json(updated);
    } catch (err) {
      console.error("Erreur serveur dans toggleStatus:", err); //  AIDE AU DEBUG
      res.status(500).json({ error: "Erreur lors du changement de statut de l'actionneur" });
    }
  },


  async create(req, res) {
    try {
      const newActuator = await Actuator.create(req.body);
      res.status(201).json(newActuator);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la création de l'actionneur" });
    }
  },

  async update(req, res) {
    try {
      const updatedActuator = await Actuator.update(req.params.id, req.body);
      res.json(updatedActuator);
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'actionneur" });
    }
  },

  async delete(req, res) {
    try {
      await Actuator.delete(req.params.id);
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Erreur lors de la suppression de l'actionneur" });
    }
  }
};

module.exports = actuatorController;