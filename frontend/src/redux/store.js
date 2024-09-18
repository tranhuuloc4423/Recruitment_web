import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'

export default configureStore({
  reducer: {
    // app: appSlice,
    auth: authSlice
  }
})
