import { User } from "../models/user.Model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const Register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Validate input fields
        if (!firstName || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ success: false, message: "User already exist" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
            fullName: {
                firstName,
                lastName
            },
            email,
            password: hashPassword,
        });
        await newUser.save();

        // Respond with success
        return res.status(201).json({ success: true, message: "User register successfully" });
    } catch (error) {
        console.error("Register Error:", error); // Log the error for debugging
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all required fields." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Adjust expiration as needed
        });

        // Set token as a cookie
        res.cookie("token", token, {
            httpOnly: true, // Ensures the cookie is only accessible via HTTP(S)
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            maxAge: 3600000, // 1 hour in milliseconds
        });

        // Respond with user data
        return res.status(200).json({
            success: true,
            message: "User logged in successfully.",
            token,
            user: {
                _id: user._id,
                name: user.fullName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error); // Log error for debugging
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const Profile = async (req, res) => {
    res.status(200).json({ user: req.user, success: true, message: "load profile successfully" })

}
//  code pending
export const Logout = async (req, res) => {
    try {
        res.clearCookies("token")

    } catch (error) {

    }
}