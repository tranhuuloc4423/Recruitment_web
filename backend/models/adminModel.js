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
          name: String,
          value: String
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
    profileStatus: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
