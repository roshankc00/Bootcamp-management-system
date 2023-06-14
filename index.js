import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import {connnectDb} from './config/connectdb.js'
// rest variable
dotenv.config({path:"config/.env"})
const app=express()
const PORT=process.env.PORT


// connecting to the database
connnectDb()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))




// routes 


// listening to the port 
app.listen(PORT,()=>{
    console.log(`running in ${process.env.NODE_ENV} mode  at the port  ${PORT}`)
})