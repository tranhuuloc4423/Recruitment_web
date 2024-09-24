import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import candidateSlice from './slices/candidateSlice'
import adminSlice from './slices/adminSlice'
import recruiterSlice from './slices/recruiterSlice'

export default configureStore({
  reducer: {
    // app: appSlice,
    auth: authSlice,
    candidate: candidateSlice,
    admin: adminSlice,
    recruiter: recruiterSlice
  }
})
