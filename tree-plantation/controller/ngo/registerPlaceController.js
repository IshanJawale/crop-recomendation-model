import { registerNewPlace } from "../../services/registerPlace.js";

export const registerNewPlaceContoller = async (req, res) => {
  const { placeData } = req.body;
  const ngoId = req.user && req.user.role === "ngo" ? req.user.uid : null;
  console.log(ngoId);

  try {
    if (!placeData) {
      throw new Error("Invalid Place Data");
    }
    await registerNewPlace(placeData, ngoId);
    res.status(201).send({ message: "Place Registered Successfully" });
  } catch (error) {
    console.error("registerNewPlaceContoller :: error", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
