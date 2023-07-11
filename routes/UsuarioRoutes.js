import express from 'express';
import { userRegister,authenticate,userConfirmation } from '../controllers/UsuarioController.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',userRegister)
router.post('/login',authenticate)
router.get('/confirmation/:token',userConfirmation)

export default router;