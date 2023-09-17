import mongoose from "mongoose";

const tareaSchema=mongoose.Schema({
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
    proyecto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Proyecto'
    },
    fechaEntrega:{
        type:Date,
        default:Date.now(),
        require:true
    },
    estado:{
        type:Boolean,
        default:false
    },
    prioridad:{
        type:String,
        require:true,
        enum:["Baja","Media","Alta"]
    },
    colaborador:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{ 
    timestamps: true 
})

const Tarea=mongoose.model('Tarea',tareaSchema);
export default Tarea;