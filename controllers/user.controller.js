import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../modals/usermodal.js'
import nodemmailer from 'nodemailer'
import  sendEmail  from '../utils/sendEmail.js'
import crypto from 'crypto'
export const  registerme=asyncHandler(async(req,res)=>{
    const {email}=req.body
try {
    const findUser=await User.findOne({email:email})
    if(!findUser){
        
        const newUser=await User.create(req.body)
        const token =jwt.sign({id:newUser._id},process.env.SECRET)
        res.status(200).json({
            sucess:true,
            message:"user has been created sucessfully",
            token
        })
    }else{
        throw new Error("user Already Exists")
    }     
} catch (error) {
    throw new Error(error)
}
})


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    // check if User exists
    const findUser=await User.findOne({email})
    if(!findUser){
        throw new Error("user doesnt exists")
    }
    const isTrue=await findUser.isPasswordMatched(password)
    if(!isTrue){
        throw new Error("password doesnt match")
    }
    const token =jwt.sign({id:findUser._id},process.env.SECRET)
    res.status(200).json({
        sucess:true,
        message:"user has been created sucessfully",
        token
    })
    if(findUser && await findUser.isPasswordMatched(password)){
        res.status(200).json({
            status:true,
            message:"logged In sucessfully",
            findUser
        })
        
    }else{
        throw new Error("invalid credentials")
    }

})



export const forgetPassword=asyncHandler(async(req,res)=>{
    try {
        const {email}=req.body
        const user=await User.findOne({email})
        if(!user){
            throw new Error("email doesnt match")
        }
      let resetToken=user.getResetToken();
      await user.save()
      const resetUrl=`${req.protocol}://${req.get("host")}/api/v1/user/resetpassword/${resetToken}`
        const message=`Reset Your password on clicking:\n ${resetUrl} `
        try {
            
            await sendEmail({
                email:user.email,
                subject:"reset the password",
                message 
            })
            
        } catch (error) {
            user.resetPasswordToken=undefined
            user.resetPasswordExpire=undefined
            await user.save()
            console.log(user)
        }
            res.status(200).json({
                sucess:true,
                message:"mail sent sucessfully"
            })
    } catch (error) {    
        throw new Error(error)
    }
})

export const resetPassword=asyncHandler(async(req,res)=>{
    try {
        const {password,conformPassword}=req.body
        if(password!==conformPassword){
            throw new Error('password and conform password doesnt match')
        }
        const resetToken=req.params.token
        let tokenmat=crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
        console.log(tokenmat)

       let  user=await User.findOne({resetPasswordToken:tokenmat,resetPasswordExpire:{$gt:Date.now()}})
       if(user){
           user.password=password
           user.resetPasswordToken=undefined
           user.resetPasswordExpire=undefined
           await user.save()
           res.status(200).json({
            sucess:true,
            message:"password changed sucessfully"
           })
           
        }else{
            user.resetPasswordToken=undefined
            user.resetPasswordExpire=undefined
            await user.save()
            res.status(400).json({
                sucess:false,
                message:"reset password time expire or wrong token "
            })

        }
       
        
    } catch (error) {
  
        throw new Error(error)

        
    }
})








export const getme=asyncHandler(async(req,res)=>{
    try {
        const user=req.user
        if(!user){
            throw new Error("please login first")
        }
        res.status(200).json({
            sucess:true,
            user
        })
    } catch (error) {
        
        throw new Error(error)

        
    }
})


// get a single user 
export const getASingleUser=asyncHandler(async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        if(!user){
            throw new Error("user doesnt exists")
        }
        res.status(200).json({
            sucess:true,
            user
        })
    } catch (error) {
        throw new Error(error)
        
    }
})


export const  AllUsers=async(req,res)=>{
    try {
        let users=await User.find({})
        res.status(200).json({
            sucess:true,
            users
        })
    } catch (error) {
        throw new Error(error)
        
    }
}


