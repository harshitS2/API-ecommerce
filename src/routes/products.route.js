import express from 'express';
import { getProduct } from '../controllers/product.controller.js';
const route = express();

route.get('/', getProduct);


export default route;