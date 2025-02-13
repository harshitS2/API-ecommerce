import express from 'express';
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from '../controllers/product.controller.js';
import { adminMiddleware } from '../middleware/admin.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const route = express();

route.get('/', getProduct);
route.get('/:id', getProductById);
route.post('/add', authMiddleware, adminMiddleware, addProduct);
route.post('/update/:id', authMiddleware, adminMiddleware, updateProductById);
route.post('/delete/:id', authMiddleware, adminMiddleware, deleteProductById);


export default route;