import mongoose from "mongoose";
import { ValidationBootcampMessage } from "../constants/Validationmessage.js";
import slugify from "slugify";
const bootcampSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,ValidationBootcampMessage.REQUIRE_NAME_MESSAGE],
        unique:true,
        trim:true,
        minlength:[5,ValidationBootcampMessage.MIN_LENGTH_MESSAGE]
    },
    slug:String,
    description:{
        type:String,
        required:[true,ValidationBootcampMessage.REQUIRE_DESCRIPTION_MESSAGE],
        maxlength:[500,ValidationBootcampMessage.MAX_LENGTH_MESSAGE]
    },
    website:{
        type:String,
        match:[
            / https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*) /,
            ValidationBootcampMessage.VALID_WEBSITE_MESSAGE  
        ]
    },
    phone:{
        type:Number,
        max:[20,ValidationBootcampMessage.VALID_PHONE_MESSAGE],
    },
    email:{
        type:String,
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            ValidationBootcampMessage.VALID_EMAIL_MESSAGE
        ],
        required:[true,ValidationBootcampMessage.VALID_EMAIL_MESSAGE]
    },
    address:{
        type:String,
        required:[true,ValidationBootcampMessage.REQUIRED_ADDRESS_MESSAGE]
    },
    careers:{
        type:String,
        required:[true,ValidationBootcampMessage.REQUIRED_CARRER_MESSAGE],
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
    min:[1,ValidationBootcampMessage.MIN_RATING_MESSAGE],
    max:[1,ValidationBootcampMessage.MAX_RATING_MESSAGE]
   },
   averageCost:{
    type:Number,
    required:true
   },
   photo:{
    type:String
   },
   jobGuarantee:{
    type:Boolean,
    default:false
   },
   jobAssistance:{
    type:Boolean,
    default:false
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
   }

},{timestamps:true}) 




bootcampSchema.pre('save',async function(next){
    this.slug=slugify(this.name.toLowerCase())

})





const Bootcamp=mongoose.model("Bootcamp",bootcampSchema)
export default Bootcamp