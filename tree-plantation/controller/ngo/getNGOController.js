import { getNGO } from "../../services/ngo/getNGO.js";

export const getNGOController = async (req, res) => {
  try {
    const uid = req?.user?.uid;
    if (!uid || req.user.role !== "ngo") {
      return res.status(400).send("Bad Request");
    }
    const ngo = await getNGO(uid);
    if (ngo == null) {
      return res.status(404).send("NGO not found");
    }
    res.status(200).json(ngo);
  } catch (error) {
    console.log("Error in getUserController", error);
    res.status(500).send("Internal Server Error");
  }
};
