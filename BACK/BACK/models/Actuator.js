// Actuators (models)
const { db } = require("../config/firebase"); // db = admin.firestore()

class Actuator {
  constructor(name, status = "off", createdAt = new Date()) {
    this.name = name;
    this.status = status;
    this.createdAt = createdAt;
  }

  static async getAll() {
    const snapshot = await db.collection("actuators").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  static async create(data) {
    const payload = {
      name: data.name,
      status: data.status || "off",
      createdAt: data.createdAt || new Date()
    };
    const docRef = await db.collection("actuators").add(payload);
    return { id: docRef.id, ...payload };
  }


  static async updateStatus(id, status) {
    await db.collection("actuators").doc(id).update({ status });
  }

  static async toggleStatus(id) {
    try {
      const actuatorRef = db.collection("actuators").doc(id);
      const actuatorSnap = await actuatorRef.get();

      if (!actuatorSnap.exists) return null;

      const currentStatus = actuatorSnap.data().status;
      const newStatus = !currentStatus;

      await actuatorRef.update({ status: newStatus });

      return { id, ...actuatorSnap.data(), status: newStatus };
    } catch (err) {
      console.error("Erreur dans Actuator.toggleStatus:", err);
      throw err;
    }
  }
}

module.exports = Actuator;
