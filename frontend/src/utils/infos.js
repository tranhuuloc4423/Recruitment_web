const info = [
  {
    name: 'admin',
    basicInfo: {},
    otherInfo: {}
  },
  {
    name: 'recruiter'
  },
  {
    name: 'candidate',
    basicInfo: [
      {
        id: 2,
        name: 'name',
        type: 'text',
        placeholder: 'Họ và Tên',
        error: 'Họ và Tên ít nhất 6 ký tự',
        pattern: '.{6,}',
        label: 'Họ và Tên',
        required: true
      },
      {
        id: 3,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        error: 'Địa chỉ email không hợp lệ',
        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
        label: 'Email',
        required: true
      },
      {
        id: 4,
        name: 'dob',
        type: 'date',
        placeholder: 'Ngày sinh',
        error: 'Ngày sinh không hợp lệ',
        pattern: '',
        label: 'Ngày sinh',
        required: true
      },
      {
        id: 5,
        name: 'address',
        type: 'text',
        placeholder: 'Địa chỉ',
        error: 'Địa chỉ không hợp lệ',
        // pattern: '',
        label: 'Địa chỉ',
        required: true
      },
      {
        id: 6,
        name: 'phone',
        type: 'phone',
        placeholder: 'Số điện thoại',
        error: 'Số điện thoại không hợp lệ',
        // pattern: '^d{10}$',
        label: 'Số điện thoại',
        required: true
      },
      {
        id: 7,
        name: 'gender',
        type: 'select',
        placeholder: 'Giới tính',
        label: 'Giới tính',
        options: [
          {
            value: 'male',
            label: 'Nam'
          },
          {
            value: 'female',
            label: 'Nữ'
          }
        ]
      },
      {
        id: 8,
        name: 'link',
        type: 'text',
        placeholder: 'Link',
        label: 'Link'
      }
    ],
    otherInfo: [
      {
        id: 1,
        title: 'Giới thiệu bản thân',
        desc: 'Giới thiệu các thông tin của bản thân, điểm mạnh,...'
      }
    ]
  }
]

export default info
