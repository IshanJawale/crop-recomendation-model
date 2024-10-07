import config from "../../config/index.js";
import { getDocs } from "../firebase/firestoreServices.js";
import { findLocationsWithinRadius } from "../../utils/haversineDistance.js";
export const getNearbyPlaces = async (
  lat,
  lon,
  radius = 100,
  { state = null, country = null }
) => {
  try {
    if (!lat || !lon || !radius) {
      throw new Error("Latitude, longitude, and radius are required");
    }
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      throw new Error("Latitude and longitude must be within range");
    }
    if (state && !country) {
      throw new Error("Country is required when filtering by state");
    }
    let query = [];
    if (country) {
      query.push({ field: "country", operator: "==", value: country });
      if (state) {
        query.push({ field: "state", operator: "==", value: state });
      }
    }
    let locations = await getDocs(config.firestorePlacesCollection, {
      query,
      limit: 1000,
    });

    if (locations.length === 0) {
      return [];
    }

    const nearbyLocations = findLocationsWithinRadius(
      { latitude: lat, longitude: lon },
      locations,
      radius
    );
    return nearbyLocations;
  } catch (error) {
    console.error("Error getting nearby places: ", error);
    throw error;
  }
};
