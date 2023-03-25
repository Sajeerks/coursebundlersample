import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/courseModel.js"
import { User } from "../models/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import getDataUri from "../utils/dataUri.js"
import { sendEmail } from "../utils/sendEmail.js"
import { sendToken } from "../utils/sendToken.js"
import crypto from "crypto"
import cloudinary from 'cloudinary'
import { Stats } from "../models/statModel.js"



export const removeFromPlayist = catchAsyncError(async(req, res, next) =>{

  console.log(req.query.id);

  const user = await User.findById(req.user._id)
  const course = await Course.findById(req.query.id)
  if(!course) return next(new ErrorHandler("invalid course", 404))

// const newPlaylist = user.playlist.filter(item=>{
//   if(item.course.toString() !== course._id.toString()) {
//     return item
//   } 
// })
const newPlaylist = user.playlist.filter(item=>
 item.course.toString() !== course._id.toString()
  
  
)

user.playlist = newPlaylist
 await user.save()
    
  res.status(200).json({
   success:true,
    message:`  removed from playlist`
  })

})



export const addToPlaylist = catchAsyncError(async(req, res, next) =>{

 
    
  const user = await User.findById(req.user._id)
  const course = await Course.findById(req.body._id)
  if(!course) return next(new ErrorHandler("invalid course", 404))




  const itemExist =  user.playlist.find((item)=>{
    console.log(item.course.toString());
    console.log( course._id.toString());
  if(item.course.toString() === course._id.toString()) {
    return true
  } 
  
  })

  if(itemExist) return next(new ErrorHandler("course alreat  exists in play list", 409))

 user.playlist.push({
  course:course._id,
  poster:course.poster.url
 })
 await user.save()
    
  res.status(200).json({
   success:true,
    message:`  added to playlist`
  })
    
    })
  


export const forgotPassword = catchAsyncError(async(req, res, next) =>{

const {email } = req.body

     const user = await User.findOne({email})
     if(!user)return next(new ErrorHandler("user not found with this email address ", 400))

     const resetToken = await user.getResetToken()

    
     await user.save()

     //send token via email
     const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

      const message = `click on the link to reset ur password  ${url}  , if you have not requested please ignore`
     await sendEmail(user.email, "courseBundler Reset Password" , message)
  
     res.status(200).json({
      success:true,
       message:`Reset token send to ${user.email}`
     })
  
  })


  export const resetPassword = catchAsyncError(async(req, res, next) =>{

     const {token} = req.params

    const  resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

    const user = await User.findOne({
      resetPasswordToken, 
      resetPasswordExpire:{
        $gt:Date.now()
      }
    })

    if(!user) return next(new ErrorHandler("token is invalid or has been expired"))

  user.password   = req.body.password
   user.resetPasswordToken = undefined
   user.resetPasswordExpire = undefined

   await user.save()

     res.status(200).json({
      success:true,
       message:"password updated successfully",
       
     })
  
  })


export const updateProfilePicture = catchAsyncError(async(req, res, next) =>{


  const user = await User.findById(req.user._id)
  const file  = req.file
  const fileUri = getDataUri(file)
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content )

await cloudinary.v2.uploader.destroy(user.avatar.public_id)

user.avatar = {
  public_id:mycloud.public_id,
  url:mycloud.secure_url
}

await user.save()
   res.status(200).json({
    success:true,
     message:"profile PICture Changed successfully"
   })

})


export const updateProfile = catchAsyncError(async(req, res, next) =>{

    const {name, email} = req.body


    const user  = await User.findById(req.user._id)
  if(name) user.name = name
  if(email) user.email = email


await user.save()

   res.status(200).json({
    success:true,
     message:"Profile Changed successfully"
   })

})




export const changePassword = catchAsyncError(async(req, res, next) =>{

     const {oldPassword, newPassword} = req.body
     if(  !oldPassword ||  ! newPassword ){
        return next(new ErrorHandler("Please enter all fields ",  400 ))
    }

     const user  = await User.findById(req.user._id).select("+password")

     const isMatch = await user.comparePassword(oldPassword)

     if(!isMatch) return next(new ErrorHandler(" incorrect old pasword " ,  401))
     
user.password = newPassword

await user.save()

    res.status(200).json({
     success:true,
      message:"password Changed successfully"
    })
 
 })

export const getMyProfile = catchAsyncError(async(req, res, next) =>{
       

    const user  = await User.findById(req.user._id)

    // console.log(user);

    res.status(200).json({
     success:true,
      user
    })
 
 })


export const logout = catchAsyncError(async(req, res, next) =>{

   res.status(200 ).cookie("token", null , {
    expires:new Date(Date.now()),
    httpOnly:true, 
    secure:true, // dont add whidle using localhost
    sameSite:"none",
    
   }).json({
    success:true,
    message:"logged out  sucessfuly "
   })

})

export const login = catchAsyncError(async(req, res, next) =>{
    const {  email , password }  = req.body 



    // const file = req.file

if(  !email ||  ! password ){
    return next(new ErrorHandler("Please enter all fields ",  400 ))
}

const user  = await User.findOne({email}).select("+password")
if(!user) return next(new ErrorHandler("user does not  exisits" ,  401))
     

const isMatch = await user.comparePassword(password)

if(!isMatch) return next(new ErrorHandler(" incorrect email or pasword " ,  401))



sendToken(res, user, `welcome back ${user.name}`, 201)

})







export const register = catchAsyncError(async(req, res, next) =>{
        const { name , email , password }  = req.body 

 

        const file  = req.file


    if(!name ||  !email ||  !password || !file ){
        return next(new ErrorHandler("Please enter all fields ",  400 ))
    }
   
    let user  = await User.findOne({email})
    if(user) return next(new ErrorHandler("user already exisits" ,  409))
         

  const fileUri = getDataUri(file)
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content )


 user = await  User.create({
    name , 
    email, 
    password , 
    avatar:{
        public_id :mycloud.public_id, 
        url:mycloud.secure_url
    }
 })

 sendToken(res, user, "user created succesfully ", 201)

    })




export const getAllUsers = catchAsyncError(async(req, res, next) =>{
    


  const users = await User.find({})


  res.status(200).json({
    success:true,
     users
   })
      
    })

    
    export const updateUserRole = catchAsyncError(async(req, res, next) =>{
    

     const {id} = req.params
      const user = await User.findById(id)
      if(req.user._id.toString() === id.toString()){
        return next(new ErrorHandler("a current admin logged in cannot change itsef to user", 405))
      }
    
   if( user.role === "user")  user.role = "admin"
   else  user.role = "user"
        
      
       await user.save()
    
    
      res.status(200).json({
        success:true,
         message :"role thee user  is change successufllye"
       })
          
        })
    

        

        export const deleteUser = catchAsyncError(async(req, res, next) =>{
    

          const {id} = req.params
           const user = await User.findById(id)
     
     if(!user) return next(new ErrorHandler(`user with the ID -${id }  does not extist` ,  404))
           
   await cloudinary.v2.uploader.destroy(user.avatar.public_id)  
         await user.deleteOne()
         
           res.status(200).json({
             success:true,
              message :`user with the ID -${id } delted successfully `
            })
               
             })
         

             
        export const deleteMyself = catchAsyncError(async(req, res, next) =>{
    

      
           const user = await User.findById(req.user._id)
     
 
           
   await cloudinary.v2.uploader.destroy(user.avatar.public_id)  


         await user.deleteOne()
         
           res.status(200).cookie("token", null,{
            expires:new Date(Date.now())
           }).json({
             success:true,
              message :`u delted urself  `
            })
               


             })
         

User.watch().on("change" , async()=>{
  const stats = await Stats.find({}).sort({createdAt :"desc"}).limit(1)

  const subscription = await User.find({"subscription.status":"active"})
  stats[0].users = await User.countDocuments()
  stats[0].subscriptions = subscription.length
  stats[0].createdAt = new Date(Date.now())
 console.log(" stats[0].createdAt==="+ stats[0].createdAt)
  await stats[0].save()
})


