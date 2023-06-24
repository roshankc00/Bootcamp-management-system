import express from 'express'
import { addBootcamp, deleteBootcamp, getASingleBootcamp, getAllBootcamp, updateBootcamp } from '../controllers/bootcamp.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { authMiddleware, checkRole } from '../middlewares/auth.middleware.js'
import { filterResults } from '../middlewares/filterResult.middlewar.js'
import Bootcamp from '../modals/bootcamp.model.js'

const router=express.Router()
 /**
 * @swagger
 * components:
 *   schemas:
 *     Bootcamp:
 *       type: object
 *       required:
 *         -name
 *         -description
 *         -email
 *         -careers
 *         -averageCost
 *       properties:
 *         name:
 *           type: string
 *           description: name of the bootcamp
 *         description:
 *           type: string
 *           description: description of the bootcamp
 *         email:
 *           type: string
 *           description: email  of the bootcamp creater
 *         website:
 *           type: string
 *           description: name of the bootcamp
 *         careers:
 *           type: Array
 *           description: available carrers  of the bootcamp   Web Development,Mobile Development,UI/UX,Data Science,Artificial Intelligence,others
 *         averageRating :
 *           type: Number 
 *           description: Rating for the bootcamp
 *         averageCost :
 *           type: Number
 *           description: avreage cost  of the bootcamp
 *         phone:
 *           type: Number 
 *           description: Number  of the bootcamp creater 
 *         photo:
 *           type: string
 *           format: binary
 *           description: Number  of the bootcamp creater 
 *       example:
 *         name: Bootcamp 1  
 *         desciption: the best bootcamp in the market
 *         email: roshankc813@gmail.com
 *         website: https://portfolio-iota-eight-32.vercel.app/
 *         carrers: ["web developemt"]
 *         averageRating: 1
 *         phone: 9857638274
*/


/**
 * @swagger
 * /bootcamp:
 *   post:
 *     summary: create the new Bootcamp.
 *     tags: [Bootcamp]
 *     requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *         schema:
 *           $ref: '#/components/schemas/Bootcamp'
 *     responses:
 *       200:
 *        description: User loged in sucessfully with token
 *       400:
 *        description: User not found 
 *       500:
 *        description: internal server Error
*/ 
router.post('/bootcamp',authMiddleware,upload.single('photo'),addBootcamp)
/**
 * @swagger
 * /bootcamp/{id}:
 *   delete:
 *     summary: get  the single bootcamp.
 *     tags: [Bootcamp]
 *     parameters:
 *       - in: path
 *       - name: id
 *         schema:
 *           type: String
 *         required: true
 *         desciption: the bootcamp id
 *     responses:
 *       200:
 *        description:user info
 *       400:
 *        description: Bootcamp not found
 *       500:
 *        description: internal server Error
*/
router.delete('/boorcamp/:id',authMiddleware,deleteBootcamp)

/**
 * @swagger
 * /bootcamp/{id}:
 *   get:
 *     summary: get  the single bootcamp.
 *     tags: [Bootcamp]
 *     parameters:
 *       - in: path
 *       - name: id
 *         schema:
 *           type: String
 *         required: true
 *         desciption: the bootcamp id
 *     responses:
 *       200:
 *        description:bootcamp  info
 *       400:
 *        description: Bootcamp not found
 *       500:
 *        description: internal server Error
*/
router.get('/bootcamp/:id',getASingleBootcamp)
router.patch('/bootcamp/:id',authMiddleware,updateBootcamp)
/**
 * @swagger
 * /bootcamps:
 *   get:
 *     summary: get  the single bootcamp.
 *     tags: [Bootcamp]
 *     parameters:
 *       - in: query
 *       - name: page
 *         schema:
 *           type: String
 *         desciption: the page number
 *         default: 1 
 *         example: 1 
 *       - in: query
 *       - name: limit
 *         schema:
 *           type: String
 *         desciption: the page Limit
 *         default: 10 
 *         example: 10
 *       - in: query
 *       - name: sort
 *         schema:
 *           type: String
 *         desciption: the sort name
 *         default: -createdAT 
 *     responses:
 *        200:
 *          desciiption: all user info
 *  

*/
router.get('/bootcamps',filterResults(Bootcamp),getAllBootcamp)

export default router 
