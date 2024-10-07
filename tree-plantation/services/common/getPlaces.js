import config from "../../config/index.js";
import { getDocs } from "../firebase/firestoreServices.js";
export const getPlaces = async (q) => {
  try {
    const { city, state, country } = q;
    if ((city && !state && !country) || (state && !country)) {
      throw new Error("Invalid query");
    }
    const query = [];
    if (country) {
      query.push({ field: "country", operator: "==", value: country });

      if (state) {
        query.push({ field: "state", operator: "==", value: state });

        if (city) {
          query.push({ field: "city", operator: "==", value: city });
        }
      }
    }
    const limit = 100; //Change this to limit the number of places returned

    const places = await getDocs(config.firestorePlacesCollection, {
      query,
      limit,
    });
    return places;
  } catch (error) {
    console.error("Get Places :: getPlaces :: error ", error);
    throw new Error(error);
  }
};
