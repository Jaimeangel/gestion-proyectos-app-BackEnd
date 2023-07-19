import express from 'express';
import { 
    userRegister,
    authenticate,
    userConfirmation,
    recoverPassword,
    verifyToken,
    changePassword,
    perfil
} from '../controllers/UsuarioController.js';

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',userRegister)
router.post('/login',authenticate)
router.get('/confirmation/:token',userConfirmation)
router.post('/recover-password',recoverPassword)

router
    .route('/recover-password/:token')
    .get(verifyToken)
    .post(changePassword)

router.get('/perfil',checkAuth,perfil)

export default router;