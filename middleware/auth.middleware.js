import jwt from "jsonwebtoken";
import { User } from "../models/user.Model.js";

export const AuthCheck = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.json({ success: false, message: "not authenticated" })
    const decoded =jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    const user = await User.findById(userId)
    req.user=user
   console.log(user)
    next()
};
