import express from 'express';
const Router=express.Router();

Router.get('/',(req,res)=>{
    res.send('aqui estamos paradados en Router de usuarios again')
})

export default Router;