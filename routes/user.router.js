import express from 'express'
import { forgetPassword, loginUser, registerme } from '../controllers/user.controller.js'
const router=express.Router()

router.post("/register",registerme)
router.post("/login",loginUser)
router.get("/forgetpassword",forgetPassword)


export default router 