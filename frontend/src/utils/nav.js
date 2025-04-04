import paths from './paths'

const {
  INFO,
  CV,
  TARGET,
  POSTS,
  MANAGE,
  CHART,
  CHECKPOST,
  CONFIRMPOST,
  CREATEPOST,
  POSTED,
  RECENTPOSTS,
  APPLIEDPOSTS,
  CHART_USER,
  CHART_POST,
  CHART_APPLICATION,
  SKILLS
} = paths

const nav = [
  {
    name: 'admin',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS + '/'
      },
      {
        name: 'Thông tin',
        path: '/' + INFO
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE + '/'
      },
      {
        name: 'Thống kê',
        path: '/' + CHART + '/'
      }
    ],
    basic_info: {}
  },
  {
    name: 'recruiter',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS + '/'
      },
      {
        name: 'Thông tin',
        path: '/' + INFO + '/'
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE + '/'
      }
    ]
  },
  {
    name: 'candidate',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS + '/'
      },
      {
        name: 'Thông tin',
        path: '/' + INFO + '/'
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE + '/'
      }
    ]
  }
]

const candidateNavInfo = [
  {
    name: 'Hồ sơ',
    path: '/' + INFO + '/',
    active: true,
    id: 0
  },
  {
    name: 'CV',
    path: '/' + INFO + '/' + CV,
    active: false,
    id: 1
  },
  {
    name: 'Tiêu chí',
    path: '/' + INFO + '/' + TARGET,
    active: false,
    id: 2
  }
]



const manageNav = [
  {
    name: 'admin',
    nav: [
      {
        name: 'Đã đăng',
        path: '/manage/',
        active: true,
        id: 0
      },
      {
        name: 'Đã duyệt',
        path: '/manage/' + CONFIRMPOST,
        active: false,
        id: 1
      },
      {
        name: 'Duyệt bài',
        path: '/manage/' + CHECKPOST,
        active: false,
        id: 2
      },
      
      {
        name: 'Đăng bài',
        path: '/manage/' + CREATEPOST,
        active: false,
        id: 3
      },
      {
        name: 'Kỹ năng',
        path: '/manage/' + SKILLS,
        active: false,
        id: 4
      },
    ]
  },
  {
    name: 'recruiter',
    nav: [
      {
        name: 'Đã đăng',
        path: '/manage/',
        active: true,
        id: 0
      },
      {
        name: 'Đã duyệt',
        path: '/manage/' + CONFIRMPOST,
        active: false,
        id: 1
      },
      {
        name: 'Đăng bài',
        path: '/manage/' + CREATEPOST,
        active: false,
        id: 3
      }
    ]
  },
  {
    name: 'candidate',
    nav: [
      {
        name: 'Đã lưu',
        path: '/manage/',
        active: true,
        id: 0
      },
      {
        name: 'Xem gần đây',
        path: '/manage/' + RECENTPOSTS,
        active: false,
        id: 1
      },

      {
        name: 'Đã ứng tuyển',
        path: '/manage/' + APPLIEDPOSTS,
        active: false,
        id: 2
      }
    ]
  }
]

const chartNav = [
  {
    name: 'Người dùng',
    path: '/chart/',
    active: true,
    id: 0
  },
  {
    name: 'Bài tuyển dụng',
    path: '/chart/' + CHART_POST + '/',
    active: false,
    id: 1
  },
  {
    name: 'Hệ thống',
    path: '/chart/' + CHART_APPLICATION + '/',
    active: false,
    id: 2
  }
]

export { candidateNavInfo, manageNav, chartNav }

export default nav
