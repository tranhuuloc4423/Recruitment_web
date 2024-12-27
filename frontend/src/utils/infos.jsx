import { IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { LuCake } from 'react-icons/lu'
import { FiPhone } from 'react-icons/fi'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { HiOutlineReceiptTax } from 'react-icons/hi'
import { FaCompass } from 'react-icons/fa'
import {
  project,
  education,
  certificatesAchievements,
  introduce,
  experience,
  introduceCompany
} from './RichTextTemplate'
const info = [
  {
    name: 'admin',
    basicInfo: [
      {
        id: 0,
        name: 'name',
        type: 'text',
        placeholder: 'Tên Công Ty (Doanh nghiệp)',
        error:
          'Tên Công Ty (Doanh nghiệp) phải có ít nhất 6 ký tự và tối đa 24 ký tự',
        pattern: /.{6,24}/, // Tối thiểu 6 ký tự, tối đa 24 ký tự
        label: 'Tên Công Ty (Doanh nghiệp)',
        required: true
      },
      {
        id: 1,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        error: 'Địa chỉ email không hợp lệ',
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // Định dạng email
        label: 'Email',
        required: true,
        icon: <IoMailOutline size={24} />
      },
      {
        id: 2,
        name: 'field',
        type: 'text',
        placeholder: 'Lĩnh vực',
        error: 'Lĩnh vực phải có ít nhất 6 ký tự',
        pattern: /.{6,}/, // Tối thiểu 6 ký tự
        label: 'Lĩnh vực',
        icon: <FaCompass size={24} />,
        required: true
      },
      {
        id: 3,
        name: 'phone',
        type: 'phone',
        placeholder: 'Số điện thoại',
        error: 'Số điện thoại không hợp lệ',
        pattern: /^\d{10}$/, // Số điện thoại gồm đúng 10 chữ số
        label: 'Số điện thoại',
        required: true,
        icon: <FiPhone size={24} />
      },
      {
        id: 4,
        name: 'tax_id',
        type: 'text',
        placeholder: 'Mã số thuế',
        error: 'Mã số thuế phải có ít nhất 10 ký tự',
        pattern: /.{10,}/, // Tối thiểu 10 ký tự
        label: 'Mã số thuế',
        icon: <HiOutlineReceiptTax size={24} />,
        required: true
      }
    ],
    otherInfo: [
      {
        title: 'Giới thiệu',
        desc: 'Giới thiệu về thông tin của công ty',
        type: 'richText',
        id: 1,
        name: 'desc',
        template: introduceCompany
      },
      {
        title: 'Hình ảnh',
        desc: 'Các hình ảnh của công ty',
        type: 'images',
        id: 2,
        name: 'images'
      },
      {
        title: 'Chuyên môn',
        desc: 'Các kỹ năng chuyên môn chính của công ty',
        type: 'dropdown',
        id: 3,
        name: 'speciality',
        placeholder: 'Tìm kiếm kỹ năng'
      },
      {
        title: 'Hình thức',
        desc: 'Hình thức làm việc của công ty',
        type: 'dropdown',
        id: 4,
        name: 'types',
        placeholder: 'Hình thức làm việc',
        options: [
          {
            value: 'fulltime',
            name: 'Bán thời gian'
          },
          {
            value: 'parttime',
            name: 'Toàn thời gian'
          }
        ]
      },
      {
        title: 'Phương thức',
        desc: 'Phương thức làm việc của công ty',
        type: 'dropdown',
        id: 5,
        name: 'wforms',
        placeholder: 'Phương thức làm việc',
        options: [
          {
            value: 'onsite',
            name: 'Tại văn phòng'
          },
          {
            value: 'remote',
            name: 'Từ xa'
          },
          {
            value: 'hybrid',
            name: 'Linh hoạt'
          }
        ]
      }
    ]
  },
  {
    name: 'recruiter',
    basicInfo: [
      {
        id: 0,
        name: 'name',
        type: 'text',
        placeholder: 'Tên Công Ty (Doanh nghiệp)',
        error:
          'Tên Công Ty (Doanh nghiệp) phải có ít nhất 6 ký tự và tối đa 24 ký tự',
        pattern: /.{6,24}/, // Tối thiểu 6 ký tự, tối đa 24 ký tự
        label: 'Tên Công Ty (Doanh nghiệp)',
        required: true
      },
      {
        id: 1,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        error: 'Địa chỉ email không hợp lệ',
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // Định dạng email
        label: 'Email',
        required: true,
        icon: <IoMailOutline size={24} />
      },
      {
        id: 2,
        name: 'field',
        type: 'text',
        placeholder: 'Lĩnh vực',
        error: 'Lĩnh vực phải có ít nhất 6 ký tự',
        pattern: /.{6,}/, // Tối thiểu 6 ký tự
        label: 'Lĩnh vực',
        icon: <FaCompass size={24} />,
        required: true
      },
      {
        id: 3,
        name: 'phone',
        type: 'phone',
        placeholder: 'Số điện thoại',
        error: 'Số điện thoại không hợp lệ',
        pattern: /^\d{10}$/, // Số điện thoại gồm đúng 10 chữ số
        label: 'Số điện thoại',
        required: true,
        icon: <FiPhone size={24} />
      },
      {
        id: 4,
        name: 'tax_id',
        type: 'text',
        placeholder: 'Mã số thuế',
        error: 'Mã số thuế phải có ít nhất 10 ký tự',
        pattern: /.{10,}/, // Tối thiểu 10 ký tự
        label: 'Mã số thuế',
        icon: <HiOutlineReceiptTax size={24} />,
        required: true
      }
    ],
    otherInfo: [
      {
        title: 'Giới thiệu',
        desc: 'Giới thiệu về thông tin của công ty',
        type: 'richText',
        id: 1,
        name: 'desc',
        template: introduceCompany
      },
      {
        title: 'Hình ảnh',
        desc: 'Các hình ảnh của công ty',
        type: 'images',
        id: 2,
        name: 'images'
      },
      {
        title: 'Chuyên môn',
        desc: 'Các kỹ năng chuyên môn chính của công ty',
        type: 'dropdown',
        id: 3,
        name: 'speciality',
        placeholder: 'Tìm kiếm kỹ năng'
      },
      {
        title: 'Hình thức',
        desc: 'Hình thức làm việc của công ty',
        type: 'dropdown',
        id: 4,
        name: 'types',
        placeholder: 'Hình thức làm việc',
        options: [
          {
            value: 'fulltime',
            name: 'Bán thời gian'
          },
          {
            value: 'parttime',
            name: 'Toàn thời gian'
          }
        ]
      },
      {
        title: 'Phương thức',
        desc: 'Phương thức làm việc của công ty',
        type: 'dropdown',
        id: 5,
        name: 'wforms',
        placeholder: 'Phương thức làm việc',
        options: [
          {
            value: 'onsite',
            name: 'Tại văn phòng'
          },
          {
            value: 'remote',
            name: 'Từ xa'
          },
          {
            value: 'hybrid',
            name: 'Linh hoạt'
          }
        ]
      }
    ]
  },
  {
    name: 'candidate',
    basicInfo: [
      {
        id: 0,
        name: 'name',
        type: 'text',
        placeholder: 'Họ và Tên',
        error: 'Họ và Tên ít nhất 6 ký tự',
        pattern: /.{6,}/, // Tối thiểu 6 ký tự
        label: 'Họ và Tên',
        required: true
      },
      {
        id: 1,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        error: 'Địa chỉ email không hợp lệ',
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // Định dạng email
        label: 'Email',
        required: true,
        icon: <IoMailOutline size={24} />
      },
      {
        id: 2,
        name: 'dob',
        type: 'date',
        placeholder: 'Ngày sinh',
        error: 'Ngày sinh không hợp lệ',
        pattern: null, // Không cần kiểm tra pattern cho ngày sinh, có thể dùng kiểm tra logic phía backend
        label: 'Ngày sinh',
        required: true,
        icon: <LuCake size={24} />
      },
      {
        id: 3,
        name: 'phone',
        type: 'phone',
        placeholder: 'Số điện thoại',
        error: 'Số điện thoại không hợp lệ',
        pattern: /^\d{10}$/, // Số điện thoại gồm đúng 10 chữ số
        label: 'Số điện thoại',
        required: true,
        icon: <FiPhone size={24} />
      },
      {
        id: 4,
        name: 'gender',
        type: 'select',
        placeholder: 'Giới tính',
        label: 'Giới tính',
        options: [
          {
            value: 'male',
            name: 'Nam'
          },
          {
            value: 'female',
            name: 'Nữ'
          }
        ],
        icon: <BsGenderAmbiguous size={24} />
      }
    ],
    otherInfo: [
      {
        title: 'Giới thiệu',
        desc: 'Thông tin cá nhân của bạn.',
        type: 'richText',
        id: 1,
        name: 'desc',
        template: introduce
      },
      {
        title: 'Kinh nghiệm',
        desc: 'Thông tin về kinh nghiệm làm việc.',
        type: 'richText',
        id: 2,
        name: 'exps',
        template: experience
      },
      {
        title: 'Kỹ năng',
        desc: 'Thông tin về kinh nghiệm làm việc.',
        type: 'dropdown',
        id: 3,
        name: 'skills',
        placeholder: 'Tìm kiếm kỹ năng'
      },
      {
        title: 'Học vấn',
        desc: 'Thông tin học vấn và bằng cấp.',
        type: 'richText',
        id: 4,
        name: 'education',
        template: education
      },
      {
        title: 'Dự án',
        desc: 'Dự án bạn đã thực hiện.',
        type: 'richText',
        id: 5,
        name: 'projects',
        template: project
      },
      {
        title: 'Chứng chỉ',
        desc: 'Thông tin về chứng chỉ đã đạt được.',
        type: 'richText',
        id: 6,
        name: 'certificates',
        template: certificatesAchievements,
        hasImage: true
      }
    ]
  }
]

export default info
