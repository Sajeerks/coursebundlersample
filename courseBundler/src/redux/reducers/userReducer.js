import { createReducer } from "@reduxjs/toolkit";









export const profileReducer = createReducer({},{
  updateProfileRequest:(state)=>{
    state.loading = true
  }, 
  updateProfileSuccess:(state, action)=>{
    state.loading = false
    state.message = action.payload
  }, 

  updateProfileFail:(state, action)=>{
    state.loading = false
    state.error = action.payload

  }, 


  updatePasswordRequest:(state)=>{
    state.loading = true
  }, 
  updatePasswordSuccess:(state, action)=>{
    state.loading = false
    state.message = action.payload
  }, 

  updatePasswordFail:(state, action)=>{
    state.loading = false
    state.error = action.payload

  }, 


  forgotPasswordRequest:(state)=>{
    state.loading = true
  }, 
  forgotPasswordSuccess:(state, action)=>{
    state.loading = false
    state.message = action.payload.message
  }, 

  forgotPasswordFail:(state, action)=>{
    state.loading = false
    state.error = action.payload

  }, 


  resetPasswordRequest:(state)=>{
    state.loading = true
  }, 
  resetPasswordSuccess:(state, action)=>{
    state.loading = false
    state.message = action.payload
  }, 

  resetPasswordFail:(state, action)=>{
    state.loading = false
    state.error = action.payload

  }, 


  updatePictureRequest:(state)=>{
    state.loading = true
  }, 
  updatePictureSuccess:(state, action)=>{
    state.loading = false
    state.message = action.payload
  }, 

  updatePictureFail:(state, action)=>{
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



export const userReducer = createReducer({},{
  registerRequest:(state)=>{
    state.loading = true
  }, 
  registerSuccess:(state, action)=>{
    state.loading = false
    state.isAuthenticated = true
    state.user = action.payload.user
    state.message = action.payload.message
  },
  registerFail:(state, action)=>{
    state.loading = false
    state.isAuthenticated = false
    state.error = action.payload

  },





  loginRequest:(state)=>{
    state.loading = true
  }, 
  loginSuccess:(state, action)=>{
    state.loading = false
    state.isAuthenticated = true
    state.user = action.payload.user
    state.message = action.payload.message
  },
  loginFail:(state, action)=>{
    state.loading = false
    state.isAuthenticated = false
    state.error = action.payload
  },

  logoutRequest:(state)=>{
    state.loading = true
  }, 

  logoutSuccess:(state, action)=>{
    state.loading = false
    state.isAuthenticated = false
    state.user = null
    state.message = action.payload.message
  },

  logoutFail:(state, action)=>{
    state.loading = false
    state.isAuthenticated = false
    state.error = action.payload
  },

  loadUserRequest:(state)=>{
    state.loading = true
  }, 

  loadUserSuccess:(state, action)=>{
    state.loading = false
    state.isAuthenticated = true
    state.user = action.payload
  },

  loadUserFail:(state, action)=>{
    state.loading = false
    state.isAuthenticated = false
    state.error = action.payload
  },

  clearError:state=>{
    state.error = null
  },
  clearMessage:state=>{
    state.message = null
  }


})