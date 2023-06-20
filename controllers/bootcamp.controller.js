import asyncHandler from 'express-async-handler'
import cloudinary from '../config/cloudinary.config.js'
import Bootcamp from '../modals/bootcamp.model.js';
import { validateMongodbId } from '../utils/validateMongoDbId.js';
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

// get a single bootcamp
export const getASingleBootcamp=asyncHandler(async(req,res)=>{
    try {
        validateMongodbId(req.params.id)
        const bootcamp=await Bootcamp.findById(req.params.id)
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
        const boot=await Bootcamp.findById(req.params.id)
        if(!boot){
            throw new Error('bootcamp not found')
        }
        if(boot.user.toString!==req.user._id.toString()  || req.user.role !=="admin"){
            throw new Error('you are not authorize to delete this bootcamp')
        }
        const deleteBootcamp=await Bootcamp.findByIdAndDelete(req.params.id)
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
        let query; 
        const reqQuery={...req.query}
        // fields to remove 
        const removeFields=['select','sort']
        removeFields.forEach(param=>delete reqQuery[param]) 


        

        // filtering 
        let queryStr=JSON.stringify(reqQuery)
        query= queryStr.replace(/\b(gt|gte|lt|lte|eq|ne|in)\b/g,match=>`$${match}`)
        query=JSON.parse(query)
        let appendFiterQuery= Bootcamp.find(query)
        
        // selecting the fields 
        if(req.query.select){
            const fields=req.query.select.split(',').join(' ');
            console.log(fields)
            appendFiterQuery=   appendFiterQuery.select(fields)
        }

        // sorting
        if(req.query.sort){
            const fields=req.query.select.split(',').join(' ');
            console.log(fields)
            appendFiterQuery=   appendFiterQuery.sort('-averageCost')
        }else{
            appendFiterQuery=   appendFiterQuery.sort('-createdAt')
          
        }








        let bootcamps=await appendFiterQuery;
        
        res.send(bootcamps)

       
    } catch (error) {
        throw new Error(error)
    }
})







// filtering searching AND PEGINATION IS HERE D
// thanks for the details and details 