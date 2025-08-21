// Sensor (models)
const { db } = require("../config/firebase");

class Sensor {
  constructor(type, value, unit, createdAt = new Date()) {
    this.type = type;
    this.value = value;
    this.unit = unit;
    this.createdAt = createdAt;
  }

  // ✅ Récupérer tous les capteurs
  static async getAll() {
    const snapshot = await db.collection("sensors").orderBy("createdAt", "desc").get();
    const latestByType = {};
    const typeToName = {
      thermique: "Température",
      humidite: "Humidité du sol",
      co2: "Niveau de CO₂",
      luminosite: "Luminosité",
      eau: "Niveau d'eau"
    };

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const type = data.type;
      if (!latestByType[type]) {
        latestByType[type] = {
          id: doc.id,
          name: typeToName[type] || type,
          ...data
        };
      }
    });

    return Object.values(latestByType);
  }

  // ✅ Créer un capteur
  static async create(data) {
    const sensorData = {
      ...data,
      createdAt: new Date(), // ← Ajoute automatiquement le champ
    };

    const docRef = await db.collection("sensors").add(sensorData);
    return { id: docRef.id };
  }


  // ✅ Récupérer un capteur par ID
  static async getById(id) {
    const doc = await db.collection("sensors").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }

  // ✅ Mettre à jour un capteur
  static async update(id, data) {
    const docRef = db.collection("sensors").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Document introuvable");
    }

    await docRef.update(data);
    return { id: doc.id, ...data };
  }

  // ✅ Supprimer un capteur
  static async deleteById(id) {
    await db.collection("sensors").doc(id).delete();
  }
}

module.exports = Sensor;
