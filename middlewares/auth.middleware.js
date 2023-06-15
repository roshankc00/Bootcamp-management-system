const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler');
const { default: User } = require('../modals/usermodal');


export const authMiddleware=async(req,res,next)=>{
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
}






