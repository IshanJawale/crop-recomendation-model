import config from "../../config/index.js";
import {
  addDoc,
  getDoc,
  getDocs,
  patchDoc,
  checkIfDocExists,
  incrementFieldValue,
} from "../firebase/firestoreServices.js";
import { getFileURL, uploadFile } from "../firebase/storage.js";
import fs from "fs";

export const initializePlantationNGO = async (
  userId,
  ngoId,
  treeCount,
  amount
) => {
  try {
    if (!userId || !ngoId || !treeCount || !amount) {
      throw new Error("Invalid Input");
    }
    const plantation = {
      userId,
      ngoId,
      treeCount,
      amount,
      plantedBy: "ngo",
      status: "pending",
    };
    const plantationRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}`;
    const ngoPlantationRef = `${config.firestoreNGOCollection}/{${ngoId}}/${config.firestorePlantationCollection}`;
    //Add doc to plantation collection of user
    const plantationId = await addDoc(plantationRef, plantation);
    //Add doc to plantation collection of ngo
    await addDoc(
      ngoPlantationRef,
      {
        plantationId,
        userId,
        amount,
        status: "pending",
      },
      plantationId
    );
    return true;
  } catch (error) {
    console.error("Error in initializePlantationNGO: ", error);
    throw error;
  }
};

export const startPlantationNGO = async (userId, ngoId, plantationId) => {
  try {
    if (!userId || !ngoId || !plantationId) {
      throw new Error("Invalid Input");
    }
    const plantationRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const ngoPlantationRef = `${config.firestoreNGOCollection}/{${ngoId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const plantation = await getDoc(plantationRef);
    if (!plantation || plantation.status !== "pending") {
      throw new Error("Invalid plantation");
    }
    //Update plantation status of user
    await patchDoc(plantationRef, { status: "ongoing" });
    //Update plantation status of ngo
    await patchDoc(ngoPlantationRef, { status: "ongoing" });
    return true;
  } catch (error) {
    console.error("Error in startPlantationNGO: ", error);
    throw error;
  }
};

export const plantTree = async (
  userId,
  ngoId,
  plantationId,
  { treeType, placeId, treeName = null, photo = null } = {}
) => {
  try {
    if (!userId || !placeId || !ngoId || !plantationId || !treeType) {
      throw new Error("Invalid Input");
    }
    const ngoRef = `${config.firestoreNGOCollection}/{${ngoId}}`;
    const ngoPlantationRef = `${ngoRef}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const userRef = `${config.firestoreUsersCollection}/{${userId}}`;
    const userPlantationRef = `${userRef}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const treeRef = `${userPlantationRef}/${config.firestoreTreeCollection}`;

    //Check Plantation Status
    const plantation = await getDoc(userPlantationRef);
    if (plantation.status !== "ongoing") {
      return false;
    }
    const tree = {};
    tree.treeType = treeType;
    tree.placeId = placeId;
    if (treeName) tree.treeName = treeName;

    if (photo) {
      //Upload photo
      let fileName = `${userId}_${plantationId}_${treeType}_${Date.now()}`;
      fileName = `${fileName.trim().replace(/[^\w\-_.]/g, "")}`;

      await uploadFile(
        fileName,
        photo.path,
        config.storageFolder,
        photo.mimetype
      );
      // fs.unlinkSync(photo.path);
      tree.photo = fileName;
    }
    //Add doc to tree collection of user
    await addDoc(treeRef, tree);
    //Increment the tree count in the plantation
    await incrementFieldValue(ngoRef, "treesPlanted", 1);
    await incrementFieldValue(ngoPlantationRef, "treesPlanted", 1);
    //Increment the tree count in the user
    await incrementFieldValue(userRef, "treesPlanted", 1);
    await incrementFieldValue(userPlantationRef, "treesPlanted", 1);
    return true;
  } catch (error) {
    console.error("Error in plantTree: ", error);
    throw error;
  }
};

export const completePlantation = async (userId, ngoId, plantationId) => {
  try {
    if (!userId || !ngoId || !plantationId) {
      throw new Error("Invalid Input");
    }
    const plantationRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const ngoPlantationRef = `${config.firestoreNGOCollection}/{${ngoId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    //Update plantation status of user
    await patchDoc(plantationRef, { status: "completed" });
    //Update plantation status of ngo
    await patchDoc(ngoPlantationRef, { status: "completed" });
    return true;
  } catch (error) {
    console.error("Error in completePlantation: ", error);
    throw error;
  }
};

export const getPlantationsNGO = async (ngoId) => {
  try {
    if (!ngoId) {
      throw new Error("Invalid Input");
    }
    const plantationRef = `${config.firestoreNGOCollection}/{${ngoId}}/${config.firestorePlantationCollection}`;
    const plantation = await getDocs(plantationRef);
    if (!plantation) {
      return [];
    }
    return plantation;
  } catch (error) {
    console.error("Error in getPlantationDetailsNGO: ", error);
    throw error;
  }
};

export const getTree = async (ngoId, plantationId, treeId) => {
  try {
    if (!userId || !plantationId || !treeId) {
      throw new Error("Invalid Input");
    }
    const plantationRef = `${config.firestoreNGOCollection}/{${ngoId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const plantation = await getDoc(plantationRef);
    if (!plantation) {
      return {};
    }
    const userId = plantation.userId;
    const treeRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}/${config.firestoreTreeCollection}/{${treeId}}`;
    const tree = await getDoc(treeRef);
    if (!tree) {
      return {};
    }
    return tree;
  } catch (error) {
    console.error("Error in getTree: ", error);
    throw error;
  }
};
