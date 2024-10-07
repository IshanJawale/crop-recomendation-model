import { getDoc } from "../firebase/firestoreServices.js";
import config from "../../config/index.js";
export const getUser = async (uid) => {
  try {
    if (!uid || typeof uid !== "string") {
      throw new Error("Invalid uid");
    }
    const userRef = `${config.firestoreUsersCollection}/{${uid}}`;
    const user = await getDoc(userRef);
    console.log("Get User :: getUser :: user", user);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Get User :: getUser :: error ", error);
    throw new Error(error);
  }
};
