import express from 'express'
import dotenv from 'dotenv'

// rest variable
dotenv.config({path:"config/.env"})
const app=express()
const PORT=process.env.PORT


// listening to the port 
app.listen(PORT,()=>{
    console.log(`running at the ${PORT}`)
})