import asyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.config.js'
import Bootcamp from '../modals/bootcamp.model.js';
export const addBootcamp=asyncHandler(async(req,res)=>{
    try {
        const {name,description,phone,email,address,careers,averageCost}=req.body
        let uploadedFile=await cloudinary.v2.uploader.upload(req.file.path);

        const creater=await Bootcamp.create({
            name,description,phone,email,address,averageCost,careers,
            user:req.user._id,
            photo:uploadedFile.secure_url,
        })      
        res.send(creater)
        
    } catch (error) {
        throw new Error(error)

        
    }
})
