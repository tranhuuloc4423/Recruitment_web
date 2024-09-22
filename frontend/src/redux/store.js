import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import candidateSlice from './slices/candidateSlice'

export default configureStore({
  reducer: {
    // app: appSlice,
    auth: authSlice,
    candidate: candidateSlice
  }
})
