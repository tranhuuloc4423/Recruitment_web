const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'authorType'
    },
    authorType: {
      type: String,
      enum: ['Recruiter', 'Admin'],
      required: true
    },
    salary: {
      type: Number
    },
    quantity: {
      type: Number
    },
    date_upload: {
      type: String
    },
    date_expiration: {
      type: String
    },
    skills: [
      {
        name: { type: String },
        value: { type: String }
      }
    ],
    desc: {
      type: String
    },
    location: {
      address: [
        {
          province: {
            name: { type: String },
            code: { type: String }
          },
          district: {
            name: { type: String },
            code: { type: String }
          }
        }
      ]
    },
    request: {
      type: String
    },
    status: {
      type: String,
      enum: ['posted', 'confirmed', 'expired', 'completed', 'cancelled'],
      default: 'posted'
    },
    type: {
      type: String,
      enum: ['normal', 'hot', 'superhot'],
      default: 'normal'
    },
    views: {
      type: Number,
      default: 0
    },
    applied: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
      }
    ],
    approved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
      }
    ]
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)
module.exports = Post
