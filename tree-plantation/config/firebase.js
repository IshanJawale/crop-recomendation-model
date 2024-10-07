import admin from "firebase-admin";
import config from "./index.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebaseServiceAccountKey),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
});

const db = admin.firestore();

const bucket = admin.storage().bucket();

export { admin, db, bucket };
