import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }]
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;