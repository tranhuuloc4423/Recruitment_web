import { toast } from 'react-toastify'
import axios from '../../axios'
import {
  setBasicInfo,
  setData,
  setOtherInfo,
  setTarget
} from '../slices/appSlice'

const getById = async (id, dispatch, role) => {
  try {
    const res = await axios.get(`${role}/${id}`)
    dispatch(setData(res.data))
  } catch (error) {
    console.log(error)
  }
}

const updateBasicInfo = async (id, data, dispatch, role) => {
  try {
    await axios.put(`${role}/${id}/basic_info`, data)
    const res = axios.get(`${role}/${id}`)
    dispatch(setBasicInfo(res.data?.basic_info))
    toast.success('Cập nhật thông tin thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

const updateOtherInfo = async (id, data, dispatch, role) => {
  try {
    console.log(data)
    await axios.put(`${role}/${id}/other_info`, data)
    // const res = await axios.get(`${role}/${id}`)
    dispatch(setOtherInfo(data))
    toast.success('Cập nhật thông tin thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

const updateTarget = async (id, data, dispatch) => {
  try {
    console.log(data)
    await axios.put(`/candidate/${id}/target`, data)
    const res = axios.get(`/candidate/${id}`)
    dispatch(setTarget(res.data?.target))
    toast.success('Cập nhật thông tin thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Cập nhật thông tin không thành công!')
  }
}

export { updateBasicInfo, updateOtherInfo, updateTarget, getById }
