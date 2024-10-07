import { admin } from "../../config/firebase.js";
export const addRole = async (uid, role) => {
  try {
    if (!uid || !role) {
      throw new Error("Invalid uid or role");
    }
    const user = await admin.auth().getUser(uid);
    await admin.auth().setCustomUserClaims(uid, { role });
    return user;
  } catch (error) {}
};

export const getRole = async (uid) => {
  try {
    if (!uid) {
      throw new Error("Invalid uid");
    }
    const user = await admin.auth().getUser(uid);
    return user.customClaims?.role;
  } catch (error) {
    console.error("Get Role :: error", error);
    throw new Error(error);
  }
};
