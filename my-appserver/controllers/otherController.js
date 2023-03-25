import { catchAsyncError } from "../middlewares/catchAsyncError.js"

import ErrorHandler from "../utils/ErrorHandler.js"
import getDataUri from "../utils/dataUri.js"
import { sendEmail } from "../utils/sendEmail.js"

import { Stats } from "../models/statModel.js"



export const contact =   catchAsyncError  (async (req, res, next) =>{
 
    
  const {name,  email , message} = req.body  


  
// 

  console.log({name,  email , message});
 const to   = process.env.MY_MAIL
const subject = "contact fron courseBunder" 
const text = `I am ${name} and muy emal is ${email} \n${message}s`

await sendEmail(to, subject, text)



  res.status(200).json({
      success:true,
      message:"your message has been send  "+name + email + message
  })
    
  })

  

export const courseRequest =   catchAsyncError  (async (req, res, next) =>{
   
    const {name,  email , course} = req.body  
 const to   = process.env.MY_MAIL
const subject = "request for a course from courseBunder" 
const text = `I am ${name} and muy emal is ${email} \n${course}`

await sendEmail(to, subject, text)

  res.status(200).json({
      success:true,
      message:"your requesr has been send  "
  })

    
 
      
    })
    

      

export const getDashboardStats =   catchAsyncError  (async (req, res, next) =>{
   const stats = await Stats.find({}).sort({createdAt:"desc"}).limit(12)

   const statsData = [ ]

   for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i])
    
   }
   const requiredSize = 12-stats.length
 
   
   for (let i = 0; i < requiredSize; i++) {
   
    statsData.unshift({
        users:0,
        subscriptions:0, 
        views:0
    })
    
   }
  
   const userCount = statsData[11].users
   const subscriptionsCount = statsData[11].subscriptions
   const viewsCount = statsData[11].views
   let userProfit = true, viewsProfit = true, subscriptionProfit = true
   let userPercentage = 0, viewsPercentage = 0, subscriptionPercentage = 0
   if(statsData[10].users ===0 ) userPercentage = userCount*100
   if(statsData[10].views ===0 ) viewsPercentage = viewsCount*100
   if(statsData[10].subscriptions ===0 ) subscriptionPercentage = subscriptionsCount*100
   else{
    const difference = {
        users:statsData[11].users-statsData[10].users,
        views:statsData[11].views-statsData[10].views,
        subscriptions:statsData[11].subscriptions-statsData[10].subscriptions,

    }
    userPercentage = (difference.users/statusbar[10].users)
    viewsPercentage = (difference.views/statusbar[10].views)
    subscriptionPercentage = (difference.subscriptions/statusbar[10].subscriptions)
    if(userPercentage <0) userProfit = false
    if(viewsPercentage <0) viewsProfit = false
    if(subscriptionPercentage <0) subscriptionProfit = false


   }


   
   
   


    
    res.status(200).json({
        success:true,
        stats:statsData,
        viewsCount,
        subscriptionsCount,
        userCount,
        userPercentage,
        subscriptionPercentage, 
        viewsPercentage,
        viewsProfit, 
        userProfit, 
        subscriptionProfit
    })
      
    })