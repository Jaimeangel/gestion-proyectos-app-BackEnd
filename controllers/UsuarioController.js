import User from "../models/Usuario.js"

const userRegister= async (req,res)=>{
    const {email}=req.body;
    const userExists= await User.findOne({email})

    if(userExists){
        const error = new Error('Este usuario ya esta registrado')
        return res.status(400).json({msg:error.message})
    }

    try {
        const newUser= new User(req.body);
        const userRegister = await newUser.save()
        res.send({msg:'Usuario creado con exito'})
    } catch (error) {
        console.log(error)
    }
}

export {
    userRegister
}