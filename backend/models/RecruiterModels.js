const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    id_user: {
      type: Number,
      required: true
    },
    company_info: {
      basic_info: {
        name: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        model: {
          type: String,
          required: true
        },
        field: {
          type: String,
          required: true
        },
        scale: {
          type: String,
          required: true
        },
        tax_id: {
          type: Number,
          required: true
        },
        time: {
          type: String,
          required: true
        }
      },
      other_info: {
        desc: {
          type: String,
          required: true
        },
        speciality: [
          {
            type: String,
            required: true
          }
        ],
        reason: {
          desc: {
            type: String,
            required: true
          },
          image: [
            {
              type: String,
              required: true
            }
          ]
        },
        location: [
          {
            type: String,
            required: true
          }
        ]
      }
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
    }
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
