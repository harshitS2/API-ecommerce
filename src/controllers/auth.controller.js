import User from "../models/user.model.js"
import bcrypt from "bcrypt";
import { generateToken } from "../lib/util.js"
export const signup = async (req, res) => {
    const { name, age, email, password, confirmPassword, isAdmin } = req.body;
    if (!name || !age || !email || !password || !confirmPassword)
        return res.status(400).json({ message: "All fields are required." });
    if (password !== confirmPassword)
        return res.status(400).json({ message: "Passwords do not match." });
    if (password.length < 6)
        return res.status(400).json({ message: "Password must be at least 6 characters long." });
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists." });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, age, email, password: hashedPassword, isAdmin });
        generateToken(newUser._id, res);
        const user = await newUser.save();
        res.status(201).json({ message: "User created successfully.", user });
    } catch (error) {
        console.error("Error while creating user", error.message);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        if (!email || !password) {
            res.status(400).json("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json("User not found");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            res.status(400).json("Password is incorrect");
        generateToken(user._id, res);
        res.status(200).json({ message: 'Logged in successfully', user: user.name });
    } catch (error) {
        console.log(`Server error: ${error.message}`);
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        });
        res.status(200).json("User Logged Out");
    } catch (error) {
        console.error("Error while logging out", error.message);
    }
}