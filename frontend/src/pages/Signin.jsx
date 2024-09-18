import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import bg from '../assets/imgs/business-background-design_1200-57.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { signinUser } from '../redux/api/auth'
const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      error: 'Địa chỉ email không hợp lệ',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
      label: 'Email',
      required: true
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu',
      error: 'Mật khẩu chứa ít nhất 3 ký tự',
      pattern: '.{3,}',
      label: 'Mật khẩu',
      required: true
    }
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signinUser({ ...values }, dispatch, navigate)
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <Header />
      <div className="w-full flex gap-4 justify-center">
        <div className="w-1/3 flex flex-col gap-4 items-center justify-center">
          <div className="heading-1 text-primary text-center">
            Chào mừng bạn đến với Tuyển dụng Lạc Hồng
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {inputs.map((input) => (
              <Input
                key={input.id}
                className="w-full"
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button
              label={'Đăng nhập'}
              className={'w-full'}
              onClick={(e) => handleSubmit(e)}
            />
          </form>
          <div>
            Bạn chưa có tài khoản ?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-blue-700 cursor-pointer"
            >
              Đăng ký ngay
            </span>
          </div>
        </div>
        <div className="w-1/2 flex justify-center">
          <img src={bg} alt="background images" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Signin
