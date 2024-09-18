import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {
      email: null,
      password: null,
      role: null
    },
    signin: {
      currentUser: null,
      isFetching: false,
      error: false
    },
    signup: {
      isFetching: false,
      success: false,
      error: false
    }
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser.email = action.payload.email
      state.currentUser.password = action.payload.password
      state.currentUser.role = action.payload.role
    },
    setSignOutUser: (state) => {
      localStorage.removeItem('currentUser')
      state.currentUser.email = null
      state.currentUser.password = null
      state.currentUser.role = null
    },
    signinStart: (state) => {
      state.signin.isFetching = true
    },
    signinSuccess: (state, action) => {
      state.signin.isFetching = false
      state.signin.currentUser = action.payload
      state.signin.error = false
      console.log(action.payload)
    },
    signinFailed: (state) => {
      state.register.error = true
      state.register.isFetching = false
    },
    signupStart: (state) => {
      state.signup.isFetching = true
    },
    signupSuccess: (state) => {
      state.signup.isFetching = false
      state.signup.error = false
      state.signup.success = true
    },
    signupFailed: (state) => {
      state.signup.error = true
      state.signup.isFetching = false
      state.signup.success = false
    }
  }
})

export const {
  setCurrentUser,
  setSignOutUser,
  signinStart,
  signinSuccess,
  signinFailed,
  signupStart,
  signupSuccess,
  signupFailed
} = authSlice.actions

export default authSlice.reducer
