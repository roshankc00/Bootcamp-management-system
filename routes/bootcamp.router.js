import express from 'express'
import { addBootcamp } from '../controllers/bootcamp.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router=express.Router()

router.post('/bootcamp',upload.single('photo'),addBootcamp)

export default router 