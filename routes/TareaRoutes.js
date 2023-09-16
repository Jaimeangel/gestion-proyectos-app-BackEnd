import express from 'express';

import {
    crearTarea,
    editarTarea,
    eliminarTarea,
    obtenerTarea,
    cambiarEstadoTarea,
    getTareaByProject
} from '../controllers/TareaController.js'

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

//Create, Register and Confirmation
router.post('/',checkAuth,crearTarea)
router.get('/:proyecto',checkAuth,getTareaByProject)

router
    .route('/:tarea')
    .get(checkAuth,obtenerTarea)
    .put(checkAuth,editarTarea)
    .delete(checkAuth,eliminarTarea)

router.post('/estado/:tarea',checkAuth,cambiarEstadoTarea)


export default router;