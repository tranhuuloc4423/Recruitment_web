import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/imgs/business-background-design_1200-57.png'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Dropdown from '../components/Dropdown'
import { signupUser } from '../redux/api/auth'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const options = [
    {
      value: 'candidate',
      name: 'Ứng viên'
    },
    {
      value: 'recruiter',
      name: 'Nhà tuyển dụng'
    }
  ]
  const [selectedOption, setSelectedOption] = useState(options[0])
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Họ và tên',
      error: 'Tên chứa ít nhất 6 ký tự',
      pattern: /^.{6,}$/, // Tên chứa ít nhất 6 ký tự
      label: 'Họ và tên',
      required: true
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      error: 'Địa chỉ email không hợp lệ',
      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // Định dạng email
      label: 'Email',
      required: true
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Mật khẩu',
      error: 'Mật khẩu phải có ít nhất 6 ký tự',
      pattern: /^.{6,}$/,
      label: 'Mật khẩu',
      required: true
    },
    {
      id: 4,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu',
      error: 'Mật khẩu chưa trùng khớp',
      // Sử dụng hàm validate riêng thay cho pattern
      validate: (value, values) => value === values.password, // Xác nhận mật khẩu
      label: 'Nhập lại mật khẩu',
      required: true
    }
  ]

  const onChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })

    // Validate ngay khi người dùng nhập
    const input = inputs.find((input) => input.name === name)
    if (input?.pattern && !input.pattern.test(value)) {
      setErrors({ ...errors, [name]: input.error })
    } else {
      const { [name]: removedError, ...rest } = errors
      setErrors(rest)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate toàn bộ form trước khi submit
    let formIsValid = true
    const newErrors = {}

    inputs.forEach((input) => {
      const value = values[input.name]

      if (input.required && !value) {
        newErrors[input.name] = `${input.label} là bắt buộc.`
        formIsValid = false
      } else if (input.pattern && !input.pattern.test(value)) {
        newErrors[input.name] = input.error
        formIsValid = false
      } else if (input.validate && !input.validate(value, values)) {
        newErrors[input.name] = input.error
        formIsValid = false
      }
    })

    setErrors(newErrors)

    if (formIsValid) {
      console.log('Form submitted successfully:', values)
      const user = {
        ...values,
        role: selectedOption.value
      }
      signupUser(user, dispatch, navigate)
    } else {
      toast.warn('Vui lòng nhập thông tin hợp lệ')
    }
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
                error={errors[input.name]}
              />
            ))}
            <Dropdown
              options={options}
              label={'Chọn vai trò'}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
            <Button
              label={'Đăng ký'}
              className={'w-full'}
              onClick={(e) => handleSubmit(e)}
            />
          </form>

          <div>
            Bạn đã có tài khoản ?{' '}
            <span
              onClick={() => navigate('/signin')}
              className="text-blue-700 cursor-pointer"
            >
              Đăng nhập ngay
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
