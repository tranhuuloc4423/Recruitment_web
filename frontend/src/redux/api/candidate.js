import axios from '../../axios'
import { setCandidate } from '../slices/candidateSlice'

export const getCandidate = async (id, dispatch) => {
  try {
    const res = await axios.get(`candidate/${id}`)
    dispatch(setCandidate(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateBasicInfo = async (id, data, dispatch) => {
  try {
    console.log(data)
    const res = await axios.put(`candidate/${id}/basic_info`, data)
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
