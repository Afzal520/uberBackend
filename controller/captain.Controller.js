import { Captain } from "../models/captain.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const captainRegister = async (req, res) => {
    const { firstName, lastName, email, password,color,capcity,motor,plate } = req.body; // Destructure fields directly from req.body
 console.log(firstName)
    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !password || !color  || !motor || !capcity || !plate) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        // Check if the captain already exists
        const existingCaptain = await Captain.findOne({ email });
        if (existingCaptain) {
            return res
                .status(409)
                .json({ success: false, message: "Captain already exists" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new captain instance
        const newCaptain = new Captain({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password: hashPassword,
            vehical:{
              color,
              plate,
              capcity,
              motor
            }
        });

        // Save the captain to the database
        await newCaptain.save();

        return res
            .status(201)
            .json({ success: true, message: "Captain registered successfully" });
    } catch (error) {
        console.error("Captain Error:", error); // Log the error for debugging
        return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
    }
};

export const captainLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.json({ success: false, message: "Please enter all required fields" })
        const captain = await Captain.findOne({ email })
        if (!captain) return res.json({ success: false, message: "captain not found" })
        const isMatch = await bcrypt.compare(password, captain.password)
        if (!isMatch) return res.json({ success: false, message: "invalid email or password" })
        // Generate JWT
        const token = jwt.sign({ userId: captain._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Adjust expiration as needed
        });
        res.cookie("captainToken", token, {
            httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            maxAge: 3600000, // 1 hour in milliseconds
        });
        res.status(200).json({ token, success: true, message: "captain login successfully" })

    } catch (error) {

    }
}