import { toast } from 'react-toastify'
import axios from '../../axios'
import {
  setBasicInfo,
  setData,
  setLoading,
  setOtherInfo,
  setSkillsDB,
  setTarget
} from '../slices/appSlice'
import { setAddress } from '../slices/addressSlice'

const getById = async (id, dispatch, role) => {
  try {
    const res = await axios.get(`${role}/${id}`)
    dispatch(setData(res.data))
  } catch (error) {
    console.log(error)
  }
}

const getSkills = async (dispatch) => {
  try {
    const res = await axios.get(`/skill`)
    dispatch(setSkillsDB(res.data))
  } catch (error) {
    console.log(error)
  }
}

const updateBasicInfo = async (id, data, dispatch, role) => {
  try {
    dispatch(setLoading(true))
    await axios.put(`${role}/basic_info/${id}`, data)
    const res = await axios.get(`${role}/role/${id}`)
    dispatch(setBasicInfo(res.data?.basic_info))
    toast.success('Cập nhật thông tin thành công!')
    dispatch(setLoading(false))
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

const updateOtherInfo = async (id, data, dispatch, role) => {
  try {
    dispatch(setLoading(true))
    await axios.put(`${role}/other_info/${id}`, data)
    const res = await axios.get(`${role}/role/${id}`)
    dispatch(setOtherInfo(res.data?.other_info))
    toast.success('Cập nhật thông tin thành công!')
    dispatch(setLoading(false))
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

const updateTarget = async (id, data, dispatch) => {
  try {
    console.log(data)
    await axios.put(`/candidate/target/${id}`, data)
    const res = axios.get(`/candidate/${id}`)
    dispatch(setTarget(res.data?.target))
    toast.success('Cập nhật thông tin thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

const getAddress = async (dispatch) => {
  try {
    const result = await axios.get(`/address/`)
    dispatch(setAddress(result.data))
  } catch (error) {
    console.log(error)
  }
}

const getCandidate = async (id) => {
  try {
    const result = await axios.get(`/candidate/role/${id}`)
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const getCandidates = async (data) => {
  try {
    const result = await axios.get(`/candidate/list/`, data)
    return result.data
  } catch (error) {
    console.log(error)
  }
}

export {
  updateBasicInfo,
  updateOtherInfo,
  updateTarget,
  getById,
  getAddress,
  getSkills,
  getCandidate,
  getCandidates
}
