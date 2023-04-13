// firestore.js
const admin = require('firebase-admin');
const serviceAccount = require('./morgue-app-firebase-adminsdk-5cunc-548fcecc47.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;