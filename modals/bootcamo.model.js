import mongoose from "mongoose";
import { ValidationMessage } from "../constants/Validationmessage";

const bootcampSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,ValidationMessage.REQUIRE_NAME_MESSAGE],
        unique:true,
        trim:true,
        minlength:[5,ValidationMessage.MIN_LENGTH_MESSAGE]
    },
    slug:string,
    description:{
        type:String,
        required:[true,ValidationMessage.REQUIRE_DESCRIPTION_MESSAGE],
        maxlength:[500,ValidationMessage.MAX_LENGTH_MESSAGE]
    },
    website:{
        type:String,
        match:[
            / https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*) /,
            ValidationMessage.VALID_WEBSITE_MESSAGE  
        ]
    },
    phone:{
        type:Number,
        max:[20,ValidationMessage.VALID_PHONE_MESSAGE]
    },
    email:{
        type:String,
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            ValidationMessage.VALID_EMAIL_MESSAGE
        ],
        required:[true,ValidationMessage.VALID_EMAIL_MESSAGE]
    },
    address:{
        type:String,
        required:[true,ValidationMessage.REQUIRED_ADDRESS_MESSAGE]
    },
    careers:{
        type:String,
        required:[true,ValidationMessage.REQUIRED_CARRER_MESSAGE],
        enum:[
            'Web Development',
            "Mobile Development",
            "UI/UX",
            "Data Science",
            "Artificial Intelligence",
            "others"
        ]
    },
   averageRating:{
    type:Number,
    min:[1,ValidationMessage.MIN_RATING_MESSAGE],
    max:[1,ValidationMessage.MAX_RATING_MESSAGE]
   }

})


