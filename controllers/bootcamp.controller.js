import asyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.config.js'
export const addBootcamp=asyncHandler(async(req,res)=>{
    try {
        let uploadedFile=await cloudinary.v2.uploader.upload(req.file.path);
        console.log(uploadedFile)
        res.send(uploadedFile)
    } catch (error) {
        throw new Error(error)

        
    }
})
