import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signin: {
      currentUser: {
        name: null,
        email: null,
        password: null,
        role: null
      },
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
      state.signin.currentUser.name = action.payload.name
      state.signin.currentUser.email = action.payload.email
      state.signin.currentUser.password = action.payload.password
      state.signin.currentUser.role = action.payload.role
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
      state.signin.currentUser.name = action.payload.name
      state.signin.currentUser.email = action.payload.email
      state.signin.currentUser.password = action.payload.password
      state.signin.currentUser.role = action.payload.role
      state.signin.error = false
      localStorage.setItem(
        'currentUser',
        JSON.stringify(state.signin.currentUser)
      )
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
