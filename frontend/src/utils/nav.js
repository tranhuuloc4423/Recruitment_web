const nav = [
  {
    name: 'admin',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: 'post'
      },
      {
        name: 'Thông tin',
        path: 'info'
      },
      {
        name: 'Quản lý tin',
        path: 'admin/manage'
      },
      {
        name: 'Thống kê',
        path: 'chart'
      }
    ],
    basic_info: {}
  },
  {
    name: 'recruiter',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: 'post'
      },
      {
        name: 'Thông tin',
        path: 'info'
      },
      {
        name: 'Quản lý tin',
        path: 'recruiter/manage'
      }
    ]
  },
  {
    name: 'candidate',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: 'post'
      },
      {
        name: 'Thông tin',
        path: 'cvinfo'
      },
      {
        name: 'Quản lý tin',
        path: 'candidate/manage'
      }
    ]
  }
]

export default nav
