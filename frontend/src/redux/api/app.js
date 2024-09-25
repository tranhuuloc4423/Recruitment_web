import { toast } from 'react-toastify'
import axios from '../../axios'
import { setBasicInfo, setData, setOtherInfo } from '../slices/appSlice'

export const getById = async (id, dispatch, role) => {
  try {
    const res = await axios.get(`${role}/${id}`)
    dispatch(setData(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateBasicInfo = async (id, data, dispatch, role) => {
  try {
    console.log(data)
    const res = await axios.put(`${role}/${id}/basic_info`, data)
    dispatch(setBasicInfo(res.data))
    toast.success('Cập nhật thành công!')
  } catch (error) {
    console.log(error)
  }
}

export const updateOtherInfo = async (id, data, dispatch, role) => {
  try {
    console.log(data)
    const res = await axios.put(`${role}/${id}/other_info`, data)
    dispatch(setOtherInfo(res.data))
    toast.success('Cập nhật thành công!')
  } catch (error) {
    console.log(error)
  }
}
