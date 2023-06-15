import express from 'express'
import { AllUsers, forgetPassword, getASingleUser, getme, loginUser, registerme } from '../controllers/user.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'
const router=express.Router()

router.get('/allUsers',authMiddleware,AllUsers)
router.post("/register",registerme)
router.post("/login",loginUser)
router.get("/forgetpassword",forgetPassword)
router.get("/me",authMiddleware,getme)
router.get("/:id",authMiddleware,getASingleUser)
export default router 