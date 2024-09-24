import { createSlice } from '@reduxjs/toolkit'

const recruiterSlice = createSlice({
  name: 'candidate',
  initialState: {
    recruiter: {}
  },
  reducers: {
    setRecruiter: (state, action) => {
      state.recruiter = action.payload
    }
  }
})

export const { setRecruiter } = recruiterSlice.actions

export default recruiterSlice.reducer
