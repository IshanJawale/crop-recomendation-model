import { admin } from "../config/firebase.js";
import {
  addDoc,
  getDocs,
  updateDoc,
  patchDoc,
  deleteDoc,
  deleteFields,
} from "../services/firebase/firestoreServices.js";
import fs from "fs";
import path from "path";
import { uploadFile } from "../services/firebase/storage.js";

const testAuthController = async (req, res) => {
  const uid = "PIy7oDU101RD244gn6hJUPHhu192";

  try {
    //Check if user exists
    // const user = await admin.auth().getUser(uid);

    //Create custom token of that user
    const customToken = await admin.auth().createCustomToken(uid);

    //Sign in with custom token
    const apiKey = "AIzaSyBpAREMfAHo5eM_OBD9vw94te4IpV15FuA"; // Replace with your Firebase API key
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`;
    console.log(customToken);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    // console.table([data, data.idToken]);
    console.log("Data", data);
    console.log("Data.idToken", data.idToken);

    res.json(data);
  } catch (error) {
    console.error("createCustomToken :: error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDocController = async (req, res) => {
  try {
    const { collectionPath, data } = req.body;
    if (!collectionPath) {
      throw new Error("Collection Path is required");
    }
    if (!data) {
      throw new Error("Data is required");
    }
    const docRef = await addDoc(collectionPath, data);
    res
      .status(200)
      .send({ message: "Document added successfully", id: docRef.id });
  } catch (error) {
    console.error("addDocController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const getDocsController = async (req, res) => {
  try {
    const { collectionPath, query, orderBy, limit } = req.body;
    if (!collectionPath) {
      throw new Error("Collection Path is required");
    }

    const docs = await getDocs(collectionPath, { query, orderBy, limit });
    res.status(200).send({ docs });
  } catch (error) {
    console.error("getDocsController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const updateDocController = async (req, res) => {
  try {
    const { documentPath, data } = req.body;
    if (!documentPath) {
      throw new Error("Document Path is required");
    }
    if (!data) {
      throw new Error("Data is required");
    }
    await updateDoc(documentPath, data);
    res.status(200).send({ message: "Document updated successfully" });
  } catch (error) {
    console.error("updateDocController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const patchDocController = async (req, res) => {
  try {
    const { documentPath, data } = req.body;
    if (!documentPath) {
      throw new Error("Document Path is required");
    }
    if (!data) {
      throw new Error("Data is required");
    }
    await patchDoc(documentPath, data);
    res.status(200).send({ message: "Document patched successfully" });
  } catch (error) {
    console.error("patchDocController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const deleteDocController = async (req, res) => {
  try {
    const { documentPath } = req.body;
    if (!documentPath) {
      throw new Error("Document Path is required");
    }
    await deleteDoc(documentPath);
    res.status(200).send({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("deleteDocController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const deleteFieldsController = async (req, res) => {
  try {
    const { documentPath, fields } = req.body;
    if (!documentPath) {
      throw new Error("Document Path is required");
    }
    if (!fields || !Array.isArray(fields)) {
      throw new Error("Fields is required and should be an array");
    }
    await deleteFields(documentPath, fields);
    res.status(200).send({ message: "Fields deleted successfully" });
  } catch (error) {
    console.error("deleteFieldsController :: error", error);
    res.status(500).send({ error: error.message });
  }
};

const uploadFilesContoller = async (req, res) => {
  try {
    const { files } = req;
    //!CHANGE THE UPLOAD PATH
    const uploadPath = "images";
    if (!files || files.length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    const uploadPromise = files.map(async (file) => {
      const { path: tempPath, mimetype, originalname } = file;

      const cleanedFilename = `${originalname
        .trim()
        .replace(/[^\w\-_.]/g, "")}`;

      const filename = `${path.basename(
        cleanedFilename,
        path.extname(cleanedFilename)
      )}-${new Date().getTime()}${path.extname(cleanedFilename)}`;

      return await uploadFile(filename, tempPath, uploadPath, mimetype);
    });

    const fileNames = await Promise.all(uploadPromise);
    console.log("fileNames", fileNames);
    files.map((file) => {
      fs.unlinkSync(file.path);
    });
    res.status(200).send({ message: "Files uploaded successfully", fileNames });
  } catch (error) {
    console.error("uploadFilesContoller :: error", error);
    res.status(500).send({ error: error.message });
  }
};

export {
  addDocController,
  getDocsController,
  updateDocController,
  patchDocController,
  deleteDocController,
  deleteFieldsController,
  testAuthController,
  uploadFilesContoller,
};
