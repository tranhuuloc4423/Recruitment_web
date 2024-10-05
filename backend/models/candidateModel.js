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
          type: String
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
          type: String
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
          type: String
        }
      ],
      location: {
        type: String
      },
      wform: [{ type: String }]
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
