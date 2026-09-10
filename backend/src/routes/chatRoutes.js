import express from "express"
import { getStreamTokken } from "../controllers/chatController.js";
import { protectRoute } from "../middleware/protectRoute.js"
const router=express.Router()

router.get("/token",protectRoute,getStreamTokken)
export default router;