import express from "express";
import { getUserController } from "../controller/user/getUserController.js";
import {
  initialiazePlantationController,
  completePlantationController,
  getPlantationsController,
  plantTreeController,
  getPhotoURLController,
  getTreesController,
} from "../controller/user/userPlantationController.js";

import { upload } from "../config/multer.js";
import { plantationChatController } from "../controller/user/plantationChatController.js";
const router = express.Router();

router.get("/getUser", getUserController);

//Plantation Routes

router.get("/getPlantations", getPlantationsController);
router.post("/getTrees", getTreesController);
router.post("/initializePlantation", initialiazePlantationController);
router.post("/plantTree", upload.single("photo"), plantTreeController);
router.post("/completePlantation", completePlantationController);
router.get("/photoURL", getPhotoURLController);
router.post("/plantationChat", plantationChatController);

export default router;
