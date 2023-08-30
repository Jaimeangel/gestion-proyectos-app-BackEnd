import express from 'express';
import {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
    buscarColaborador
} from '../controllers/ProyectoController.js'

import checkAuth from '../middlewares/checkAuth.js';

const router=express.Router();

router
    .route('/')
    .post(checkAuth,nuevoProyecto)
    .get(checkAuth,obtenerProyectos)

router
    .route('/:proyecto')
    .get(checkAuth,obtenerProyecto)
    .put(checkAuth,editarProyecto)
    .delete(checkAuth,eliminarProyecto)
router
    .route('/:proyecto/colaboradores')
    .post(checkAuth,buscarColaborador)

export default router;