import mongoose from "mongoose";

export const connnectDb=()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("database connected sucessfully")
    }).catch(()=>{
        console.log("unable to connect the database")
    })
}


