import axios from '../../axios'
import { setAdmin } from '../slices/adminSlice'

export const getAdmin = async (id, dispatch) => {
  try {
    const res = await axios.get(`admin/${id}`)
    dispatch(setAdmin(res.data))
  } catch (error) {
    console.log(error)
  }
}
