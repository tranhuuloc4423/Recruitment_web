const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    basic_info: {
      image: {
        type: String
      },
      // name: {
      //   type: String
      // },
      dob: {
        type: String
      },
      phone: {
        type: String
      },
      // email: {
      //   type: String
      // },
      address: {
        type: String
      },
      gender: {
        type: String
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
      target_money: [
        {
          min_money: {
            type: Number
          },
          max_money: {
            type: String
          }
        }
      ],
      type: [
        {
          type: String
        }
      ],
      location: [
        {
          type: String
        }
      ]
    },
    jobs: {
      saved: [
        {
          post_info: mongoose.Schema.Types.Mixed
        }
      ],
      recent: [
        {
          post_info: mongoose.Schema.Types.Mixed
        }
      ],
      applied: [
        {
          post_info: mongoose.Schema.Types.Mixed
        }
      ],
      followed: [
        {
          company_info: mongoose.Schema.Types.Mixed
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

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate
