const { db, admin } = require("../config/firebase");
const { sendPasswordResetEmail } = require("../services/emailService");

class User {
    constructor(uid, name, postname, email, role = "user", createdAt = new Date()) {
        this.uid = uid;
        this.name = name;
        this.postname = postname;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }

    static async getByUID(uid) {
        const snapshot = await db.collection("users").where("uid", "==", uid).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }

    static async create(data, creatorRole = "user") {
        const { email, name, postname, role } = data;

        const userRecord = await admin.auth().createUser({
            email,
            emailVerified: false,
            disabled: false
        });

        const assignedRole = (creatorRole === "admin" && role === "admin") ? "admin" : "user";

        await db.collection("users").doc(userRecord.uid).set({
            uid: userRecord.uid,
            name,
            postname,
            email,
            role: assignedRole,
            createdAt: new Date()
        });

        await admin.auth().setCustomUserClaims(userRecord.uid, { role: assignedRole });

        const actionCodeSettings = {
            url: "http://localhost:3000/new-password",
            handleCodeInApp: true,
        };

        const resetLink = await admin.auth().generatePasswordResetLink(email, actionCodeSettings);

        // Envoi du mail avec Nodemailer
        await sendPasswordResetEmail(email, resetLink);

        return { uid: userRecord.uid, email: userRecord.email, role: assignedRole };
    }

    static async getAll() {
        const snapshot = await db.collection("users").get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async update(uid, data) {
        const userRef = db.collection("users").doc(uid);
        const doc = await userRef.get();

        if (!doc.exists) throw new Error("Utilisateur non trouvé");

        await userRef.update(data);
        return { id: uid, ...data };
    }

    static async delete(uid) {
        const userRef = db.collection("users").doc(uid);
        const doc = await userRef.get();

        if (!doc.exists) throw new Error("Utilisateur non trouvé");

        await userRef.delete();
        await admin.auth().deleteUser(uid);
    }
}

module.exports = User;
