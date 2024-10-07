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
export const getPlantations = async (userId) => {
  try {
    if (!userId) throw new Error("User ID is required");
    const collectionRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}`;
    const plantations = await getDocs(collectionRef);
    if (!plantations) return [];
    return plantations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTrees = async (userId, plantationId) => {
  try {
    if (!userId) throw new Error("User ID is required");
    if (!plantationId) throw new Error("Plantation ID is required");
    const collectionRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}/${config.firestoreTreeCollection}`;
    const trees = await getDocs(collectionRef);
    if (!trees || trees.length === 0) return [];
    return trees;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const initializePlantation = async (userId, placeId) => {
  //TODO: Check for ongoing plantation
  try {
    if (!placeId) throw new Error("Place ID is required");
    if (!userId) throw new Error("User ID is required");

    //Check if place exists
    const placeRef = `${config.firestorePlacesCollection}/{${placeId}}`;
    const placeExists = await checkIfDocExists(placeRef);
    if (!placeExists) throw new Error("Place does not exist");

    const status = "ongoing";
    const plantedBy = "user";
    const plantation = {
      placeId,
      plantedBy,
      status,
    };
    const collectionRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}`;
    const plantationId = await addDoc(collectionRef, plantation);
    return plantationId;
  } catch (error) {
    console.error("Failed to initialize plantation", error);
    throw new Error("Failed to initialize plantation");
  }
};

export const plantTree = async (
  userId,
  plantationId,
  { treeType, treeName = null, photo = null } = {} //TODO: ADD IMAGE
) => {
  try {
    if (!userId) throw new Error("User ID is required");
    if (!plantationId) throw new Error("Plantation ID is required");
    if (!treeType) throw new Error("Tree Type is required");
    // if (!photo) throw new Error("Photo is required");
    const userDocRef = `${config.firestoreUsersCollection}/{${userId}}`;
    const plantationDocRef = `${userDocRef}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const treeCollectionRef = `${plantationDocRef}/${config.firestoreTreeCollection}`;

    //Check Plantation Status
    const plantation = await getDoc(plantationDocRef);
    if (plantation.status && plantation.status !== "ongoing")
      throw new Error("Plantation is not ongoing");

    const tree = {
      treeType,
      treeName,
      plantationDate: Date.now(),
    };
    if (photo) {
      //Uplaod Photo
      let fileName = `${userId}_${plantationId}_${treeType}_${Date.now()}`;
      fileName = `${fileName.trim().replace(/[^\w\-_.]/g, "")}`;

      await uploadFile(
        fileName,
        photo.path,
        config.storageFolder,
        photo.mimetype
      );

      tree.photo = fileName;
    }

    //Add the tree to the plantation
    const treeId = await addDoc(`${treeCollectionRef}`, tree);

    //Increment the tree count in the plantation
    await incrementFieldValue(plantationDocRef, "treesPlanted", 1);

    //Increment the tree count in the user
    await incrementFieldValue(userDocRef, "treesPlanted", 1);

    // fs.unlinkSync(photo.path);
    return treeId;
  } catch (error) {
    console.error("Failed to plant tree", error);
    throw new Error("Failed to plant tree");
  }
};
export const completePlantation = async (userId, plantationId) => {
  try {
    if (!userId) throw new Error("User ID is required");
    if (!plantationId) throw new Error("Plantation ID is required");
    const plantationRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    await patchDoc(plantationRef, { status: "completed" });
    return true;
  } catch (error) {
    console.error("Failed to complete plantation", error);
    throw new Error("Failed to complete plantation");
  }
};

export const getPhotoURL = async (fileName) => {
  const filePath = `${config.storageFolder}/${fileName}`;
  return await getFileURL(filePath);
};
