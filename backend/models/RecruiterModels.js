const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true
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
          post_info: mongoose.Schema.Types.Mixed
        }
      ],
      posted: [
        {
          post_info: mongoose.Schema.Types.Mixed
        }
      ]
    },
    notifications: [
      {
        notification: mongoose.Schema.Types.Mixed
      }
    ]
  },
  { timestamps: true }
)

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter
