const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    basic_info: {
      name: { type: String },
      image: {
        public_id: { type: String },
        url: { type: String }
      },
      field: { type: String },
      email: { type: String, unique: true },
      tax_id: { type: String },
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
      phone: { type: String }
    },
    other_info: {
      desc: { type: String },
      speciality: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill'
        }
      ],
      images: [
        {
          public_id: { type: String },
          url: { type: String }
        }
      ],
      types: [{ name: String, value: String }],
      wforms: [{ name: String, value: String }]
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
    report: {
      recruiter: [
        {
          posts: [
            {
              views: { type: Number },
              applies: { type: Number }
            }
          ]
        }
      ],
      recruiters: { type: Number },
      candidates: { type: Number },
      posts: { type: Number },
      total_views: { type: Number },
      total_applies: { type: Number }
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ],
    isProfileComplete: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

// Middleware để tính toán và cập nhật isProfileComplete trước khi lưu
adminSchema.pre('save', function (next) {
  const basicInfoComplete =
    this.basic_info.image &&
    this.basic_info.image.public_id &&
    this.basic_info.image.url &&
    this.basic_info.name &&
    this.basic_info.field &&
    this.basic_info.email &&
    this.basic_info.phone &&
    this.basic_info.tax_id &&
    this.basic_info.address &&
    this.basic_info.address.province &&
    this.basic_info.address.district
  const otherInfoComplete =
    this.other_info.desc &&
    this.other_info.images.length > 0 &&
    this.other_info.speciality.length > 0 &&
    this.other_info.types.length > 0 &&
    this.other_info.wforms.length > 0

  this.isProfileComplete = basicInfoComplete && otherInfoComplete
  next()
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
