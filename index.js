import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userAuth from "./src/routes/user.route.js"
import connectDB from "./src/lib/db.js";
import productsRoute from "./src/routes/products.route.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', userAuth);
app.use('/api/products', productsRoute)
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})