import paths from './paths'

const { INFO, CV, TARGET, POSTS, MANAGE, CHART } = paths

const nav = [
  {
    name: 'admin',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS
      },
      {
        name: 'Thông tin',
        path: '/' + INFO
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE
      },
      {
        name: 'Thống kê',
        path: '/' + CHART
      }
    ],
    basic_info: {}
  },
  {
    name: 'recruiter',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS
      },
      {
        name: 'Thông tin',
        path: '/' + INFO
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE
      }
    ]
  },
  {
    name: 'candidate',
    nav: [
      {
        name: 'Tin tuyển dụng',
        path: '/' + POSTS
      },
      {
        name: 'Thông tin',
        path: '/' + INFO
      },
      {
        name: 'Quản lý tin',
        path: '/' + MANAGE
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
        name: 'Đã duyệt',
        path: '/confirmed',
        active: true,
        id: 0
      },
      {
        name: 'Đã đăng',
        path: '/posted',
        active: false,
        id: 1
      },
      {
        name: 'Duyệt bài',
        path: '/confirm-posts',
        active: false,
        id: 2
      },
      {
        name: 'Đăng bài',
        path: '/create-post',
        active: false,
        id: 3
      }
    ]
  },
  {
    name: 'recruiter',
    nav: [
      {
        name: 'Đã duyệt',
        path: '/confirmed',
        active: true,
        id: 0
      },
      {
        name: 'Đã đăng',
        path: '/posted',
        active: false,
        id: 1
      },
      {
        name: 'Đăng bài',
        path: '/create-post',
        active: false,
        id: 2
      }
    ]
  },
  {
    name: 'candidate',
    nav: [
      {
        name: 'Đã xem',
        path: '/post-viewed',
        active: true,
        id: 0
      },
      {
        name: 'Đã lưu',
        path: '/post-saved',
        active: false,
        id: 1
      },
      {
        name: 'Đã ứng tuyển',
        path: '/posts-applied',
        active: false,
        id: 2
      }
    ]
  }
]

export { candidateNavInfo, manageNav }

export default nav
