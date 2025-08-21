// controllers/Esp32.js
const axios = require("axios");
const Alert = require("../models/Alert");
const Sensor = require("../models/Sensor");

exports.fetchData = async (req, res) => {
    try {
        const { data } = await axios.get("http://192.168.4.1/data");

        // Vérification des seuils
        const sensors = await Sensor.getAll();
        for (const sensor of sensors) {
            const value = data[sensor.type];
            if (value === undefined) continue;

            if ((sensor.type === 'gaz' && value > sensor.threshold) ||
                (sensor.type === 'soil' && value < sensor.threshold)) {
                await Alert.create({
                    message: `🚨 Seuil dépassé pour ${sensor.name}`,
                    level: "danger",
                    sensorId: sensor.id,
                    createdAt: new Date()
                });
            }
        }

        res.json(data);
    } catch (err) {
        console.error("❌ Erreur ESP32:", err.message);
        if (err.response) {
            console.error("Status:", err.response.status);
            console.error("Data:", err.response.data);
        } else if (err.request) {
            console.error("Aucune réponse reçue, requête envoyée:", err.request);
        } else {
            console.error("Erreur configuration requête:", err.message);
        }
        res.status(500).json({ error: "Erreur communication avec ESP32" });
    }

};

exports.toggleLed = async (req, res) => {
    try {
        await axios.get("http://192.168.4.1/toggle-led"); // ou autre route
        res.json({ success: true });
    } catch (err) {
        console.error("Erreur actionneur ESP32 :", err.message);
        res.status(500).json({ error: "Impossible de contrôler l’actionneur" });
    }
};
