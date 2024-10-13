const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address'
        },
        district: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address.districts'
        },
        ward: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address.districts.wards'
        }
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Image'
        }
      ],
      types: [
        {
          label: String,
          value: String
        }
      ],
      wforms: [
        {
          label: String,
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
      ]
    },
    report: {
      recruiter: [
        {
          posts: [
            {
              views: {
                type: Number
              },
              applies: {
                type: Number
              }
            }
          ]
        }
      ],
      recruiters: {
        type: Number
      },
      candidates: {
        type: Number
      },
      posts: {
        type: Number
      },
      total_views: {
        type: Number
      },
      total_applies: {
        type: Number
      }
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ]
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
