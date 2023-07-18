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

router.post('/',checkAuth,nuevoProyecto)
router.get('/',checkAuth,obtenerProyectos)
router.post('/:proyecto',checkAuth,obtenerProyecto)


export default router;