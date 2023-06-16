import express from 'express'
import { AllUsers, deleteUser, forgetPassword, getASingleUser, getme, loginUser, registerme, resetPassword, updateUser, updateUserPassword} from '../controllers/user.controller.js'
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js'
const router=express.Router()

router.post("/register",registerme)
router.post("/login",loginUser)
router.get("/forgetpassword",forgetPassword)
router.put("/resetpassword/:token",resetPassword)
router.get("/me",authMiddleware,getme)
router.put("/updatepassword",authMiddleware,updateUserPassword)
router.get("/:id",authMiddleware,checkRole('admin'),getASingleUser)
router.delete("/:id",authMiddleware,checkRole('admin'),deleteUser)
router.put("/:id",authMiddleware,checkRole('admin'),updateUser)
router.get('/allUsers',authMiddleware,checkRole('admin'),AllUsers)

export default router 