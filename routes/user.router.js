import express from 'express'
import { AllUsers, deleteUser, forgetPassword, getASingleUser, getme, loginUser, registerme, resetPassword, updateUser, updateUserPassword,} from '../controllers/user.controller.js'
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js'
const router=express.Router()



/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register the user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json:
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *            name:
 *             type: string 
 *          example:
 *              name: Roshan karki 
 *              email: roshankc@gmail.com
 *              password: me@R2jdj
 *     responses:
 *       200:
 *        description: User created sucessfully with token
 *       400:
 *        description: User already exists
 *       500:
 *        description: internal server Error
 *
 * 
 *           
 * 
*/
router.post("/register",registerme)
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: L ogin  the user.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json: 
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *            password:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *              password: me@R2jdj
 *     responses:
 *       200:
 *        description: User loged in sucessfully with token
 *       400:
 *        description: User not found 
 *       500:
 *        description: internal server Error
*/
router.post("/login",loginUser)
 /**
 * @swagger
 * /user/forgetpassword:
 *   post:
 *     summary: Forget  the password.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json: 
 *         schema:
 *          type: object
 *          properties:
 *            email:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User not found 
 *       500:
 *        description: internal server Error
*/
router.post("/forgetpassword",forgetPassword)
 /**
 * @swagger
 * /user/resetpassword/:token:
 *   post:
 *     summary: Forget  the password.
 *     tags: [User]
 *     requestBody:
 *      content:
 *       application/json: 
 *         schema:
 *          type: object
 *          properties:
 *            password:
 *             type: string
 *            conformPassword:
 *             type: string
 *          example:
 *              email: roshankc@gmail.com
 *     responses:
 *       200:
 *        description: mail sent sucessfully
 *       400:
 *        description: User not found 
 *       500:
 *        description: internal server Error
*/
router.put("/resetpassword/:token", resetPassword)

router.get("/me",authMiddleware,getme)
router.put("/updatepassword",authMiddleware,updateUserPassword)
router.get("/:id",authMiddleware,checkRole('admin'),getASingleUser)
router.delete("/:id",authMiddleware,checkRole('admin'),deleteUser)
router.put("/:id",authMiddleware,checkRole('admin'),updateUser)
router.get('/allUsers',authMiddleware,checkRole('admin'),AllUsers)


export default router 
