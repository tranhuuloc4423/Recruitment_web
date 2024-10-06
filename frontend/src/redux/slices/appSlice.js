import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    currentRole: {
      basic_info: {},
      other_info: {},
      target: {},
      manage_post: [],
      posts: [],
      notifications: []
    }
  },
  reducers: {
    setData: (state, action) => {
      state.currentRole = action.payload
    },
    setBasicInfo: (state, action) => {
      state.currentRole.basic_info = action.payload
    },
    setOtherInfo: (state, action) => {
      state.currentRole.other_info = action.payload
    },
    setTarget: (state, action) => {
      state.currentRole.target = action.payload
    },
    resetRole: (state) => {
      state.currentRole = {
        basic_info: {},
        other_info: {}
      }
    }
  }
})

export const { setData, resetRole, setBasicInfo, setOtherInfo, setTarget } =
  appSlice.actions

export default appSlice.reducer
