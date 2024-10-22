import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: []
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    }
  }
})

export const { setAddress } = addressSlice.actions

export default addressSlice.reducer
