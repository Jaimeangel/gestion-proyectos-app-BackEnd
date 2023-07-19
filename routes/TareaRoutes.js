import express from 'express';

export {
    crearTarea,
    editarTarea,
    eliminarTarea,
    obtenerTarea,
    cambiarEstadoTarea
} from '../controllers/TareaController.js'

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',checkAuth,crearTarea)

router
    .route('/:tarea')
    .get(checkAuth,obtenerTarea)
    .put(checkAuth,editarTarea)
    .delete(checkAuth,eliminarTarea)

router.post('/estado/:tarea/',checkAuth,cambiarEstadoTarea)


export default router;