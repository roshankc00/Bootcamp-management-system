import { registerme } from "../controllers/user.controller.js"
import User from '../modals/usermodal.js'

 describe('register',()=>{
    it('should create a new user email is not registered',async()=>{

        const req ={
            body:{
                name:"Roshan karki",
                email:"karki343@gmail.com",
                password:"ee#r4Rkdmc"
            }
        }
        const res={
            status: jest.fn().mockReturnThis(),
            json:  jest.fn()
        }
        User.findOne=jest.fn().mockResolveValue(null);
        User.prototype.save=jest.fn().mockResolveValue();

        await registerme(req,res)

        expect(User.findOne).toHaveBeenCalledWith({email:req.body.email})
        expect(User.prototype.save).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(200);
        except(req.json).toHaveBeenCalledWith({
            status:true,
            message:"user has been created sucessfully"
        });

        


        
    })
    



 })