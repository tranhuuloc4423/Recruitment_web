import axios from '../../axios'
import { setData } from '../slices/appSlice'
import {
  signinFailed,
  signinSuccess,
  signinStart,
  signupFailed,
  signupSuccess,
  signupStart
} from '../slices/authSlice'
import { toast } from 'react-toastify'

export const signinUser = async (user, dispatch, navigate) => {
  dispatch(signinStart())
  try {
    const res = await axios.post('/user/signin', user)
    console.log(res.data)
    dispatch(signinSuccess(res.data))
    toast.success('Đăng nhập thành công')
    const res2 = await axios.get(`/${res.data.user.role}/${res.data.user._id}`)
    dispatch(setData(res2.data))
    navigate('/posts')
  } catch (error) {
    toast.error('Đăng nhập thất bại! Lỗi : ' + error)
    dispatch(signinFailed())
  }
}

export const signupUser = async (user, dispatch, navigate) => {
  dispatch(signupStart())
  try {
    await axios.post('/user/signup', user)
    dispatch(signupSuccess())
    toast.success('Đăng ký tài khoản thành công!')
    navigate('/signin')
  } catch (error) {
    toast.error('Đăng ký tài khoản thất bại! Lỗi :' + error)
    dispatch(signupFailed())
  }
}

export const changePassword = async (id, data, navigate) => {
  try {
    await axios.put(`/user/password/${id}/`, data)
    toast.success('Change Password Success!')
    navigate('/signin')
  } catch (error) {
    toast.error('Change password Failed!')
  }
}
