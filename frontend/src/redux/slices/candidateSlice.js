import { createSlice } from '@reduxjs/toolkit'

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    candidate: {}
  },
  reducers: {
    setCandidate: (state, action) => {
      state.candidate = action.payload
    }
  }
})

export const { setCandidate } = candidateSlice.actions

export default candidateSlice.reducer
