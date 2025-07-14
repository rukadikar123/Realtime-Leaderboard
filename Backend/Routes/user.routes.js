import { Router } from "express";
import { addUser, claimPoints, getClaimHitsory, getLeaderBoard, getUsers } from "../Controllers/user.controller.js";

const router=Router()

router.get("/users",getUsers)
router.post("/addUser",addUser)
router.post("/claim/:userId",claimPoints)
router.get("/leaderboard",getLeaderBoard)
router.get("/history/:userId",getClaimHitsory)



export default router