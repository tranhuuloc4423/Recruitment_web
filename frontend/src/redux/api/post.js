import { toast } from 'react-toastify'
import axios from '../../axios'

const createPost = async (data) => {
  try {
    const res = await axios.post(`/post/create`, { postData: data })

    toast.success('Đăng bài thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Đăng bài thất bại!')
  }
}

const getAllPost = async () => {
  try {
    const res = await axios.get(`/post/confirmed`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getRoleData = async (role, id) => {
  try {
    console.log(`/${role}/role/${id}`)
    const res = await axios.get(`/${role}/role/${id}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

export { createPost, getAllPost, getRoleData }
