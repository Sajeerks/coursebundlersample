import jwt from 'jsonwebtoken'
import { catchAsyncError } from './catchAsyncError.js'
import ErrorHandler from '../utils/ErrorHandler.js'
import { User } from '../models/userModel.js'

export const isAuthenticated = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies
    if(!token) return next(new ErrorHandler("not logged in ", 401))

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    req.user = await User.findById(decoded._id)

    next()
})









export const authorisedAdmin = (req, res, next)=>{
    // console.log("i m hereeeeeeeeeeeeeee");
    // console.log("req.user.ROEL == " + req.user.role);
    if(req.user.role !=="admin")  return next (new ErrorHandler(`${req.user.role}  is not allowed to acces this rescource`, 403))

    next()
}

export const authorizeSubscribers = (req, res, next)=>{
    // console.log("i m hereeeeeeeeeeeeeee");
    // console.log("req.user.ROEL == " + req.user.role);
    // console.log("req.user.subscription.status="+req.user.subscription.status);
    // console.log("req.user.role=="+req.user.role);
    if (req.user.subscription.status !=="active" &&  req.user.role !=="admin") {
     
     return next (new ErrorHandler(`only subsriners can access this rescource`, 403))
    }
 

    next()
}