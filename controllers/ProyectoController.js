import Proyecto from '../models/Proyecto.js'
import User from '../models/Usuario.js';

const obtenerProyectos= async (req,res)=>{
    const {user}=req;
    try {
        const proyectosByUser= await Proyecto.find({creador:user._id})
        return res.json(proyectosByUser)
    } catch (error) {
        console.log(error)
        const errorMsg= new Error('No fue posible traer los proyectos')
        return res.status(403).json({
            msg:errorMsg.message,
            error
        })
    }
}
const nuevoProyecto= async (req,res)=>{
    console.log('aqui desde NUEVO PROYECTO')
    const {user}=req;
    const proyecto= new Proyecto(req.body)
    proyecto.creador=user._id;

    try {
        await proyecto.save()
        return res.json(proyecto)
    } catch (error) {
        const errorMsg= new Error('No fue posible crear el proyecto')
        console.log(error)
        return res.status(403).json({msg:errorMsg.message})
    }
}
const obtenerProyecto= async (req,res)=>{
    const {proyecto} = req.params;
    const {user}=req;
    try {
        const proyectoById = await Proyecto.findById(proyecto)

        if(proyectoById.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para acceder al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }
    
        return res.json(proyectoById)
    } catch (error) {
        const errorMsg= new Error('Lo sentimos el proyecto que trata acceder no existe')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}
const editarProyecto= async (req,res)=>{
    const {proyecto} = req.params;
    const {user}=req;
    try {
        const proyectoById = await Proyecto.findById(proyecto)

        if(proyectoById.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para modificar el proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        const valueToUpdate= Object.keys(req.body)
        valueToUpdate.forEach(value =>{
            if(value in proyectoById){
                proyectoById[value]=req.body[value]
            }
        })
        
        try {
            await proyectoById.save()
            res.json(proyectoById)
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        const errorMsg= new Error('Lo sentimos, el proyecto que trata editar no existe')
        console.log(error)
        return res.status(404).json({msg:errorMsg.message})
    }
}
const eliminarProyecto= async (req,res)=>{
    const {proyecto} = req.params;
    const {user}=req;
    try {
        const proyectoById = await Proyecto.findById(proyecto)

        if(proyectoById.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('No tienes los permisos para esta accion')
            return res.status(401).json({msg:errorMsg.message})
        }

        
        try {
            await proyectoById.deleteOne()
            res.json({msg:"El proyecto se elimino con exito"})
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
        const errorMsg= new Error('Lo sentimos, el proyecto que trata de eliminar no existe')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const buscarColaborador= async (req,res)=>{
    const {email}=req.body;

    try {
        const colaborador= await User.findOne({email}).select("-confirmado -createdAt -password -token -updatedAt")
        res.json(colaborador)
    } catch (error) {
        console.log(error)
        const errorMsg= new Error('Lo sentimos, el usuario no fue encontrado')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const agregarColaborador= async (req,res)=>{
    const {proyecto} = req.params;
    const {user}=req;
    const {emailColaborador}=req.body;
    
    try {
        const proyectoById = await Proyecto.findById(proyecto)

        if(proyectoById.creador.toString() !== user._id.toString()){
            const errorMsg= new Error('Accion no valida')
            return res.status(401).json({msg:errorMsg.message})
        }

        try{
            const colaborador= await User.findOne({email:emailColaborador}).select("-confirmado -createdAt -password -token -updatedAt")
            
            if(proyectoById.creador.toString() === colaborador._id.toString()){
                const errorMsg= new Error('El administrador del proyecto no puede incluirse dentro de los colaboradores')
                return res.status(401).json({msg:errorMsg.message})
            }

            if(proyectoById.colaboradores.includes(colaborador._id)){
                const errorMsg= new Error('El colaborador ya esta incluido en el proyecto')
                return res.status(404).json({msg:errorMsg.message})
            }

            try {
                await proyectoById.colaboradores.push(colaborador._id)
                await proyectoById.save()
                return res.status(200).json({msg:'El colaborador fue agregado al proyecto con exito'})
            }catch(error) {
                console.log(error)
                const errorMsg= new Error('Lo sentimos algo salio mal')
                return res.status(404).json({msg:errorMsg.message})
            }
        }catch(error) {
            console.log(error)
            const errorMsg= new Error('Lo sentimos, el usuario no fue encontrado')
            return res.status(404).json({msg:errorMsg.message})
        }
    }catch(error) {
        console.log(error)
        const errorMsg= new Error('Lo sentimos, el proyecto no existe')
        return res.status(404).json({msg:errorMsg.message})
    }

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
    obtenerTareas,
    buscarColaborador
}