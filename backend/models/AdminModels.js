const mongoose = require('mongoose')
const Recruiter = require('./recruiterModels')

const adminSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter' },
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
    }
  },
  { timestamps: true }
)

adminSchema.pre('save', async function (next) {
  const admin = this
  const Admin = mongoose.model('Admin')
  if (!admin.id) {
    const lastAdmin = await Admin.findOne({}, {}, { sort: { id: -1 } })
    admin.id = lastAdmin ? lastAdmin.id + 1 : 1
  }
  next()
})

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin
