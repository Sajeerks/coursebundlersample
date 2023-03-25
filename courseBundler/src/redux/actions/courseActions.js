import { server } from "../store";
import axios from 'axios'



export const getAllCoursesAction = (category="", keyword="")=>async(dispatch)=>{
    try {
        console.log({category});
          dispatch({type:"allCourseRequest"})
          const {data} = await axios.get(`${server}/courses?keyword=${keyword}&?category=${category}` , {
        headers:{
            'Content-Type' :"application/json"
        }, 
        withCredentials:true,
          })
  
          console.log(data);
          dispatch({type:"allCourseSuccess", payload:data.courses})
         
    } catch (error) {
        dispatch({type:"allCourseFail", payload:error.response.data.message})
        
    }
  }