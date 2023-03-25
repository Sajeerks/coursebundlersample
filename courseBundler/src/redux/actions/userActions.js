import { server } from "../store";
import axios from 'axios'











export const registerAction = (formdata)=>async(dispatch)=>{
  try {
      // console.log({email, password});
        dispatch({type:"registerRequest"})
        const {data} = await axios.post(`${server}/register` ,formdata, {
      headers:{
          'Content-Type' :"multipart/form-data"
      }, 
      withCredentials:true,
        })

      //   console.log(data);
        dispatch({type:"registerSuccess", payload:data})
       
  } catch (error) {
      dispatch({type:"registerFail", payload:error.response.data.message})
      
  }
}




export const loadUserAction = ()=>async(dispatch)=>{
  try {
      // console.log({email, password});
        dispatch({type:"loadUserRequest"})
        const {data} = await axios.get(`${server}/me`, {
      headers:{
          'Content-Type' :"application/json"
      }, 
      withCredentials:true,
        })

        // console.log(data);
        dispatch({type:"loadUserSuccess", payload:data.user})
       
  } catch (error) {
      dispatch({type:"loadUserFail", payload:error.response.data.message})
      
  }
}











export const loginAction = (email, password)=>async(dispatch)=>{
    try {
        // console.log({email, password});
          dispatch({type:"loginRequest"})
          const {data} = await axios.post(`${server}/login`, {email, password} , {
        headers:{
            'Content-Type' :"application/json"
        }, 
        withCredentials:true,
          })

        //   console.log(data);
          dispatch({type:"loginSuccess", payload:data})
         
    } catch (error) {
        dispatch({type:"loginFail", payload:error.response.data.message})
        
    }
}


export const logoutAction = ()=>async(dispatch)=>{
  try {
      // console.log({email, password});
        dispatch({type:"logoutRequest"})
        const {data} = await axios.get(`${server}/logout`, {
      headers:{
          'Content-Type' :"application/json"
      }, 
      withCredentials:true,
        })

      //   console.log(data);
        dispatch({type:"logoutSuccess", payload:data})
       
  } catch (error) {
      dispatch({type:"logoutFail", payload:error.response.data.message})
      
  }
}
