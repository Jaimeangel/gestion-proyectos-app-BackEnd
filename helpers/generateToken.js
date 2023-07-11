import Jwt  from "jsonwebtoken";

const generateToken=(id_user)=>{
    const token = Jwt.sign({id_user},process.env.JWT_SECRET,{
        expiresIn:'10d'
    })
    return token
}

export {
    generateToken
}
