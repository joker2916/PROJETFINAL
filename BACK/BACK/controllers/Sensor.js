// sensor.js (controller)
const Sensor = require("../models/Sensor");

// ✅ Récupérer tous les capteurs
exports.getAll = async (req, res) => {
  try {
    const sensors = await Sensor.getAll();
    res.status(200).json(sensors);
  } catch (error) {
    console.error("Erreur récupération capteurs:", error.message);
    res.status(500).json({ error: "Erreur récupération capteurs" });
  }
};

// ✅ Créer un capteur
exports.create = async (req, res) => {
  try {
    const data = req.body;
    const sensor = await Sensor.create(data);
    res.status(201).json(sensor);
  } catch (error) {
    console.error("Erreur création capteur:", error.message);
    res.status(500).json({ error: "Erreur création capteur" });
  }
};

// ✅ Récupérer un capteur par ID
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const sensor = await Sensor.getById(id);
    if (!sensor) return res.status(404).json({ error: "Capteur non trouvé" });
    res.status(200).json(sensor);
  } catch (error) {
    console.error("Erreur récupération capteur:", error.message);
    res.status(500).json({ error: "Erreur récupération capteur" });
  }
};

// ✅ Mettre à jour un capteur
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedSensor = await Sensor.update(id, data);
    res.status(200).json(updatedSensor);
  } catch (error) {
    console.error("Erreur de mise à jour :", error.message);
    res.status(500).json({ error: "Erreur mise à jour" });
  }
};

// ✅ Supprimer un capteur
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Sensor.deleteById(id);
    res.status(200).json({ message: "Capteur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression capteur:", error.message);
    res.status(500).json({ error: "Erreur suppression capteur" });
  }
};
