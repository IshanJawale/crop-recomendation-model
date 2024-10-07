import { getPlacesUderNGO } from "../../services/ngo/getPlacesUnderNGO.js";

export const getPlacesUderNGOController = async (req, res) => {
  const { uid, role } = req.user;
  if (role !== "ngo" || !uid) {
    return res.status(403).send("Unauthorized");
  }
  try {
    const places = await getPlacesUderNGO(uid);
    return res.status(200).json(places);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
