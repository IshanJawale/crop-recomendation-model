import { getDoc } from "../firebase/firestoreServices.js";
import config from "../../config/index.js";
export const getNGO = async (uid) => {
  try {
    if (!uid || typeof uid !== "string") {
      throw new Error("Invalid uid");
    }
    const ngoRef = `${config.firestoreNGOCollection}/{${uid}}`;
    const ngo = await getDoc(ngoRef);

    if (!ngo) {
      throw new Error("NGO not found");
    }
    return ngo;
  } catch (error) {
    console.error("Get NGO :: getNGO :: error ", error);
    throw new Error(error);
  }
};
