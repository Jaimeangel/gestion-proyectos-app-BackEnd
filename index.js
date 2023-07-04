import express from "express"
import connectDB from "./config/db.js"
import UserRoutes from './routes/UsuarioRoutes.js'

const APP = express()
const PORT = process.env.PORT || 4000;

//Routing
APP.use('/api/usuarios',UserRoutes)

APP.listen(PORT,()=>{
    console.log(`corriendo en el puerto ${PORT}`)
})

connectDB()