import { toast } from 'react-toastify'
import axios from '../../axios'

const createPost = async (data) => {
  try {
    await axios.post(`/post/create`, { postData: data })
    toast.success('Đăng bài thành công!')
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const updatePost = async (data, id) => {
  try {
    await axios.put(`/post/${id}`, data)
    toast.success('Cập nhật bài thành công!')
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
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
    return res.data
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

const updateConfirmed = async (id, data) => {
  try {
    const res = await axios.put(`/post/${id}/status`, data)
    toast.success('Duyệt bài thành công')
    return res.data
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

const updateApproved = async (id, candidateId) => {
  try {
    const res = await axios.put(`/post/${id}/approved`, {candidateId: candidateId})
    toast.success(res.data.message)
    return res.data
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

const removePost = async (id, data) => {
  try {
    await axios.delete(`/post/${id}/`, data)
    toast.success('Xoá bài thành công')
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

const getAllPostConfirmedRole = async (id, role) => {
  try {
    const res = await axios.get(`${role}/confirmed/${id}`)
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getAllPostedRole = async (id, role) => {
  try {
    const res = await axios.get(`${role}/posted/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getAllPostedByOwner = async (id) => {
  try {
    const res = await axios.get(`post/user/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

const getAllPostsRole = async (id, role) => {
  try {
    const res = await axios.get(`${role}/posts/${id}`)
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

const updateCandidateApplied = async (id, candidateId) => {
  try {
    const res = await axios.put(`/post/${id}/applied`, {
      candidateId
    })
    toast.success('Ứng tuyển thành công!')
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const getCandidatesByPost = async (id) => {
  try {
    const res = await axios.get(`/post/${id}/applied`)
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const getCandidatesApprovedByPost = async (id) => {
  try {
    const res = await axios.get(`/post/${id}/approved`)
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const getOwnerById = async (id, role) => {
  try {
    const res = await axios.get(`${role}/role/${id}`)
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const getListPostByCandidateId = async (id, name) => {
  try {
    const res = await axios.get(`candidate/${name}/${id}`)
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const getRankedCandidates = async (id) => {
  try {
    const res = await axios.get(`post/candidate/${id}/ranked`)
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}

const savePost = async (id, candidateId) => {
  try {
    console.log("save")
    const res = await axios.put(`post/${id}/saved`, {
      candidateId : candidateId
    })
    console.log(res)
    toast.success('Lưu bài thành công!')
    return res.data
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
  }
}



export {
  createPost,
  updatePost,
  getAllPostConfirmed,
  getRoleData,
  getPost,
  getAllPosted,
  getAllPostedRole,
  getAllPostsRole,
  getAllPostConfirmedRole,
  updateConfirmed,
  removePost,
  getAllPostedByOwner,
  updateCandidateApplied,
  getCandidatesByPost,
  getCandidatesApprovedByPost,
  getOwnerById,
  getListPostByCandidateId,
  savePost,
  updateApproved,
  getRankedCandidates
}
