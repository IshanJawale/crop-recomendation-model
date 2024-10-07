import { getPlaces } from "../../services/common/getPlaces.js";

export const getPlacesController = async (req, res) => {
  const { city, state, country } = req.query;
  try {
    if ((city && !state && !country) || (state && !country)) {
      throw new Error("Invalid query");
    }
    const places = await getPlaces({ city, state, country });
    res.status(200).json(places);
  } catch (error) {
    console.error("Get Places :: getPlacesController :: error ", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
