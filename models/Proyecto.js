import mongoose from "mongoose";

const proyectoSchema=mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    descripcion:{
        type:String,
        require:true,
        trim:true
    },
    cliente:{
        type:String,
        require:true,
        trim:true
    },
    creador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    colaboradores:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    tareas:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tarea'
        }
    ],
    fechaEntrega:{
        type:Date,
        default:Date.now()
    }
},
{ 
    timestamps: true 
});

const Proyecto=mongoose.model('Proyecto',proyectoSchema)
export default Proyecto;