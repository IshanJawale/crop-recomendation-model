import express from "express";
import { getPlacesController } from "../controller/common/getPlacesController.js";
import { getNearbyPlacesController } from "../controller/common/getNearbyPlacesController.js";
import { getChatbotResponse } from "../controller/common/chatbotController.js";
const router = express.Router();

router.get("/getPlaces", getPlacesController);
router.get("/getNearbyPlaces", getNearbyPlacesController);
router.post("/getChatbotResponse", getChatbotResponse);

export default router;
