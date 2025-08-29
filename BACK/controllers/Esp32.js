// controllers/Esp32.js
const Alert = require("../models/Alert");
const Sensor = require("../models/Sensor");

exports.receiveData = async (req, res) => {
    try {
        const data = req.body; // l’ESP32 enverra ses mesures en JSON

        // Vérification des seuils (ex: gaz, humidité sol)
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

        res.json({ success: true, data });
    } catch (err) {
        console.error("❌ Erreur réception ESP32:", err.message);
        res.status(500).json({ error: "Erreur lors de la réception des données" });
    }
};