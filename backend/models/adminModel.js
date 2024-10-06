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
        type: String
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
        type: String
      }
    },
    other_info: {
      desc: {
        type: String
      },
      speciality: [
        {
          label: String,
          value: String
        }
      ],
      images: [
        {
          type: String
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
