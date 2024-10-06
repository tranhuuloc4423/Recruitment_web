const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    basic_info: {
      image: {
        type: String
      },
      name: {
        type: String
      },
      dob: {
        type: String
      },
      phone: {
        type: String
      },
      email: {
        type: String
      },
      address: {
        type: String
      },
      gender: {
        type: String,
        enum: ['male', 'female']
      }
    },
    other_info: {
      desc: {
        type: String
      },
      education: {
        type: String
      },
      exps: {
        type: String
      },
      skills: [
        {
          value: String,
          label: String
        }
      ],
      projects: {
        type: String
      },
      certificates: {
        type: String
      }
    },
    target: {
      skills: [
        {
          value: String,
          label: String
        }
      ],
      target_money: {
        min_money: {
          type: Number
        },
        max_money: {
          type: Number
        }
      },
      types: [
        {
          value: String,
          label: String
        }
      ],
      address: {
        value: String,
        label: String
      },
      wforms: [
        {
          value: String,
          label: String
        }
      ]
    },
    jobs: {
      saved: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ],
      recent: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ],
      applied: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post'
        }
      ],
      followed: [
        {
          type: mongoose.Schema.Types.ObjectId
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

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate
