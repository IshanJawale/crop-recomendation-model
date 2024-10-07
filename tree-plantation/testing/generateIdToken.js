import { admin } from "../config/firebase.js";

export const generateIdToken = async (uid) => {
  try {
    const customToken = await admin.auth().createCustomToken(uid);
    //Sign in with custom token
    const apiKey = "AIzaSyBpAREMfAHo5eM_OBD9vw94te4IpV15FuA"; // Replace with your Firebase API key
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    return data.idToken;
  } catch (error) {
    console.error("generateIdToken :: error", error);
    return { error: error.message };
  }
};
