import express from 'express';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
} from '../controllers/ProyectoController.js'

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

router
    .route('/')
    .post(checkAuth,nuevoProyecto)
    .get(checkAuth,obtenerProyectos)

router
    .route('/:proyecto')
    .post(checkAuth,obtenerProyecto)
    .put(checkAuth,editarProyecto)
    .delete(checkAuth,eliminarProyecto)


export default router;