import express from "express"
import { Login, Profile, Register } from "../controller/user.Controller.js"
import { AuthCheck } from "../middleware/auth.middleware.js"

const  router = express.Router()

router.post("/register",Register)
router.post("/login",Login)
router.get("/profile",AuthCheck,Profile)
 

export default router