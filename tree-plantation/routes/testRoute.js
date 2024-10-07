import express from "express";
import {
  addDocController,
  getDocsController,
  updateDocController,
  patchDocController,
  deleteDocController,
  deleteFieldsController,
  testAuthController,
  uploadFilesContoller,
} from "../controller/testController.js";
import { upload } from "../config/multer.js";
// import { getChatbotResponse } from "../controller/geminiTestController.js";
import { getChatbotResponse } from "../controller/common/chatbotController.js";

const testRouter = express.Router();

testRouter.get("/testAuth", testAuthController);

testRouter.post("/addDoc", addDocController);
testRouter.get("/getDocs", getDocsController);
testRouter.put("/updateDoc", updateDocController);
testRouter.patch("/patchDoc", patchDocController);
testRouter.delete("/deleteDoc", deleteDocController);
testRouter.delete("/deleteFields", deleteFieldsController);

testRouter.post("/uploadFiles", upload.array("files"), uploadFilesContoller);

testRouter.post("/gemini", getChatbotResponse);

export { testRouter };
