import { createReducer } from "@reduxjs/toolkit";





export const courseReducer = createReducer({courses:[]},{
  allCourseRequest:(state)=>{
    state.loading = true
  },
  allCourseSuccess:(state, action)=>{
    state.loading = false
    state.courses = action.payload

  },
  allCourseFail:(state, action)=>{
    state.loading = false
    state.error = action.payload

  },



  clearError:state=>{
    state.error = null
    state.loading = false
  },
  clearMessage:state=>{
    state.message = null
    state.loading = false

  }



})
  