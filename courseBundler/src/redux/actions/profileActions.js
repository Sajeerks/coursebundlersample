import { server } from "../store";
import axios from 'axios'



export const updateProfileAction = (name, email)=>async(dispatch)=>{
    try {
        // console.log({email, password});
          dispatch({type:"updateProfileRequest"})
          const {data} = await axios.put(`${server}/updateprofile` ,{name, email}, {
        headers:{
            'Content-Type' :"application/json"
        }, 
        withCredentials:true,
          })
  
        //   console.log(data);
          dispatch({type:"updateProfileSuccess", payload:data.message})
         
    } catch (error) {
        dispatch({type:"updateProfileFail", payload:error.response.data.message})
        
    }
  }

  export const updatePasswordAction = (oldPassword, newPassword)=>async(dispatch)=>{
    try {
        // console.log({email, password});
          dispatch({type:"updatePasswordRequest"})
          const {data} = await axios.put(`${server}/changepassword` ,{oldPassword, newPassword}, {
        headers:{
            'Content-Type' :"application/json"
        }, 
        withCredentials:true,
          })
  
        //   console.log(data);
          dispatch({type:"updatePasswordSuccess", payload:data.message})
         
    } catch (error) {
        dispatch({type:"updatePasswordFail", payload:error.response.data.message})
        
    }
  }


  export const updateProfilePictureAction = (formdata)=>async(dispatch)=>{
    try {
        // console.log({email, password});
          dispatch({type:"updatePictureRequest"})
          const {data} = await axios.put(`${server}/updateprofilepicture` ,formdata, {
        headers:{
            'Content-Type' :"multipart/form-data"
        }, 
        withCredentials:true,
          })
  
        //   console.log(data);
          dispatch({type:"updatePictureSuccess", payload:data.message})
         
    } catch (error) {
        dispatch({type:"updatePictureFail", payload:error.response.data.message})
        
    }
  }


  
export const forgotPasswordAction = (email)=>async(dispatch)=>{
    try {
        // console.log({email, password});

        const config = {
            headers:{
                'Content-Type' :"application/json"
            }, 
            withCredentials:true,
              }
          dispatch({type:"forgotPasswordRequest"})
          console.log(email);
          const {data} = await axios.post(`${server}/forgotpassword` ,{email},{
            headers:{
                'Content-Type' :"application/json"
            }, 
            withCredentials:true,
              } )
  
          console.log(data);
          dispatch({type:"forgotPasswordSuccess", payload:data})
         
    } catch (error) {
        dispatch({type:"forgotPasswordFail", payload:error.response.data.message})
        
    }
  }



  export const resetPasswordAction = (token, password)=>async(dispatch)=>{
    try {
        // console.log({email, password});
          dispatch({type:"resetPasswordRequest"})
          const {data} = await axios.put(`${server}/resetpassword/${token}` ,{password}, {
        headers:{
            'Content-Type' :"application/json"
        }, 
        withCredentials:true,
          })
  
        //   console.log(data);
          dispatch({type:"resetPasswordSuccess", payload:data.message})
         
    } catch (error) {
        dispatch({type:"resetPasswordFail", payload:error.response.data.message})
        
    }
  }