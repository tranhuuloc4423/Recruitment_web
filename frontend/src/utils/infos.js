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
      }
    ],
    otherInfo: [
      {
        title: 'Giới thiệu bản thân',
        desc: 'Thông tin cá nhân của bạn.',
        type: 'richText',
        id: 1,
        name: 'introduce'
      },
      {
        title: 'Kinh nghiệm',
        desc: 'Thông tin về kinh nghiệm làm việc.',
        type: 'richText',
        id: 2,
        name: 'exp'
      },
      {
        title: 'Kỹ năng',
        desc: 'Thông tin về kinh nghiệm làm việc.',
        type: 'dropdown',
        id: 3,
        name: 'skills',
        placeholder: 'Tìm kiếm kỹ năng',
        options: [
          {
            value: 'Reactjs',
            label: 'Reactjs'
          },
          {
            value: 'MongoDB',
            label: 'Reactjs'
          },
          {
            value: 'Reactjs',
            label: 'Reactjs'
          },
          {
            value: 'Reactjs',
            label: 'Reactjs'
          },
          {
            value: 'Reactjs',
            label: 'Reactjs'
          },
          {
            value: 'Reactjs',
            label: 'Reactjs'
          }
        ]
      },
      {
        title: 'Học vấn',
        desc: 'Thông tin học vấn và bằng cấp.',
        type: 'richText',
        id: 4,
        name: 'education'
      },
      {
        title: 'Dự án cá nhân',
        desc: 'Dự án bạn đã thực hiện.',
        type: 'richText',
        id: 5,
        name: 'projects'
      },
      {
        title: 'Chứng chỉ',
        desc: 'Thông tin về chứng chỉ đã đạt được.',
        type: 'richText',
        id: 6,
        name: 'certificates'
      }
    ]
  }
]

export default info
