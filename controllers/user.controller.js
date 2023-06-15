import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../modals/usermodal.js'

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
       res.send(resetToken)

        
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


