import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { bySubscription , paymentVerification, getRazorpayKey,cancelSubscription} from "../controllers/paymentController.js";


const router = express.Router()

// buy subsritpn
router.route("/subscribe" ).get(isAuthenticated, bySubscription)

router.route("/razorpaykey" ).get( getRazorpayKey)
//verify payment and save data to database
router.route("/paymentverification" ).post(isAuthenticated, paymentVerification)
//camcel subscription
router.route("/subscribe/cancel" ).delete(isAuthenticated, cancelSubscription)




export default router