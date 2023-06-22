import express from 'express'
import { addCourse, getAllCourses, getCourse } from '../controllers/courses.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const router=express.Router()

router.post('/course',authMiddleware,addCourse)
router.get('/course/:id',getCourse)
// router.delete('/course/:id',authMiddleware,deleteCourse)
router.get('/courses',getAllCourses)

export default router 