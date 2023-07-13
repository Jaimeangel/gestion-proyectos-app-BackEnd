import User from "../models/Usuario.js"
import generatorId from "../helpers/generatorId.js"
import { generateToken } from "../helpers/generateToken.js";

const userRegister= async (req,res)=>{
    const {email}=req.body;
    const userExists= await User.findOne({email})

    if(userExists){
        const error = new Error('Este usuario ya esta registrado')
        return res.status(400).json({msg:error.message})
    }

    try {
        const newUser= new User(req.body);
        newUser.token= generatorId()
        await newUser.save()
        res.send({msg:'Usuario creado con exito'})
    } catch (error) {
        console.log(error)
    }
}

const authenticate= async (req,res)=>{
    const {email,password}=req.body;
    const userExists= await User.findOne({email})

    //Comprobar si el usuario existe
    if(!userExists){
        const errorMsg= new Error('El usuario no existe')
        return res.status(404).json({msg:errorMsg.message})
    }

    //Comprobar si el usuario esta confirmado
    if(!userExists.confirmado){
        const errorMsg= new Error('El usuario no esta confirmado')
        return res.status(403).json({msg:errorMsg.message})
    }

    if(await userExists.authenticatePassword(password)){
        return res.status(200).json({
            _id:userExists._id,
            nombre:userExists.nombre,
            email:userExists.email,
            token:generateToken(userExists._id)
        })

    }else{
        const errorMsg= new Error('La contraseña es incorrecta')
        return res.status(403).json({msg:errorMsg.message})
    }


}

const userConfirmation= async (req,res)=>{
    const {token}=req.params;
    const userToken = await User.findOne({token})

    if(!userToken){
        const errorMsg= new Error('El token de confirmacion ha expirado')
        return res.status(403).json({msg:errorMsg.message})
    }

    try {
        userToken.confirmado=true
        userToken.token=''
        await userToken.save()
        res.status(200).json({msg:"El usuario se ha confirmado con exito",})
    } catch (error) {
        console.log(error)
    }
}

const recoverPassword= async (req,res)=>{
    const {email}=req.body;
    const userExists= await User.findOne({email})

    //Comprobar si el usuario existe
    if(!userExists){
        const errorMsg= new Error('El usuario no existe')
        return res.status(404).json({msg:errorMsg.message})
    }

    try {
        userExists.token=generatorId()
        await userExists.save()
        res.json({msg:"Hemos enviado un correo con las instrucciones par recupeara su contraseña"})
    } catch (error) {
        console.log(error)
    }

}

const verifyToken= async (req,res)=>{
    const {token}=req.params;
    const tokenValido = await User.findOne({token})

    if(tokenValido){
        res.json({msg:"El token es valido y el usuario existe"})
    }else{
        const errorMsg= new Error('El token no es valido')
        return res.status(404).json({msg:errorMsg.message})
    }
}

const changePassword= async (req,res)=>{
    const {password}=req.body;
    const {token}=req.params;

    const user= await User.findOne({token})

    try {
        user.password=password
        user.token=''
        await user.save()
        res.json({msg:'Su clave ha sido cambiada con exito'})
    } catch (error) {
        console.log(error)
    }

}

const perfil=(req,res)=>{
    const {user}=req;
    res.json({msg:user})
}

export {
    userRegister,
    authenticate,
    userConfirmation,
    recoverPassword,
    verifyToken,
    changePassword,
    perfil
}