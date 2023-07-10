import User from "../models/Usuario.js"
import generatorId from "../helpers/generatorId.js"

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
        const userRegister = await newUser.save()
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
            email:userExists.email
        })

    }else{
        const errorMsg= new Error('La contraseña es incorrecta')
        return res.status(403).json({msg:errorMsg.message})
    }


}

export {
    userRegister,
    authenticate
}