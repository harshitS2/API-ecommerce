import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending" },
    deliveryAddress: { type: String, required: true }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;