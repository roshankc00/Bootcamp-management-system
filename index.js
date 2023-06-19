import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import morgan from 'morgan'
import {connnectDb} from './config/connectdb.js'
import { handleError, notFound } from './middlewares/errorhandler.js'
import morgan from 'morgan'
import mongoSanitize from 'express-mongo-sanitize'
import userRoute from './routes/user.router.js'
import courseRoute from './routes/course.router.js'
import reviewRoute from './routes/review.router.js'
import  bootcampRoute from './routes/bootcamp.router.js'

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
app.use(mongoSanitize())




// routes 
app.use('/api/v1/user',userRoute)
app.use('/api/v1',bootcampRoute)
// app.use('/api/v1',reviewRoute)
// app.use('/api/v1',courseRoute)

app.use(notFound)
app.use(handleError)


// listening to the port 
app.listen(PORT,()=>{
    console.log(`running in ${process.env.NODE_ENV} mode  at the port  ${PORT}`)
})