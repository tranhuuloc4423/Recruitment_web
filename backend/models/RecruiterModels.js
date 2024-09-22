const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    basic_info: {
      name: {
        type: String,
        required: true
      },
      image: {
        type: String
      },
      model: {
        type: String
      },
      field: {
        type: String
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      tax_id: {
        type: Number
      },
      time: {
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
      reason: {
        desc: {
          type: String
        },
        image: [
          {
            type: String
          }
        ]
      },
      location: [
        {
          type: String
        }
      ]
    },
    posts: [
      {
        id: {
          type: Number,
          unique: true
        },
        title: {
          type: String
        },
        company_info: [],
        salary: {
          type: Number
        },
        quantity: {
          type: Number
        },
        date_upload: {
          type: Date
        },
        date_expiration: {
          type: Date
        },
        skills: [
          {
            type: String
          }
        ],
        reason: {
          type: String
        },
        desc: {
          type: String
        },
        request: {
          type: String
        },
        views: {
          type: Number
        },
        applied: [
          {
            candidate_info: mongoose.Schema.Types.Mixed
          }
        ]
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

recruiterSchema.pre('save', async function (next) {
  const recruiter = this
  const Recruiter = mongoose.model('Recruiter')
  if (!recruiter.id) {
    const lastRecruiter = await Recruiter.findOne({}, {}, { sort: { id: -1 } })
    recruiter.id = lastRecruiter ? lastRecruiter.id + 1 : 1
  }
  next()
})

const Recruiter = mongoose.model('Recruiter', recruiterSchema)
module.exports = Recruiter
