import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import {connnectDb} from './config/connectdb.js'
import { handleError, notFound } from './middlewares/errorhandler.js'
import userRoute from './router/user.router.js '
import courseRoute from './router/course.router.js'
import reviewRoute from './router/review.router.js'
import  bootcampRoute from './router/bootcamp.router.js'
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
app.use('api/v1',userRoute)
app.use('api/v1',bootcampRoute)
app.use('api/v1',reviewRoute)
app.use('api/v1',courseRoute)

app.use(notFound)
app.use(handleError)


// listening to the port 
app.listen(PORT,()=>{
    console.log(`running in ${process.env.NODE_ENV} mode  at the port  ${PORT}`)
})