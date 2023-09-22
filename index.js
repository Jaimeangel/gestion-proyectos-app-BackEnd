import express from "express"
import connectDB from "./config/db.js"
import UserRoutes from './routes/UsuarioRoutes.js'
import ProyectoRoutes from './routes/ProyectoRoutes.js'
import TareasRoutes from './routes/TareaRoutes.js'
import cors from 'cors'

const APP = express()
APP.use(express.json())
const PORT = process.env.PORT || 4000;

const whitelist = ['http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

APP.use(cors(corsOptions))

//Routing
APP.use('/api/usuarios',UserRoutes)
APP.use('/api/proyectos',ProyectoRoutes)
APP.use('/api/tareas',TareasRoutes)


const servidor =  APP.listen(PORT,()=>{
    console.log(`corriendo en el puerto ${PORT}`)
})

connectDB()

//Socket.io
import { Server } from "socket.io"

const io = new Server(servidor,{
  pingTimeout:60000,
  cors:{
    origin:'http://localhost:5173'
  }
})

io.on('connection',(socket)=>{
  //Definir los eventos de socket.io
  socket.on("open-project-id",(proyecto)=>{
    socket.join(proyecto)
  })

  socket.on('new-task',(tarea)=>{
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit('add-tarea',tarea)
  })

  socket.on('delete-task',(tarea)=>{
    const proyecto = tarea.proyecto._id;
    socket.to(proyecto).emit('delete-tarea',tarea)
  })

  socket.on('update-task',(tarea)=>{
    const proyecto = tarea.proyecto;
    socket.to(proyecto).emit('update-tarea',tarea)
  })
})