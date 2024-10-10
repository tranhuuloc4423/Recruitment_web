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
      gender: {
        type: String,
        enum: ['male', 'female', 'other']
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
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Skill'
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
        province: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address'
        }
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
      approved: [
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
