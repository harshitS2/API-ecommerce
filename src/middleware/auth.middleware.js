import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) =>{
    const token = req.cookies.jwt;
    if(!token) 
        res.status(401).json({message: "Token is required"});
    const decode = jwt.decode(token, process.env.JWT_SECRET);
    if(!decode)
        res.status(401).json({message: "User is not authorized"});
    const user = await User.findById(decode.userId);
    if(!user) 
        res.status(401).json({message: "User not found"});
    req.user = user;
    next();
}