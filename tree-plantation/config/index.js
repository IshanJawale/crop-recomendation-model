import dotenv from "dotenv";
dotenv.config();
const config = {
  port: process.env.PORT,
  firebaseServiceAccountKey: JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ),
  databaseURL: process.env.DATABASE_URL,
  // firestoreUsersCollection: "users",
  firestoreUsersCollection: process.env.FIREBASE_USER_COLLECTION_NAME,
  firestoreNGOCollection: process.env.FIREBASE_NGO_COLLECTION_NAME,
  firestorePlacesCollection: process.env.FIREBASE_PLACES_COLLECTION_NAME,
  firestorePlantationCollection:
    process.env.FIREBASE_PLANTATION_COLLECTION_NAME,
  firestoreTreeCollection: process.env.FIREBASE_TREE_COLLECTION_NAME,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  storageFolder: process.env.FIREBASE_STORAGE_FOLDER,
  geminiAPIKey: process.env.GEMINI_API_KEY,
};

export default config;
