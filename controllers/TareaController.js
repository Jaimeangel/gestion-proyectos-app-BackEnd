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

        const newTarea = new Tarea(tarea)
        newTarea.populate({
            path: "colaborador",
            select: "-password -confirmado -token -createdAt -updatedAt"
        })

        try {
            await newTarea.save()
            proyectExist.tareas.push(newTarea._id)
            await proyectExist.save()
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

const getTareaByProject= async (req,res)=>{
    const {proyecto}=req.params;
    const {user}=req;

    try {
        const proyectExist= await Proyecto.findById(proyecto).populate("colaboradores")

        if(proyectExist.creador.toString() !== user._id.toString() && !proyectExist.colaboradores.some(colaborador => colaborador._id.toString() === user._id.toString())){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        try {
            const tareasByProyect= await Tarea.find({proyecto:proyecto}).populate({
                path: "colaborador",
                select: "-password -confirmado -token -createdAt -updatedAt"
            })
            return res.json(tareasByProyect)
        } catch (error) {
            const errorMsg = new Error('algo salio mal, intentalo mas tarde')
            return res.status(404).json({msg:errorMsg.message})
        }
        
    } catch (error) {
        const errorMsg = new Error('algo salio mal,posiblemente el proyecto no exista')
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
            try {
                const tareaColaborador = await Tarea.findById(tarea).populate({
                    path: "colaborador",
                    select: "-password -confirmado -token -createdAt -updatedAt"
                })
                res.json(tareaColaborador)
            } catch (error) {
                const errorMsg= new Error('algo salio mal')
                return res.status(404).json({msg:errorMsg.message})
            }
            
        } catch (error) {
            const errorMsg= new Error('algo salio mal')
            return res.status(404).json({msg:errorMsg.message})
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
            await tareaExist.proyecto.tareas.pull(tarea)
            await tareaExist.proyecto.save()
            res.json(tareaExist)
            await tareaExist.deleteOne()
            return
        } catch (error) {
            const errorMsg= new Error('Algo salio mal de nuestro lado, intentalo nuevamente')
            console.log(error)
            return res.status(403).json({msg:errorMsg.message})
        }
    } catch (error) {
        const errorMsg= new Error('Algo salio mal de nuestro lado, intenlo mas tarde')
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


const cambiarEstadoTarea= async (req,res)=>{
    const {tarea}=req.params;
    const {user}=req;

    try {
        const tareaExist = await Tarea.findById(tarea).populate("proyecto").populate({
            path: "colaborador",
            select: "-password -confirmado -token -createdAt -updatedAt"
        })

        if(tareaExist.proyecto.creador.toString() !== user._id.toString() && !tareaExist.proyecto.colaboradores.some(colaborador => colaborador._id.toString() === user._id.toString())){
            const errorMsg= new Error('No tienes los permisos para realizar esta accion al proyecto')
            return res.status(401).json({msg:errorMsg.message})
        }

        try {
            tareaExist.estado = !tareaExist.estado
            await tareaExist.save()
            return res.json(tareaExist)
        } catch (error) {
            const errorMsg= new Error('Algo salio mal de nuestro lado, intentalo nuevamente')
            console.log(error)
            return res.status(404).json({msg:errorMsg.message})
        }

    }catch(error) {
        const errorMsg = new Error('algo salio mal, no encontramos la tarea')
        return res.status(404).json({msg:errorMsg.message})
    }
}

export{
    crearTarea,
    editarTarea,
    eliminarTarea,
    obtenerTarea,
    cambiarEstadoTarea,
    getTareaByProject
}