const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    id_user: {
      type: String,
      required: true
    },
    personal_info: {
      basic_info: {
        name: {
          type: String,
          required: true
        },
        phone: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        gender: {
          type: String,
          required: true
        },
        social: [
          {
            type: String,
            required: true
          }
        ]
      },
      cv_info: {
        desc: {
          type: String,
          required: true
        },
        education: {
          school: {
            type: String,
            required: true
          },
          faculty: {
            type: String,
            required: true
          },
          rank: {
            type: String,
            required: true
          }
        },
        exps: {
          type: String,
          required: true
        },
        skills: [
          {
            type: String,
            required: true
          }
        ],
        projects: [
          {
            name: {
              type: String,
              required: true
            },
            desc: {
              type: String,
              required: true
            },
            link: {
              type: String,
              required: true
            }
          }
        ],
        certificates: [
          {
            name: {
              type: String,
              required: true
            },
            desc: {
              type: String,
              required: true
            },
            image: {
              type: String,
              required: true
            }
          }
        ]
      }
    },
    target: {
      skills: [
        {
          type: String,
          required: true
        }
      ],
      target_money: [
        {
          min_money: {
            type: Number,
            required: true
          },
          max_money: {
            type: String,
            required: true
          }
        }
      ],
      type: [
        {
          type: String,
          required: true
        }
      ],
      location: [
        {
          type: String,
          required: true
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

candidateSchema.pre('save', async function (next) {
  const candidate = this
  const Candidate = mongoose.model('Candidate')
  if (!candidate.id) {
    const lastCondidate = await Candidate.findOne({}, {}, { sort: { id: -1 } })
    candidate.id = lastCondidate ? lastCondidate.id + 1 : 1
  }
  next()
})

const Condidate = mongoose.model('Condidate', condidateSchema)
module.exports = Condidate
