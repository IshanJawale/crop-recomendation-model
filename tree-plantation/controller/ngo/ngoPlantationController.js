import {
  completePlantation,
  getPlantationsNGO,
  getTree,
  initializePlantationNGO,
  plantTree,
  startPlantationNGO,
} from "../../services/ngo/ngoPlantation.js";

export const initializePlantationNGOController = async (req, res) => {
  try {
    const { ngoId, treeCount, amount } = req.body;
    const userId = req.user.uid;
    console.log(userId, ngoId, treeCount, amount);

    if (!userId || !ngoId || !treeCount || !amount) {
      throw new Error("Invalid Input");
    }
    await initializePlantationNGO(userId, ngoId, treeCount, amount);
    res.send({ message: "Plantation initialized" });
  } catch (error) {
    console.error("Error in initializePlantationNGOController: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const startPlantationNGOController = async (req, res) => {
  try {
    const { userId, plantationId } = req.body;
    const ngoId = req.user.uid;
    if (!userId || !ngoId || !plantationId) {
      throw new Error("Invalid Input");
    }
    await startPlantationNGO(userId, ngoId, plantationId);
    res.send({ message: "Plantation started" });
  } catch (error) {
    console.error("Error in startPlantationNGOController: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const plantTreeController = async (req, res) => {
  try {
    const { userId, plantationId, placeId, treeType, treeName } = req.body;
    const ngoId = req.user.uid;
    const photo = req?.file;

    if (!userId || !ngoId || !plantationId || !placeId || !treeType) {
      throw new Error("Invalid Input");
    }
    // if (Object.keys(photo).length === 0) {
    //   throw new Error("Photo not uploaded");
    // }
    const res = await plantTree(userId, ngoId, plantationId, {
      treeType,
      treeName,
      placeId,
      photo,
    });
    if (res) {
      res.send({ message: "Tree planted" });
    } else {
      res.send({ message: "Tree not planted" });
    }
  } catch (error) {
    console.error("Error in plantTreeController: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const completePlantationController = async (req, res) => {
  try {
    const { userId, plantationId } = req.body;
    const ngoId = req.user.uid;
    if (!userId || !ngoId || !plantationId) {
      throw new Error("Invalid Input");
    }
    await completePlantation(userId, ngoId, plantationId);
    res.send({ message: "Plantation completed" });
  } catch (error) {
    console.error("Error in completePlantationController: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getPlantationsNGOController = async (req, res) => {
  try {
    const ngoId = req.user.uid;
    const plantations = await getPlantationsNGO(ngoId);
    res.send(plantations);
  } catch (error) {
    console.error("Error in getPlantationsNGOController: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
export const getTreeController = async (req, res) => {
  try {
    const { userId, plantationId, treeId } = req.body;
    const ngoId = req.user.uid;
    if (!userId || !ngoId || !plantationId || !treeId) {
      throw new Error("Invalid Input");
    }
    const tree = await getTree(userId, ngoId, plantationId, treeId);
    return res.send(tree);
  } catch (error) {
    console.error("Error in getTreeController: ", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
