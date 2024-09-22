import { createSlice } from '@reduxjs/toolkit'

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    basisInfo: {
      name: null,
      email: null,
      dob: null,
      location: null,
      phone: null,
      gender: null,
      link: null,
      image: null
    },
    cvInfo: {}
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.signin.currentUser.name = action.payload.name
      state.signin.currentUser.email = action.payload.email
      state.signin.currentUser.password = action.payload.password
      state.signin.currentUser.role = action.payload.role
    }
  }
})

export const {} = candidateSlice.actions

export default candidateSlice.reducer
