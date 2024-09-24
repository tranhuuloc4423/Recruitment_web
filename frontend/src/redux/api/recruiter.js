import axios from '../../axios'
import { setRecruiter } from '../slices/recruiterSlice'

export const getRecruiter = async (id, dispatch) => {
  try {
    const res = await axios.get(`recruiter/${id}`)
    dispatch(setRecruiter(res.data))
  } catch (error) {
    console.log(error)
  }
}
