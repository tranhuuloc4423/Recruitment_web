import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import appSlice from './slices/appSlice'
import addressSlice from './slices/addressSlice'

export default configureStore({
  reducer: {
    app: appSlice,
    auth: authSlice,
    address: addressSlice
  }
})
