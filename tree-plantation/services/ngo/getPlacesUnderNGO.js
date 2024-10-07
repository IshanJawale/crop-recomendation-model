import config from "../../config/index.js";
import { getDoc } from "../firebase/firestoreServices.js";
export const getPlacesUderNGO = async (ngoId) => {
  try {
    if (!ngoId) {
      throw new Error("Invalid NGO ID");
    }
    const ngoRef = `${config.firestoreNGOCollection}/{${ngoId}}`;
    const ngo = await getDoc(ngoRef);

    if (!ngo) {
      throw new Error("NGO not found");
    }
    if (!ngo.placeIds || !Array.isArray(ngo.placeIds)) {
      throw new Error("NGO does not have any places");
    }
    const placeIds = ngo.placeIds;

    const promises = placeIds.map((placeId) => {
      const placeRef = `${config.firestorePlacesCollection}/{${placeId}}`;
      return getDoc(placeRef);
    });

    const places = await Promise.all(promises);

    return places; // Array of places
  } catch (error) {
    console.error(error);
    throw error;
  }
};
