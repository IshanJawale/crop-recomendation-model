import { GeoPoint } from "firebase-admin/firestore";

//!All the valid data types in Firestore (FOR REFERENCE - NOT USED IN THE CODE)
const validDataTypes = [
  "string",
  "number",
  "boolean",
  "map",
  "array",
  "null",
  "timestamp",
  "geopoint",
  "reference",
];

//!Function to parse data
const parseData = (data) => {
  //*Example Data:
  // data = {
  //   name: { value: "John", type: "string" }
  //   age: { value: "25", type: "number" }
  //   isStudent: { value: "true", type: "boolean" }
  //   address: { value: '{"city":"New York","state":"NY"}', type: "map" }
  //   subjects: { value: '["Maths","Science"]', type: "array" }
  //  isEmployed: { value: "null", type: "null" }
  //   dob: { value: "2021-05-07T00:00:00.000Z", type: "timestamp" }
  //   location: { value: '{"latitude":40.7128,"longitude":-74.0060}', type: "geopoint" }
  // }

  if (data == null) {
    return null;
  }
  if (typeof data === "object") {
    const parsedData = {};
    Object.keys(data).forEach((key) => {
      parsedData[key] = parse(data[key]);
    });
    return parsedData;
  }
  return null;
};

const parse = (element) => {
  if (element === null || element === undefined) {
    return null;
  }
  // String
  if (typeof element === "string") {
    return element;
  } else if (typeof element === "object" && !element.value) {
    //Object
    return element;
  } else if (Array.isArray(element)) {
    //Array
    return element;
  } else if (typeof element === "object") {
    const { value, type } = element;

    // Null check
    if (value == null) {
      return null;
    }
    if (type == null) {
      return value;
    }
    // String
    if (type === "string") {
      return value;
    }

    // Number
    if (type === "number") {
      const parsedElement = Number(value);
      if (isNaN(parsedElement)) {
        return null;
      }
      return parsedElement;
    }

    // Boolean
    if (type === "boolean") {
      if (value === "true") {
        return true;
      } else if (value === "false") {
        return false;
      }
      return null;
    }

    // Map
    if (type === "map") {
      if (typeof value === "object") {
        return value;
      }
      return null;
    }

    // Array
    if (type === "array") {
      if (Array.isArray(value)) {
        return value;
      }
      return null;
    }

    // Null
    if (type === "null") {
      return null;
    }

    // Timestamp
    if (type === "timestamp") {
      const parsedElement = new Date(value);
      if (isNaN(parsedElement.getTime())) {
        return null;
      }
      return parsedElement;
    }

    // Geopoint
    if (type === "geopoint") {
      if (
        value &&
        value.latitude &&
        value.longitude &&
        !isNaN(value.latitude) &&
        !isNaN(value.longitude)
      ) {
        const { latitude, longitude } = value;
        return new GeoPoint(latitude, longitude);
      }
      return null;
    }

    // Reference
    if (type === "reference") {
      return value;
    }
  }
};

export default parseData;
