const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    basic_info: {
      name: {
        type: String
      },
      image: {
        public_id: {
          type: String
        },
        url: {
          type: String
        }
      },
      field: {
        type: String
      },
      email: {
        type: String,
        unique: true
      },
      tax_id: {
        type: String
      },
      address: {
        province: {
          name: { type: String },
          code: { type: String }
        },
        district: {
          name: { type: String },
          code: { type: String }
        }
        // ward: {
        //   name: { type: String },
        //   code: { type: String }
        // }
      },
      phone: {
        type: String
      }
    },
    other_info: {
      desc: {
        type: String
      },
      speciality: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill'
        }
      ],
      images: [
        {
          public_id: {
            type: String
          },
          url: {
            type: String
          }
        }
      ],
      types: [
        {
          name: String,
          value: String
        }
      ],
      wforms: [
        {
          name: String,
          value: String
        }
      ]
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    manage_post: {
      confirmed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ],
      posted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ],
      expired: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ]
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ],
    profileStatus: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

// Middleware để tính toán và cập nhật profileStatus trước khi lưu
recruiterSchema.pre('save', function (next) {
  const basicInfoFields = [
    this.basic_info.image?.public_id,
    this.basic_info.image?.url,
    this.basic_info.name,
    this.basic_info.field,
    this.basic_info.email,
    this.basic_info.phone,
    this.basic_info.tax_id,
    this.basic_info.address?.province,
    this.basic_info.address?.district
  ]

  const otherInfoFields = [
    this.other_info.desc,
    this.other_info.images?.length > 0,
    this.other_info.speciality?.length > 0,
    this.other_info.types?.length > 0,
    this.other_info.wforms?.length > 0
  ]

  // Tính tỷ lệ hoàn thành cho basic_info và other_info
  const basicInfoCompleted =
    basicInfoFields.filter(Boolean).length / basicInfoFields.length
  const otherInfoCompleted =
    otherInfoFields.filter(Boolean).length / otherInfoFields.length

  // Tính phần trăm tổng hoàn thành và cập nhật profileStatus
  this.profileStatus = Math.round(
    basicInfoCompleted * 50 + otherInfoCompleted * 50
  )
  next()
})

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter
