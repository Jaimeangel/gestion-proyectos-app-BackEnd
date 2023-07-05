import mongoose from "mongoose";
import bcrypt from 'bcrypt'


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

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})



const User=mongoose.model('User',userSchema)

export default User;