import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"

import { createSession,getActiveSession,getMyRecentSession,getSessionById,joinSession,endSession,leaveSession,updateSessionProblem } from "../controllers/sessionController.js"

const router=express.Router()

router.post("/",protectRoute,createSession)
router.get("/active",protectRoute,getActiveSession)
router.get("/my-recent",protectRoute,getMyRecentSession)

router.post("/:id/join",protectRoute,joinSession)
router.post("/:id/end",protectRoute,endSession)
router.post("/:id/leave", protectRoute, leaveSession);
router.patch("/:id/problem",protectRoute,updateSessionProblem)
router.get("/:id",protectRoute,getSessionById)

export default router;