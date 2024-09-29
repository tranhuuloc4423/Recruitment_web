const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    basic_info: {
      // name: {
      //   type: String
      // },
      image: {
        type: String
      },
      field: {
        type: String
      },
      // email: {
      //   type: String,
      //   unique: true
      // },
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
        postId: {
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
    ],
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
