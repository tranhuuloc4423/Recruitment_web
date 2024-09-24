import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: {},
    token: null,
    signin: {
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
      state.currentUser = action.payload
    },
    setSignOutUser: (state) => {
      localStorage.removeItem('currentUser')
      state.currentUser = null
    },
    signinStart: (state) => {
      state.signin.isFetching = true
    },
    signinSuccess: (state, action) => {
      state.signin.isFetching = false
      state.currentUser = action.payload?.user
      state.token = action.payload?.token
      state.signin.error = false
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    },
    signinFailed: (state) => {
      state.signin.error = true
      state.signin.isFetching = false
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
