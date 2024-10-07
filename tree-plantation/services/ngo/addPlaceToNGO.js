import config from "../../config/index.js";
import { getDoc, updateDoc } from "../firebase/firestoreServices.js";

export const addPlaceToNGO = async (placeID, ngoID) => {
  try {
    if (!placeID || !ngoID) {
      console.error("Invalid request");
      throw new Error("Invalid request");
    }
    const placeDocRef = `${config.firestorePlacesCollection}/{${placeID}}`;
    const place = await getDoc(placeDocRef);
    if (place === null || Object.keys(place).length === 0) {
      console.error("Place not found");
      throw new Error("Place not found. Create place first");
    }
    if (place.ngoIds && place.ngoIds.includes(ngoID)) {
      console.error("Place already added to NGO");
      throw new Error("Place already added to NGO");
    } else if (!place.ngoIds || !Array.isArray(place.ngoIds)) {
      place.ngoIds = [];
    }

    const ngoDocRef = `${config.firestoreNGOCollection}/{${ngoID}}`;
    const ngo = await getDoc(ngoDocRef);
    if (!ngo.placeIds || !Array.isArray(ngo.placeIds)) {
      ngo.placeIds = [];
    }
    if (ngo.placeIds.includes(placeID)) {
      console.error("Place already added to NGO");
      throw new Error("Place already added to NGO");
    }

    //Adding NGOId to Place
    await updateDoc(placeDocRef, {
      ngoIds: [...place.ngoIds, ngoID],
    });

    //Adding PlaceId to NGO
    await updateDoc(ngoDocRef, {
      placeIds: [...ngo.placeIds, placeID],
    });
  } catch (error) {
    console.error("Add Place to NGO :: error", error);
    throw error;
  }
};
