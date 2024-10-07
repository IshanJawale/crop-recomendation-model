import { FieldValue } from "firebase-admin/firestore";
import { db } from "../../config/firebase.js";
import parseData from "./parseData.js";
//!Ref String Validating Fuctions
//Check if string is a Document Reference
const isDocRefString = (str) => {
  const values = str.split("/");
  if (
    values[values.length - 1].includes("{") &&
    values[values.length - 1].includes("}")
  ) {
    return true;
  }
  return false;
};
//Check if string is a Collection Reference
const isCollectionRefString = (str) => {
  const values = str.split("/");
  if (
    !values[values.length - 1].includes("{") &&
    !values[values.length - 1].includes("}")
  ) {
    return true;
  }
  return false;
};

//!Firestore Services
// Get Collection / Document Reference
//* collectionPath: string eg: "users/{userId}/posts/{postId}/comments"
const getRef = (refString) => {
  try {
    if (!refString) {
      throw new Error("Reference (Collection / Document) Path is required");
    }
    let ref = db; //Initial db reference
    if (db === null) {
      throw new Error("Firestore is not initialized");
    }
    // Split collectionPath by "/" and iterate over each collection/document to get reference
    const collectionPathArray = refString.split("/");
    collectionPathArray.forEach((collectionName) => {
      if (collectionName.includes("{") && collectionName.includes("}")) {
        //! check if collectionName is a document
        const value = collectionName.replace("{", "").replace("}", "");
        ref = ref.doc(value);
      } else {
        //!collectionName is a collection
        ref = ref.collection(collectionName);
      }
    });
    return ref;
  } catch (error) {
    console.error("Firestore Services :: getCollectionRef :: error", error);
    throw error;
  }
};

//CREATE: Add Entry to Collection
const addDoc = async (collectionPath, data, docId = null) => {
  if (
    !collectionPath ||
    typeof collectionPath !== "string" ||
    !isCollectionRefString(collectionPath)
  ) {
    throw new Error("Invalid Collection Path");
  }
  try {
    //Get Collection Reference
    let collectionRef = getRef(collectionPath);

    //Add Data to Collection
    //If Document ID is provided, set data to that document
    if (docId !== null) {
      collectionRef = collectionRef.doc(docId);
      await collectionRef.set(data);
      return docId;
    } else {
      const response = await collectionRef.add(data);
      return response.id;
    }
  } catch (error) {
    console.error("Firestore Services :: addData :: error", error);
    throw error;
  }
};

//READ: Get Entry from Collection
const getDoc = async (documentPath) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    //Get Document Reference
    const documentRef = getRef(documentPath);

    //Get Data
    const doc = await documentRef.get();
    if (!doc.exists) {
      return null;
    }
    return {
      id: doc.id,
      createTime: doc.createTime,
      updateTime: doc.updateTime,
      ...doc.data(),
    };
  } catch (error) {
    console.error("Firestore Services :: getData :: error", error);
    throw error;
  }
};

const getDocs = async (
  collectionPath,
  { query = [], orderBy = [], limit = null } = {}
) => {
  //*query = [{field, operator, value}] eg. [{field: "name", operator: "==", value: "John"},...]
  //*orderBy = [{field, direction}] eg. [{field: "name", direction: "asc"},...]
  //*limit = number eg. 5
  try {
    if (
      !collectionPath ||
      typeof collectionPath !== "string" ||
      !isCollectionRefString(collectionPath)
    ) {
      throw new Error("Invalid Collection Path");
    }
    //Get Collection Reference
    let collectionRef = getRef(collectionPath);

    //Apply Query
    if (query.length > 0) {
      query.forEach((q) => {
        const { field, operator, value } = q;
        collectionRef = collectionRef.where(field, operator, value);
      });
    }

    //Apply OrderBy
    if (orderBy.length > 0) {
      orderBy.forEach((order) => {
        let { field, direction } = order;
        //Default OrderBy Direction is Ascending
        if (!direction) {
          direction = "asc";
        } else if (!["asc", "desc"].includes(direction)) {
          //Check if OrderBy Direction is valid
          throw new Error("Invalid OrderBy Direction");
        }
        collectionRef = collectionRef.orderBy(field, direction);
      });
    }
    //Apply Limit
    if (limit) {
      collectionRef = collectionRef.limit(limit);
    }

    //Get Data
    const snapshot = await collectionRef.get();

    if (snapshot.empty) {
      return [];
    }
    const data = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        createTime: doc.createTime,
        updateTime: doc.updateTime,
        ...doc.data(),
      };
    });
    return data;
  } catch (error) {
    console.error("Firestore Services :: getData :: error", error);
    throw error;
  }
};

//UPDATE: Update Entry in Collection (Entire Document will be replaced)
const updateDoc = async (documentPath, data) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    //Get Document Reference
    const documentRef = getRef(documentPath);

    //Update Document
    documentRef.update(data);
  } catch (error) {
    console.error("Firestore Services :: updateData :: error", error);
    throw error;
  }
};

//PATCH: Update Entry in Collection (Only specified fields will be updated)
const patchDoc = async (documentPath, data) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    //Get Document Reference
    const documentRef = getRef(documentPath);

    //Patch Document
    documentRef.set(data, { merge: true });
  } catch (error) {
    console.error("Firestore Services :: patchData :: error", error);
    throw error;
  }
};

//DELETE: Delete Entry from Collection
//1. Delete Document
const deleteDoc = async (documentPath) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }

    //Get Document Reference
    const documentRef = getRef(documentPath);

    //Delete Document
    await documentRef.delete();
  } catch (error) {
    console.error("Firestore Services :: deleteDoc :: error", error);
    throw error;
  }
};

//2. Delete Fields from Document
const deleteFields = async (documentPath, fields) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    if (!fields || !Array.isArray(fields)) {
      throw new Error("Invalid Fields");
    }
    const documentRef = getRef(documentPath);
    const data = {};
    fields.forEach((field) => {
      data[field] = FieldValue.delete();
    });
    documentRef.update(data);
  } catch (error) {
    console.error("Firestore Services :: deleteFields :: error", error);
    throw error;
  }
};

const checkIfDocExists = async (documentPath) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    const documentRef = getRef(documentPath);
    const doc = await documentRef.get();
    return doc.exists;
  } catch (error) {
    console.error("Firestore Services :: checkIfDocExists :: error", error);
    throw error;
  }
};

const incrementFieldValue = async (documentPath, field, value = 1) => {
  try {
    if (
      !documentPath ||
      typeof documentPath !== "string" ||
      !isDocRefString(documentPath)
    ) {
      throw new Error("Invalid Document Path");
    }
    if (!field || typeof field !== "string") {
      throw new Error("Invalid Field");
    }
    if (!value || typeof value !== "number") {
      throw new Error("Invalid Value");
    }
    const documentRef = getRef(documentPath);
    documentRef.set(
      {
        [field]: FieldValue.increment(value),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Firestore Services :: incrementFieldValue :: error", error);
    throw error;
  }
};
export {
  getRef,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  patchDoc,
  deleteDoc,
  deleteFields,
  checkIfDocExists,
  incrementFieldValue,
};
