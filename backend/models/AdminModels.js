const mongoose = require('mongoose')
const Recruiter = require('./recruiterModels')

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: Recruiter },
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
        notification: mongoose.Schema.Types.Mixed
      }
    ]
  },
  { timestamps: true }
)

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
