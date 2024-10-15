import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Input from '../components/Input'
import Button from '../components/Button'
import { changePassword } from '../redux/api/auth'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
  const { currentUser } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [values, setValues] = useState({
    old: '',
    new: '',
    renew: ''
  })

  const inputs = [
    {
      id: 1,
      name: 'old',
      type: 'password',
      placeholder: 'Mật khẩu cũ',
      pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'
    },
    {
      id: 2,
      name: 'new',
      type: 'password',
      placeholder: 'Mật khẩu mới',
      error: 'Mật khẩu chứa ít nhất 6 ký tự',
      pattern: '.{6,}'
    },
    {
      id: 3,
      name: 'renew',
      type: 'password',
      placeholder: 'Nhập lại mật khẩu mới',
      // error: values.new,
      pattern: '.{6,}'
    }
  ]

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!values.old) {
      return
    }

    // Kiểm tra mật khẩu mới
    if (!values.new || values.new.length < 6) {
      return
    }

    // Kiểm tra nhập lại mật khẩu mới
    if (values.new !== values.renew) {
      return
    }

    const data = {
      oldPassword: values.old,
      newPassword: values.new
    }

    changePassword(currentUser?._id, data, navigate)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 p-4 bg-white rounded">
        <div className="heading-2">Tài khoản</div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="flex flex-col gap-2">
          <div className="heading-3 ">Thông tin</div>
          <div className="flex items-center gap-4">
            <div className="flex-1">Email: </div>
            <div className="flex-1">{currentUser?.email} </div>
            <div className="flex-1"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">Họ và tên: </div>
            <div className="flex-1">{currentUser?.name}</div>
            <div className="flex-1"></div>
          </div>
        </div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="flex justify-between">
          <div className="flex-1 heading-3 ">Đổi mật khẩu</div>
          <div className="flex-1 flex flex-col gap-4">
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <Button label={'Cập nhật mật khẩu'} onClick={handleSubmit} />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-4 p-4 bg-white rounded">
        <div className="heading-2">Tài khoản</div>
        <div className="w-full h-[1px] bg-black"></div>
        <div className="para-1">
          Thao tác xóa tài khoản là vĩnh viễn và không thể hoàn tác.
        </div>
        <Button
          label={'Xoá tài khoản'}
          className="bg-red active:bg-[rgba(237, 27, 47, 0.85)] w-fit"
        />
      </div> */}
    </div>
  )
}

export default Settings
