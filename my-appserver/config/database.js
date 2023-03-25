import mongoose, { mongo } from "mongoose";

export const connectDB =  async()=>{
   const {connection } =   await mongoose.connect(process.env.MONGO_URI)

   console.log(`mongoDB connected with connection ${connection.host}`);
}

