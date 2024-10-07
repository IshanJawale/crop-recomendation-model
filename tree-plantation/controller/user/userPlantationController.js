import {
  initializePlantation,
  completePlantation,
  getPlantations,
  plantTree,
  getPhotoURL,
  getTrees,
} from "../../services/users/userPlantation.js";
export const initialiazePlantationController = async (req, res) => {
  try {
    const { placeId } = req.body;
    const userId = req?.user?.uid;
    if (!placeId) throw new Error("Place ID is required");
    if (!userId) throw new Error("User ID is required");
    const plantationId = await initializePlantation(userId, placeId);
    res.status(200).json({
      status: "success",
      message: "Plantation initialized successfully",
      plantationId,
    });
  } catch (error) {
    console.error("initialiazePlantationController", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const plantTreeController = async (req, res) => {
  try {
    const { plantationId, treeType, treeName } = req.body;
    const photo = req?.file;
    const userId = req?.user?.uid;
    if (!plantationId || !treeType)
      throw new Error("Plantation ID and Tree Type are required");
    // if (!photo) throw new Error("Photo is required");
    if (!userId) throw new Error("User ID is required");

    const tree = {
      treeType,
      treeName,
      photo,
    };
    await plantTree(userId, plantationId, tree);
    res.status(200).json({
      status: "success",
      message: "Tree planted successfully",
    });
  } catch (error) {
    console.error("plantTreeController", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const completePlantationController = async (req, res) => {
  try {
    const { plantationId } = req.body;
    const userId = req?.user?.uid;
    if (!plantationId) throw new Error("Plantation ID is required");
    if (!userId) throw new Error("User ID is required");
    await completePlantation(userId, plantationId);
    res.status(200).json({
      status: "success",
      message: "Plantation completed successfully",
    });
  } catch (error) {
    console.error("completePlantationController", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getPlantationsController = async (req, res) => {
  try {
    const userId = req?.user?.uid;
    if (!userId) throw new Error("User ID is required");
    const plantations = await getPlantations(userId);
    res.status(200).json({
      status: "success",
      plantations,
    });
  } catch (error) {
    console.error("getPlantationsController", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

export const getTreesController = async (req, res) => {
  try {
    const { plantationId } = req.body;

    const userId = req?.user?.uid;
    if (!plantationId) throw new Error("Plantation ID is required");
    if (!userId) throw new Error("User ID is required");
    const trees = await getTrees(userId, plantationId);
    if (!trees || trees.length === 0) {
      return res.status(200).json({
        status: "success",
        trees: [],
      });
    }
    return res.status(200).json({
      status: "success",
      trees,
    });
  } catch (error) {
    console.error("getTreesController", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
export const getPhotoURLController = async (req, res) => {
  try {
    const { fileName } = req.query;
    if (!fileName) throw new Error("File Name is required");
    const url = await getPhotoURL(fileName);
    res.status(200).json({
      status: "success",
      url,
    });
  } catch (error) {
    console.error("getPhotoURL", error);
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
