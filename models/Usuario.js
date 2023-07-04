import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    token:{
        type:String
    },
    confirmado:{
        type:Boolean,
        default:false
    }
},
{ 
    timestamps: true 
});

const User=mongoose.model('User',userSchema)

export default User;