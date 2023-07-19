import express from "express"
import connectDB from "./config/db.js"
import UserRoutes from './routes/UsuarioRoutes.js'
import ProyectoRoutes from './routes/ProyectoRoutes.js'
import TareasRoutes from './routes/TareaRoutes.js'

const APP = express()
APP.use(express.json())
const PORT = process.env.PORT || 4000;

//Routing
APP.use('/api/usuarios',UserRoutes)
APP.use('/api/proyectos',ProyectoRoutes)
APP.use('/api/tareas',TareasRoutes)


APP.listen(PORT,()=>{
    console.log(`corriendo en el puerto ${PORT}`)
})

connectDB()