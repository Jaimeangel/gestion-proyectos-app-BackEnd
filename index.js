import express from "express"
import connectDB from "./config/db.js"

const APP = express()
const PORT = process.env.PORT || 4000;

APP.listen(PORT,()=>{
    console.log(`corriendo en el puerto ${PORT}`)
})

connectDB()