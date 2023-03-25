import express from "express";
import { isAuthenticated, authorizeSubscribers, authorisedAdmin } from "../middlewares/auth.js";
import { contact, courseRequest,getDashboardStats } from "../controllers/otherController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router()

router.route("/contact").post( contact)
router.route("/courseRequest").post(courseRequest)

router.route("/admin/stats").get(isAuthenticated, authorisedAdmin, getDashboardStats)








export default router