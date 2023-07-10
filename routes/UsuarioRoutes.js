import express from 'express';
import { userRegister,authenticate } from '../controllers/UsuarioController.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',userRegister)
router.post('/login',authenticate)

export default router;