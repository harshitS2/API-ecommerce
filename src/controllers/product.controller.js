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
};

export const getProductById = async(req, res) =>{
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if(!product){
            res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export const addProduct = async(req, res)=>{
    const {name, price, description, quantity, category, images} = req.body;
    if(!name || !price || !description || !quantity || !category || !images)
        res.status(400).json({message: "All fields are required"});
    if(price <= 0 || quantity <= 0)
        res.status(400).json({message: "Price and quantity must be positive numbers"});
    try {
        const newProduct = new Product({name, price, description, quantity, category, images});
        await newProduct.save();
        res.status(201).json({message: "Product saved successfully", data: newProduct});
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
}

export const updateProductById = async(req, res)=>{
    const productId = req.params.id;
    const {name, price, description, quantity, category, images} = req.body;
    try {
        let product = await Product.findById(productId);
        if(!product){
            res.status(404).json({message: "Product not found"});
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.images = images || product.images;
        await product.save();
        res.status(200).json({message: "Product updated successfully", data: product});
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
}

export const deleteProductById = async(req, res)=>{
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if(!product){
            res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({message: "Product deleted successfully"});
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
}