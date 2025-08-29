const Alert = require("../models/Alert");
const Sensor = require("../models/Sensor");

exports.receiveData = async (req, res) => {
    try {
        // Afficher le body brut pour voir exactement ce que Render reçoit
        console.log("📩 Body brut reçu :", req.rawBody ? req.rawBody.toString() : req.body);

        // Si req.body n'est pas encore parsé, essayer de le parser
        let data = req.body;
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (parseErr) {
                console.error("❌ Erreur JSON.parse :", parseErr.message);
                return res.status(400).json({ error: "JSON invalide reçu" });
            }
        }

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
        console.error("❌ Erreur réception ESP32:", err);
        res.status(500).json({ error: "Erreur lors de la réception des données" });
    }
};
