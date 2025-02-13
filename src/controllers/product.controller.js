import Product from "../models/product.model.js"

export const getProduct = async(req, res) =>{
    try {
        const products = await Product.find();
        if(!products){
            res.status(404).json({message: "No products found"});
        }
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}