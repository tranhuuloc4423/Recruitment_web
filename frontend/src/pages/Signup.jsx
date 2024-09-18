import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/imgs/business-background-design_1200-57.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Dropdown from '../components/Dropdown'
const Signup = () => {
  const navigate = useNavigate()
  const options = ['Ứng viên', 'Nhà tuyển dụng']
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Họ tên',
      error: 'Họ tên phải từ 4 - 16 ký tự',
      pattern: '^[A-Za-z0-9]{4,16}$',
      label: 'Họ tên',
      required: true
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      error: 'Địa chỉ email không hợp lệ',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
      label: 'Email',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu',
      error: 'Mật khẩu chưa chính xác',
      // pattern: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$',
      label: 'Mật khẩu',
      required: true
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu',
      error: 'Mật khẩu chưa trùng khớp',
      pattern: values.password,
      label: 'Nhập lại mật khẩu',
      required: true
    }
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8">
      <Header />
      <div className="w-full flex gap-4 justify-center">
        <div className="w-1/3 flex flex-col gap-4 items-center justify-center">
          <div className="heading-1 text-primary text-center">
            Chào mừng bạn đến với Tuyển dụng Lạc Hồng
          </div>
          <form onSubmit={handleSubmit} className="w-full gap-4 flex flex-col">
            {inputs.map((input) => (
              <Input
                key={input.id}
                className="w-full"
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Dropdown
              options={options}
              label={'Chọn vai trò'}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <Button
              label={'Đăng nhập'}
              className={'w-full'}
              onClick={() => handleSubmit()}
            />
          </form>

          <div>
            Bạn đã có tài khoản ?{' '}
            <span
              onClick={() => navigate('/signin')}
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

export default Signup
