import mongoose from "mongoose";
import { ValidationUserMessage } from "../constants/Validationmessage";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,ValidationUserMessage.REQUIRED_Name_MESSAGE],
        min:[3,ValidationUserMessage.VALID_NAME_MESSAGE]

    },
    email:{
        type:String,
        required:[true,ValidationUserMessage.REQUIRED_Email_MESSAGE],
        unique:[true,ValidationUserMessage.UNIQUE_EMAIL_MESSAGE]
    },
    role:{
        type:String,
        default:"user",
        enum:['user',"publisher"],
        },
    password:{
        type:String,
        required:[true,ValidationUserMessage.REQUIRED_Name_MESSAGE],
        match:[
            /"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"/,
            ValidationUserMessage.VALID_PASSWORD_MESSAGE
        ]
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User