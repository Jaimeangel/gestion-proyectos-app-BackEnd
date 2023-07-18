import Proyecto from '../models/Proyecto.js'

const obtenerProyectos= async (req,res)=>{
    const {user}=req;
    const proyectosByUser= await Proyecto.find({creador:user._id})
    return res.json({proyectosByUser})
}
const nuevoProyecto= async (req,res)=>{
    const {user}=req;
    const proyecto= new Proyecto(req.body)
    proyecto.creador=user._id;
    await proyecto.save()
    return res.json({proyecto})
}
const obtenerProyecto= async (req,res)=>{
    const {proyecto} = req.params;
    const {user}=req;
    try {
        const proyectoById = await Proyecto.findById(proyecto)

        if(proyectoById.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No es posible acceder al proyecto')
            return res.status(403).json({msg:errorMsg.message})
        }
    
        return res.json({proyectoById})
    } catch (error) {
        const errorMsg= new Error('Lo sentimos, el proyecto que trata acceder no existe')
        return res.status(404).json({msg:errorMsg.message})
    }
}
const editarProyecto=()=>{

}
const eliminarProyecto=()=>{

}
const agregarColaborador=()=>{

}
const eliminarColaborador=()=>{

}
const obtenerTareas=()=>{

}

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}