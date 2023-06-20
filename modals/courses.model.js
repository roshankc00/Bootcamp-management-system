import mongoose from "mongoose";
import { ValidationCourseMessage } from "../constants/Validationmessage";

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,ValidationCourseMessage.REQUIRED_TITLE_MESSAGE],
        maxlength:[60,ValidationCourseMessage.VALID_TITLE_MESSAGE]
    },
    description:{
        type:String,
        trim:true,
        required:[true,ValidationCourseMessage.REQUIRED_DESCRIPTION_MESSAGE],
        maxlength:[500,ValidationCourseMessage.VALID_DESCRIPTION_MESSAGE]
    },
    content:[{
        type:String,
        required:[true,ValidationCourseMessage.REQUIRED_Content_MESSAGE]
    }],
    weeks:{
        type:String,
        required:[true,ValidationCourseMessage.REQUIRED_Week_MESSAGE]
    },
    minimumSkills:{
        type:String,
        required:[true,ValidationCourseMessage.REQUIRED_MINIMUMSKILL_MESSAGE],
        enum:['beginner','intermidiate','advanced']
    },
    scholarshipAvailable:{
        type:String,
        default:false
    },
    bootcamp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bootcamp",
        required:[true,ValidationCourseMessage.REQUIRED_BOOTCAMP_MESSAGE]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,ValidationCourseMessage.REQUIRED_USER_MESSAGE]
    }
},{timestamps:true})


const CourseModel=mongoose.model('Course',courseSchema)
export default CourseModel
