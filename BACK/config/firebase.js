// firebase.js
const admin = require("firebase-admin");
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG); // ta clé Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // ou admin.database() si Realtime DB
const auth = admin.auth();

module.exports = { admin, db };
db.collection("test").get()
  .then(() => console.log("Firestore fonctionne !"))
  .catch((err) => console.error("erreur Firestore"));

module.exports = { db, auth, admin };