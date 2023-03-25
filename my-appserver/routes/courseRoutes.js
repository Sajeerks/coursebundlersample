import express from "express";
import { getAllCourses,createcourse ,getCourseDetail,addLecture
,deleteCourse, deleteLecture

} from "../controllers/courseController.js";
import {isAuthenticated, authorisedAdmin,authorizeSubscribers} from "../middlewares/auth.js"
import singleUpload from "../middlewares/multer.js";

const router = express.Router()

router.route("/courses").get(getAllCourses)
router.route("/createcourse").post(isAuthenticated,authorisedAdmin, singleUpload, createcourse)
router.route("/course/:id").get( isAuthenticated, authorizeSubscribers , getCourseDetail).post( isAuthenticated, singleUpload, addLecture)
.delete( isAuthenticated, authorisedAdmin, deleteCourse)

router.route("/lecture").delete(isAuthenticated,authorisedAdmin,deleteLecture) 







export default router