import { toast } from 'react-toastify'
import axios from '../../axios'

const createPost = async (data) => {
  try {
    await axios.post(`/post/create`, { postData: data })
    toast.success('Đăng bài thành công!')
  } catch (error) {
    console.log(error)
    toast.error('Đăng bài thất bại!')
  }
}

const getAllPostConfirmed = async () => {
  try {
    const res = await axios.get(`/post/confirmed`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getPost = async (id) => {
  try {
    const res = await axios.get(`/post/${id}`)
    return res.data.post
  } catch (error) {
    console.log(error)
  }
}

const getAllPosted = async () => {
  try {
    const res = await axios.get(`/post/posted`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getRoleData = async (role, id) => {
  try {
    const res = await axios.get(`/${role}/role/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

export { createPost, getAllPostConfirmed, getRoleData, getPost, getAllPosted }
