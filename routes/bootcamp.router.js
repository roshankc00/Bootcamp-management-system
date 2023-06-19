import express from 'express'
import { addBootcamp, deleteBootcamp, getASingleBootcamp, getAllBootcamp } from '../controllers/bootcamp.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/bootcamp',authMiddleware,upload.single('photo'),addBootcamp)
router.delete('/boorcamp/:id',deleteBootcamp)
router.delete('/boorcamp/:id',getASingleBootcamp)
router.delete('/boorcamps',getAllBootcamp)

export default router 

// authMiddleware,checkRole('admin','publisher')