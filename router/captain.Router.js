import express from "express"
import { captainLogin, captainRegister } from "../controller/captain.Controller.js"
const router = express.Router()

router.post("/register",captainRegister)
router.post("/login",captainLogin)

export default router