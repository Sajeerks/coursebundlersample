import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes}  from 'react-router-dom'
import Home from "./components/Home/Home.js"
import Courses from './components/videos/Courses.js';
import Header from './components/Layout/Header.js';
import Footer from './components/Layout/Footer/Footer.js';
import Login from './components/Auth/Login.js';
import Register from './components/Auth/Register.js';
import ForgotPassword from './components/Auth/ForgotPassword.js';
import ResetPassword from './components/Auth/ResetPassword.js';
import Contact from './components/Contact/Contact.js';
import Request from './components/Request/Request.js';
import About from './components/About/About.js';
import Subscribe from './components/Payment/Subscribe.js';
import NotFound from './components/Layout/NotFound/NotFound.js';
import PaymentFail from './components/Payment/PaymentFail.js';
import PaymentSuccess from './components/Payment/PaymentSuccess.js';
import CoursePage from './components/CoursePage/CoursePage.js';
import Profile from './components/Profile/Profile.js';
import UpdateProfile from './components/Profile/UpdateProfile.js';
import ChangePassword from './components/Profile/ChangePassword.js';
import Dashboard from './components/Admin/Dashboard/Dashboard.js';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse.js';
import Users from './components/Admin/Users/Users.js';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses.js';
import { useSelector } from 'react-redux';
import {ProtectedRoute} from "protected-route-react"
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loadUserAction } from './redux/actions/userActions.js';
import Loader from './components/Loader/Loader.js';


 

function App() {
   window.addEventListener("contextmenu",(e)=>{
    e.preventDefault()
   })


   const {isAuthenticated, user, message, error, loading} = useSelector(state=>state.user)
   const dispatch = useDispatch()
   useEffect(() => {
  
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }

    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
   }, [dispatch, error, message])
   

   useEffect(() => {

 dispatch( loadUserAction())
   }, [dispatch])
   

  return (
    <Router>
       {
        loading?(<Loader/>):(

          <>
           <Header isAuthenticated={isAuthenticated} user={user}/>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/login" element={
         <ProtectedRoute
        isAuthenticated={!isAuthenticated}
          redirect ="/profile"
         >
           <Login/>
         </ProtectedRoute>
   
        
        }/>



        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/course/:id" element={<CoursePage/>}/>
        <Route path="/profile" element={<ProtectedRoute
        isAuthenticated={isAuthenticated}
        >
          <Profile user={user}/></ProtectedRoute> }/>
        <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile/></ProtectedRoute>}/>
        <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword/></ProtectedRoute>}/>






        <Route path="/register" element={<ProtectedRoute
         isAuthenticated={!isAuthenticated}
         redirect="/profile"
        >

          <Register/>
        </ProtectedRoute>}/>
        <Route path="/forgotpassword" element={<ProtectedRoute
          isAuthenticated={!isAuthenticated}
          redirect="/profile"
        
        ><ForgotPassword/> </ProtectedRoute>}/>
        <Route path="/resetpassword/:token" element={<ProtectedRoute
         isAuthenticated={!isAuthenticated}
         redirect="/profile"
        >
          <ResetPassword/>
          </ProtectedRoute>}/>
        <Route path="/request" element={<Request/>}/>
        <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe/></ProtectedRoute>}/>

        <Route path="*" element={<NotFound/>}/>
        <Route path="/paymentfail" element={<PaymentFail/>}/>
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}/>


{/* adin routers */}

<Route path="/admin/dashboard" element={<ProtectedRoute adminRoute ={true}  isAuthenticated={isAuthenticated}  isAdmin={user && user.role==="admin"} redirect="/profile"><Dashboard/></ProtectedRoute>}/>
<Route path="/admin/createcourse" element={<ProtectedRoute adminRoute ={true}  isAuthenticated={isAuthenticated}  isAdmin={user && user.role==="admin"} redirect="/profile"><CreateCourse/></ProtectedRoute>}/>
<Route path="/admin/users" element={<ProtectedRoute adminRoute ={true}  isAuthenticated={isAuthenticated}  isAdmin={user && user.role==="admin"} redirect="/profile"><Users/></ProtectedRoute>}/>
<Route path="/admin/courses" element={<ProtectedRoute adminRoute ={true}  isAuthenticated={isAuthenticated}  isAdmin={user && user.role==="admin"} redirect="/profile"><AdminCourses/></ProtectedRoute>}/>

        





        


       </Routes>
<Footer/>
<Toaster/>
          </>

        )

       }
    </Router>
  );
}

export default App;


/// paymentsuccesspage
// payment fail page
// page not found
//  coursedetal page
//  subscrobe page
