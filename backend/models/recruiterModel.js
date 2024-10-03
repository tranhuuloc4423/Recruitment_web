const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Liên kết với model User
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
          type: String
        }
      ],
      images: [
        {
          type: String
        }
      ]
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post' // Liên kết với model Post
      }
    ],
    manage_post: {
      confirmed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post' // Liên kết với model Post
        }
      ],
      posted: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post' // Liên kết với model Post
        }
      ]
    },
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification' // Liên kết với model Notification
      }
    ]
  },
  { timestamps: true }
)

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter
