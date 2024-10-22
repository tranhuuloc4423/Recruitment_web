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
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
      }
    ]
  },
  { timestamps: true }
)

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter
