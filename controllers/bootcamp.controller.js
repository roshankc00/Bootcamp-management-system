import asyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.config.js'
import { validateMongodbId } from '../utils/validateMongoDbId.js';
import CourseModel from '../modals/courses.model.js';
import BootcampModel from '../modals/bootcamp.model.js';
export const addBootcamp=asyncHandler(async(req,res)=>{
    try {
        const {name,description,phone,email,address,careers,averageCost}=req.body
        let uploadedFile=await cloudinary.v2.uploader.upload(req.file.path);
        const creater=await BootcampModel.create({
            name,description,phone,email,address,averageCost,careers,
            user:req.user._id,
            photo:uploadedFile.secure_url,
            photo_public_id:uploadedFile.public_id
        })      
        res.send(creater)
        
    } catch (error) {
        throw new Error(error)

        
    }
})

// get a single bootcamp
export const getASingleBootcamp=asyncHandler(async(req,res)=>{
    try {
        validateMongodbId(req.params.id)
        const bootcamp=await BootcampModel.findById(req.params.id)
        if(!bootcamp){
            throw new Error("bootcamp not found")
        }
        res.status(200).json({
            sucess:true,
            bootcamp
        }) 
        
    } catch (error) {
        throw new Error(error)
        
    }
})


// delete the bootcamp
export const deleteBootcamp=asyncHandler(async(req,res)=>{
    try {
        validateMongodbId(req.params.id)
        const boot=await BootcampModel.findById(req.params.id)
        if(!boot){
            throw new Error('bootcamp not found')
        }
        if(boot.user.toString!==req.user._id.toString()  || req.user.role !=="admin"){
            throw new Error('you are not authorize to delete this bootcamp')
        }
        // deleting all the courses related to the bootcamp
        const deletedCourse=await CourseModel.deleteMany({bootcamp:boot._id})
         // destroying the image 
         let destoyImg=await cloudinary.v2.uploader.destroy(boot.photo_public_id);
        // deleting the bootcamp
        const deleteBootcamp=await BootcampModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            sucess:true,
            message:"bootcamp deleted sucessfully"
        })
    } catch (error) {
        throw new Error(error)
    }
})


// get all the bootcamp
export const getAllBootcamp=asyncHandler(async(req,res)=>{
    try {
        res.status(200).json(res.filterData)
       
    } catch (error) {
        throw new Error(error)
    }
})



// update the bootcamps
export const updateBootcamp=asyncHandler(async(req,res)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const bootcamp=await BootcampModel.findById(id)
        if(!bootcamp){
            throw new Error("bootcamp not found")
        }
        if(req.user._id.toString()!==bootcamp.user || req.user.role!=='admin'){
            throw new Error("you are not authorize to access this resource")
        }
        const updatedBootcamp=await BootcampModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            sucess:true,
            message:"updated sucessfully",
            updateBootcamp
        })
        
    } catch (error) {
        throw new Error(error)
    }
})


export const changeImage=asyncHandler(async(req,res)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        let boot=await BootcampModel.findById(id)
        if(!boot){
            throw new Error("bootcamp not found")
        }
        if(boot.user.toString!==req.user._id.toString()  || req.user.role !=="admin"){
            throw new Error('you are not authorize to delete this bootcamp')
        }
        // destroying the previous image 
        let destoyImg=await cloudinary.v2.uploader.destroy(boot.photo_public_id);
        // inserting the new image 
        let uploadedFile=await cloudinary.v2.uploader.upload(req.file.path);
        boot.photo=uploadedFile.secure_url,
       boot.photo_public_id=uploadedFile.public_id
       await boot.save()
       res.status(200).json({
        sucess:true,
        message:"image updated",
        updatedBootcamp:boot
       })        
    } catch (error) {
        throw new Error(error)
        
    }

})