const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/recruiterModels')
const Recruiter = require('../models/recruiterModels')

const recruiterControllers = {
  getDataById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const recruiter = await Recruiter.findOne({ id: id })
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const recruiter = await Recruiter.find()
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = recruiterControllers
