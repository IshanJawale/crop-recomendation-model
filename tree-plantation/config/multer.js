import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get the current directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../tmp"));
  },
  filename: function (req, file, cb) {
    const cleanedFilename = `${file.originalname
      .trim()
      .replace(/[^\w\-_.]/g, "")}`;
    const filename = `${path.basename(
      cleanedFilename,
      path.extname(cleanedFilename)
    )}-${Date.now()}${path.extname(cleanedFilename)}`;
    cb(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype.startsWith("image/jpeg") ||
    file.mimetype.startsWith("image/png") ||
    file.mimetype.startsWith("image/webp") ||
    file.mimetype === "text/plain"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

export { upload };
