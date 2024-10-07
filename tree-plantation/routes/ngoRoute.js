import express from "express";
import { registerNewPlaceContoller } from "../controller/ngo/registerPlaceController.js";
import { addPlaceToNGOController } from "../controller/ngo/addPlaceToNGOController.js";
import { getPlacesUderNGOController } from "../controller/ngo/getPlacesUnderNGOController.js";
import { getNGOController } from "../controller/ngo/getNGOController.js";
import {
  initializePlantationNGOController,
  completePlantationController,
  getPlantationsNGOController,
  getTreeController,
  plantTreeController,
  startPlantationNGOController,
} from "../controller/ngo/ngoPlantationController.js";
import { upload } from "../config/multer.js";
const router = express.Router();

router.post("/registerPlace", registerNewPlaceContoller);
router.post("/addPlace", addPlaceToNGOController);
router.get("/getPlaces", getPlacesUderNGOController);
router.get("/getNGO", getNGOController);

//Plantation routes
router.post("/initializePlantation", initializePlantationNGOController);
router.post("/startPlantation", startPlantationNGOController);
router.post("/plantTree", upload.single("photo"), plantTreeController);
router.post("/completePlantation", completePlantationController);
router.get("/getPlantations", getPlantationsNGOController);
router.get("/getTree", getTreeController);

export default router;
