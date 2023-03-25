import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { User } from "../models/userModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import {instance} from '../server.js'
import crypto from "crypto"
import { Payment } from "../models/PaymentModel.js"




export const paymentVerification = catchAsyncError(async (req, res, next)=>{

const {razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature}  = req.body

const user = await User.findById(req.user._id)
const subscription_id = user.subscription.id 
const generated_signature  = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                             .update(razorpay_payment_id + "|" + subscription_id,"utf-8")
                             .digest("hex")

     const  isAuthentic = generated_signature === razorpay_signature
     
     if(!isAuthentic) return res.redirect(`${process.env.FRONTEND_URL}/paymentfailed`)

     //datatcomes here

     await Payment.create({
        razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature
     })

    user.subscription.status = "active"
    await user.save()

    res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?=${razorpay_payment_id}`)

})

export const bySubscription = catchAsyncError(async (req, res, next)=>{
    const user  = await User.findById(req.user._id)
    if(user.role === "admin") return next(new ErrorHandler("admin need not buy the subsscription ", 400)
    ) 

 const plan_id = process.env.PLAN_ID || "plan_LSv6TNU0DluEn4"


  const subscription =  await   instance.subscriptions.create({
        plan_id: "plan_LSv6TNU0DluEn4",
        customer_notify: 1,
        total_count: 12,

      })

      

      user.subscription.id = subscription.id
      user.subscription.status = subscription.status

      await user.save()

      res.status(201 ).json({
        success:true, 
        subscriptionID:  subscription.id,
        // subscription

      })

})

export const getRazorpayKey = catchAsyncError(async(req, res, next)=>{
    res.status(200 ).json({
        success:true,
        key:process.env.RAZORPAY_KEY
    })
})



export const cancelSubscription = catchAsyncError(async(req, res, next)=>{
    const user  = await User.findById(req.user._id)
    const subscriptionId = user.subscription.id 
     let refund  = false
     await instance.subscriptions.cancel(subscriptionId)

    //  const payment = await Payment.findOne({
    //     razorpay_subscription_id:subscriptionId
    //  })
    //  const gap = Date.now() -payment.createdAt
    //  const refundTime  = process.env.REFUND_DAYS *24* 60*60*1000

    //  if(refundTime>gap){
    //     refund = true
    //     await instance.payments.refund(payment.razorpay_payment_id)
    // }
    // await payment.deleteOne()
    user.subscription.id= undefined
   user.subscription.status = undefined
   await user.save()

    res.status(200 ).json({

        success:true,
      message:  refund?"subsctiption cancelled you will recevie full refund withing 7 days "
      :" subscription cancelled you will not recieve the refund since you cancelled after 7 days of subscribing "
    })
})