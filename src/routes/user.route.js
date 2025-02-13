import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
const route = express();

route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);

export default route;