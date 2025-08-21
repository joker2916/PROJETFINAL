// Alert (models)
const { db } = require("../config/firebase");

class Alert {
  constructor(message, level = "warning", sensorId = null, createdAt = new Date()) {
    this.message = message;
    this.level = level;
    this.sensorId = sensorId;
    this.createdAt = createdAt;
  }

  // ✅ Récupérer toutes les alertes
  static async getAll() {
    const snapshot = await db.collection("alerts").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // ✅ Créer une alerte
  static async create(data) {
    const docRef = await db.collection("alerts").add(data);
    return { id: docRef.id, ...data };
  }

  // ✅ Mettre à jour une alerte (NOUVEAU)
  static async update(id, data) {
    const docRef = db.collection("alerts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Alerte introuvable");
    }

    await docRef.update(data);
    return { id: doc.id, ...data };
  }

  // ✅ Supprimer une alerte (NOUVEAU)
  static async delete(id) {
    const docRef = db.collection("alerts").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error("Alerte introuvable");
    }

    await docRef.delete();
  }
}

module.exports = Alert;
