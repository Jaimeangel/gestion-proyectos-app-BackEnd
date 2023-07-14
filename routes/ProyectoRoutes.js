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




export default router;