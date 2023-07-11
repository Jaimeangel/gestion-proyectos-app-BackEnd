import express from 'express';
import { userRegister,authenticate,userConfirmation,recoverPassword,verifyToken,changePassword } from '../controllers/UsuarioController.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',userRegister)
router.post('/login',authenticate)
router.get('/confirmation/:token',userConfirmation)
router.post('/recover-password',recoverPassword)

router.get('/recover-password/:token',verifyToken)
router.post('/recover-password/:token',changePassword)

export default router;