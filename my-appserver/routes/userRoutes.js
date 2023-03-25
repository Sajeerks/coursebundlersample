import express from "express";
import { getAllUsers,addToPlaylist,removeFromPlayist, register,login,logout,
   
    updateUserRole,deleteUser,deleteMyself,
    getMyProfile,changePassword ,resetPassword,updateProfile,forgotPassword, updateProfilePicture} from "../controllers/userController.js";
import { authorisedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";


const router = express.Router()

// router.route("/users").get(getAllUsers)

router.route("/register").post(singleUpload, register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticated, getMyProfile).delete(isAuthenticated,deleteMyself)
router.route("/changepassword").put(isAuthenticated, changePassword)
router.route("/updateprofile").put(isAuthenticated, updateProfile)
router.route("/updateprofilepicture").put(singleUpload,isAuthenticated, updateProfilePicture)


router.route("/forgotpassword").post( forgotPassword)
router.route("/resetpassword/:token").put( resetPassword)
router.route("/addtoplaylist").post( isAuthenticated, addToPlaylist)
router.route("/removefromplaylist").delete( isAuthenticated, removeFromPlayist)


router.route("/admin/users").get( isAuthenticated, authorisedAdmin, getAllUsers)

router.route("/admin/user/:id").put( isAuthenticated, authorisedAdmin, updateUserRole).delete(

    isAuthenticated, authorisedAdmin, deleteUser

)

















export default router