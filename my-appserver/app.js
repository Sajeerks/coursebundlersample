import express from "express";

import { config } from 'dotenv';
import cookieParser from "cookie-parser";

config({
    path:'./config/config.env'
})


const app = express()
// using middleeares
app.use(express.json())
app.use(express.urlencoded(
  { extended:true}
))
app.use(cookieParser())
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET", "POST", "PUT" , "DELETE"],
  
}))


import courseRouter from  "./routes/courseRoutes.js"
import userRouter from  "./routes/userRoutes.js"
import ErrorMidddleware from "./middlewares/Error.js";
import payment from "./routes/paymentRoutes.js"
import other from "./routes/otherRoutes.js"
import cors from "cors"




app.use("/api/v1",courseRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",payment)
app.use("/api/v1",other)





export default app
app.get("/", (req,res)=>res.send(`<h1>site is  is working <a href=${process.env.FRONTEND_URL}>click here</a> to visit forne ene</h1>`))

app.use(ErrorMidddleware)