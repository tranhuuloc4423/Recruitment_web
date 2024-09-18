import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
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
  signinStart,
  signinSuccess,
  signinFailed,
  signupStart,
  signupSuccess,
  signupFailed
} = authSlice.actions

export default authSlice.reducer
