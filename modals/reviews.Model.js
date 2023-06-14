import mongoose from "mongoose";
import { ValidationReviewMessage } from "../constants/Validationmessage";

const reviewSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,ValidationReviewMessage.REQUIRED_TITLE_MESSAGE],
        maxlength:[60,ValidationReviewMessage.VALID_TITLE_MESSAGE]
    },
    description:{
        type:String,
        trim:true,
        required:[true,ValidationReviewMessage.REQUIRED_DESCRIPTION_MESSAGE],
        maxlength:[500,ValidationReviewMessage.VALID_DESCRIPTION_MESSAGE]
    },
    rating:{
        type:Number,
        min:[1,ValidationReviewMessage.MIN_RATING_MSSAGE],
        max:[10,ValidationReviewMessage.MAX_RATING_MESSAGE],
        required:[true,ValidationReviewMessage.MAX_RATING_MESSAGE]
    },
    bootcamp:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bootcamp",
        required: [true,ValidationReviewMessage.REQUIRED_BOOTCAMP_MESSAGE]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,ValidationReviewMessage.REQUIRED_USER_MESSAGE]
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    }
},{timestamps:true})


const Review=mongoose.model('Review',reviewSchema)