import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../modals/usermodal.js';

export const authMiddleware=asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers?.authorization?.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1]
        try{
            if(token){
                const decorded=jwt.verify(token,process.env.SECRET)
                const user=await User.findById(decorded?.id)
                req.user=user
                next()
            }
        }
        catch(error){
            throw new Error("Not authorized please Login again")
            
        }
    }else{
        throw new Error("There is no token attach to the header")
        
    }
})



export const checkRole=(...roles)=>asyncHandler((req,res,next)=>{
    if(roles.includes(req.user.role)){
        next()
    }else{
        throw new Error("you are not authorize to access this resource")
    }

})


