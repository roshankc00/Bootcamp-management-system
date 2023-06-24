import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
// import xss from 'xss'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import {connnectDb} from './config/connectdb.js'
import { handleError, notFound } from './middlewares/errorhandler.js'
import morgan from 'morgan'
import userRoute from './routes/user.router.js'
import reviewRoute from './routes/review.router.js'
import  bootcampRoute from './routes/bootcamp.router.js'
import  courseRoute from './routes/course.router.js'
import  swaggerRoute from './routes/swagger.route.js'

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
app.use(helmet())
// app.use(xss())  
app.use(hpp())
app.use(
    rateLimit({
      windowMs: 12 * 60 * 60 * 1000, // 12 hour duration in milliseconds
      max: 100,
      message: "You exceeded 100 requests in 12 hour limit!",
      headers: true,
    })
  ); 




// routes 
app.use('/api/v1/user',userRoute)
app.use('/api/v1',bootcampRoute)
app.use('/api/v1',reviewRoute)
app.use('/api/v1',courseRoute)
app.use('/swagger',swaggerRoute)
app.use(cors())
app.use(notFound)
app.use(handleError)
// listening to the port 
app.listen(PORT,()=>{
    console.log(`running in ${process.env.NODE_ENV} mode  at the port  ${PORT}`)
})