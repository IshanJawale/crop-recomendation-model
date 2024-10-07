import { placeModel } from "../model/placeModel.js";
import createModel from "../model/createModel.js";
import config from "../config/index.js";
import { addDoc, getDoc, updateDoc } from "./firebase/firestoreServices.js";

export const registerNewPlace = async (data, ngoID) => {
  try {
    const parsedData = createModel(data, placeModel);
    parsedData.ngoIds = [ngoID];
    const placeId = await addDoc(config.firestorePlacesCollection, parsedData);
    if (!placeId) {
      throw new Error("Place Registration Failed");
    }
    if (ngoID !== null) {
      const ngoDocRef = `${config.firestoreNGOCollection}/{${ngoID}}`;
      const ngoData = await getDoc(ngoDocRef);
      if (!ngoData) {
        throw new Error("NGO Not Found");
      }
      if (
        !ngoData.placeIds ||
        !Array.isArray(ngoData.placeIds) ||
        ngoData.placeIds.length === 0
      ) {
        ngoData.placeIds = [];
      }
      ngoData.placeIds = [...ngoData.placeIds, placeId];
      await updateDoc(ngoDocRef, ngoData);
    }
  } catch (error) {
    console.error("NGO Service :: registerNewPlace :: error", error);
    throw error;
  }
};
