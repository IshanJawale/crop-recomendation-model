import { addPlaceToNGO } from "../../services/ngo/addPlaceToNGO.js";

export const addPlaceToNGOController = async (req, res) => {
  try {
    const { placeId } = req.body;
    const ngoId = req.user && req.user.uid ? req.user.uid : null;

    if (!placeId || !ngoId) {
      console.error("Invalid request");
      return res.status(400).json({ error: "Invalid request" });
    }
    await addPlaceToNGO(placeId, ngoId);
    res.status(200).json({ message: "Place added to NGO" });
  } catch (error) {
    console.error("Add Place to NGO Controller :: error", error);
    res.status(500).json({ error: error.message });
  }
};
