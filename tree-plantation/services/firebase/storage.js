import { bucket } from "../../config/firebase.js";

export const uploadFile = async (filename, filePath, uploadPath, mimetype) => {
  try {
    const options = {
      destination: `${uploadPath}/${filename}`,
      metadata: {
        contentType: mimetype,
      },
      gzip: true,
    };
    await bucket.upload(filePath, options);
    return filename;
  } catch (error) {
    console.error("uploadFile :: error", error);
    throw new Error(error);
  }
};

export const getFileURL = async (filePath) => {
  try {
    const file = bucket.file(filePath);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000, // 1 hour
    });
    return url;
  } catch (error) {
    console.error("getFileURL :: error", error);
    throw new Error(error);
  }
};
