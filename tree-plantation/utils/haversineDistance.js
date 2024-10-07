function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getBoundingBox(lat, lon, radius) {
  const R = 6371; // Earth radius in kilometers
  const maxLat = Number.parseFloat(lat) + toDegrees(radius / R);
  const minLat = Number.parseFloat(lat) - toDegrees(radius / R);
  const maxLon =
    Number.parseFloat(lon) + toDegrees(radius / R / Math.cos(toRadians(lat)));
  const minLon =
    Number.parseFloat(lon) - toDegrees(radius / R / Math.cos(toRadians(lat)));

  return { minLat, maxLat, minLon, maxLon };
}

function toDegrees(radians) {
  return radians * (180 / Math.PI);
}

function findLocationsWithinRadius(currentLocation, locations, radius) {
  const { latitude: lat, longitude: lon } = currentLocation;
  if (locations.length === 0 || !lat || !lon || !radius) {
    return [];
  }
  // Calculate bounding box
  const { minLat, maxLat, minLon, maxLon } = getBoundingBox(lat, lon, radius);

  // Filter locations that fall within the bounding box
  const nearbyLocations = locations.filter((location) => {
    const { latitude: lat2, longitude: lon2 } = location?.coordinates;
    if (!lat2 || !lon2) {
      return false;
    }
    return lat2 >= minLat && lat2 <= maxLat && lon2 >= minLon && lon2 <= maxLon;
  });

  // Further filter by applying the Haversine formula
  return nearbyLocations.filter((location) => {
    const { latitude: lat2, longitude: lon2 } = location?.coordinates;
    const distance = haversine(lat, lon, lat2, lon2);
    return distance <= radius;
  });
}

export { findLocationsWithinRadius };
