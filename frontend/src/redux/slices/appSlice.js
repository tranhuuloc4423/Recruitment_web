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
    },
    filter: {
      salaries: [],
      skills: [],
      skillSelected: null,
      types: [],
      wforms: [],
      address: null
    },
    skillsDB: [],
    loading: false
  },
  reducers: {
    setData: (state, action) => {
      state.currentRole = action.payload
    },
    setBasicInfo: (state, action) => {
      state.currentRole.basic_info = {
        ...state.currentRole.basic_info,
        ...action.payload
      }
    },
    setOtherInfo: (state, action) => {
      state.currentRole.other_info = {
        ...state.currentRole.other_info,
        ...action.payload
        // [action.payload.key]: action.payload.value
      }
    },
    setTarget: (state, action) => {
      state.currentRole.target = {
        ...state.currentRole.target,
        ...action.payload
      }
    },
    resetRole: (state) => {
      state.currentRole = {
        basic_info: {},
        other_info: {}
      }
    },
    setSalaries: (state, action) => {
      state.filter.salaries = action.payload
    },
    setSkills: (state, action) => {
      state.filter.skills = action.payload
    },
    setSkillSelected: (state, action) => {
      state.filter.skillSelected = action.payload
    },
    setAddress: (state, action) => {
      state.filter.address = action.payload
    },
    setTypes: (state, action) => {
      state.filter.types = action.payload
    },
    setWforms: (state, action) => {
      state.filter.wforms = action.payload
    },
    setSkillsDB: (state, action) => {
      state.skillsDB = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const {
  setData,
  resetRole,
  setBasicInfo,
  setOtherInfo,
  setTarget,
  setSalaries,
  setSkills,
  setSkillSelected,
  setAddress,
  setTypes,
  setWforms,
  setSkillsDB,
  setLoading
} = appSlice.actions

export default appSlice.reducer
