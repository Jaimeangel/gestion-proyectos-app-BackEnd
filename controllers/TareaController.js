import Tarea from '../models/Tarea.js'
import Proyecto from '../models/Proyecto.js'

const crearTarea= async (req,res)=>{
    const tarea=req.body;
    const {user}=req;

    try {
        const proyectExist= await Proyecto.findById(tarea.proyecto)

        if(proyectExist.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        const newTarea=new Tarea(tarea)

        try {
            await newTarea.save()
            return res.json(newTarea)
        } catch (error) {
            const errorMsg= new Error('Algo salio mal')
            console.log(error)
            return res.status(403).json({msg:errorMsg.message})
        }
    } catch (error) {
        const errorMsg= new Error('El proyecto no existe')
        return res.status(404).json({msg:errorMsg.message})
    }
}
const editarTarea= async (req,res)=>{
    const {tarea}=req.params;
    const {user}=req;

    try {
        const tareaExist = await Tarea.findById(tarea).populate("proyecto")

        if(tareaExist.proyecto.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        const valueToUpdate= Object.keys(req.body)
        valueToUpdate.forEach(value =>{
            if(value in tareaExist){
                tareaExist[value]=req.body[value]
            }
        })
        
        try {
            await tareaExist.save()
            res.json({msg:"Se guardaron los cambios con exito"})
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errorMsg= new Error('algo salio mal')
        return res.status(404).json({msg:errorMsg.message})
    }
}
const eliminarTarea= async (req,res)=>{
    const {tarea}=req.params;
    const {user}=req;

    try {
        const tareaExist = await Tarea.findById(tarea).populate("proyecto")

        if(tareaExist.proyecto.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        try {
            await tareaExist.deleteOne()
            return res.json({msg:'La tarea fue eliminidad con exito'})
        } catch (error) {
            const errorMsg= new Error('Algo salio mal')
            console.log(error)
            return res.status(403).json({msg:errorMsg.message})
        }
    } catch (error) {
        const errorMsg= new Error('Algo salio mal')
        return res.status(404).json({msg:errorMsg.message})
    }
}
const obtenerTarea= async (req,res)=>{
    const {tarea}=req.params;
    const {user}=req;

    try {
        const tareaExist = await Tarea.findById(tarea).populate("proyecto")

        if(tareaExist.proyecto.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        return res.json(tareaExist)
    }catch(error) {
        const errorMsg = new Error('algo salio mal')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const cambiarEstadoTarea=(req,res)=>{
    
}

export{
    crearTarea,
    editarTarea,
    eliminarTarea,
    obtenerTarea,
    cambiarEstadoTarea
}