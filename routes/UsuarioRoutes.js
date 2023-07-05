import express from 'express';
import { userRegister } from '../controllers/UsuarioController.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',userRegister)

export default router;