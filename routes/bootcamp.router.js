import express from 'express'
import { addBootcamp, deleteBootcamp, getASingleBootcamp, getAllBootcamp, updateBootcamp } from '../controllers/bootcamp.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js'
import { filterResults } from '../middlewares/filterResult.middlewar.js'
import Bootcamp from '../modals/bootcamp.model.js'

const router=express.Router()

router.post('/bootcamp',authMiddleware,upload.single('photo'),addBootcamp)
router.delete('/boorcamp/:id',authMiddleware,deleteBootcamp)
router.get('/bootcamp/:id',getASingleBootcamp)
router.patch('/bootcamp/:id',authMiddleware,updateBootcamp)
router.get('/bootcamps',filterResults(Bootcamp),getAllBootcamp)

export default router 
