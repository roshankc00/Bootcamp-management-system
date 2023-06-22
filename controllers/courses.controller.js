import asyncHandler from 'express-async-handler'
import CourseModel from '../modals/courses.model.js'
import mongoose from 'mongoose'
import { validateMongodbId } from '../utils/validateMongoDbId.js'
import BootcampModel from '../modals/bootcamp.model.js'
export const addCourse=asyncHandler(async(req,res)=>{
    try {
        const {title,description,content,weeks,minimumSkills,bootcamp}=req.body
        console.log("boot")
        let boot=await BootcampModel.findById(bootcamp)
        if(!boot){
            throw new Error("bootcamp doesnt exist so you cant add the courses")
        }
        console.log(boot)
         const course=await CourseModel.create({
            title,
            description,
            content,
            weeks,
            minimumSkills,
            bootcamp:boot._id,
            user:req.user._id
         })
         res.status(200).json({
            sucess:true,
            message:"course added sucessfully",
            course
         })

    } catch (error) {
        throw new Error(error)
        
    }
})


export const getCourse=asyncHandler(async(req,res)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        const course=await CourseModel.findById(id)
        if(!course){
            throw new Error("course not found")
        }
        else{
            res.status(200).json({
                sucess:true,
             course
            })
        }        
    } catch (error) {
        throw new Error(error)
    }
})



export const getAllCourses=asyncHandler(async(req,res)=>{
    try {
        const courses=await CourseModel.find({})
        if(!courses){
            throw new Error("courses not found")
        }
        else{
            res.status(200).json({
                sucess:true,
                courses
            })
        }
        
    } catch (error) {
        throw new Error(error)
        
    }
})


// export const deleteCourse=await asyncHandler(async(req,res)=>{
//     try {
//         validateMongodbId(req.params.id)
//         const courseExists=await CourseModel.findById(req.params.id)
        
//         if(!courseExists){
//             throw new Error("course doesnt exists")
//         }
//         console.log(req.user)
//         if(req.user.role!=="admin"){
//             console.log("wow")
//         }
//         if(courseExists.user._id.toString()!==req.user._id.toString() || req.user.role==="admin" ){
//         }
      
//         console.log("bhaira")

//         // const course=await CourseModel.findByIdAndDelete(req.params.id)
//         // res.status(200).json({
//         //     sucess:true,
//         //     message:"course deleted sucessfully"
//         // })
//     } catch (error) {
//         throw new Error(error)
        
//     }
// })

