import mongoose from "mongoose";
import { ValidationUserMessage } from "../constants/Validationmessage.js";
import bcrypt from 'bcryptjs'
import crypto from 'node:crypto'

const userSchema=mongoose.Schema({
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


userSchema.pre("save",async function(next){
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordMatched=async function (enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password)
}
userSchema.methods.getResetToken=function(){
    const resetToken=crypto.randomBytes(10).toString("hex")
    this.resetPasswordToken=crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
    // 10minutes 
    this.resetPasswordExpire=Date.now()+10*60*1000;
    return resetToken
}


const User=mongoose.model("User",userSchema)

export default User  