const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/candidateModels')
const Candidate = require('../models/candidateModels')

const candidateControllers = {
  updateBasicInfo: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const basic_info = await Candidate.findOneAndUpdate(
        { id: id },
        req.body,
        {
          new: true
        }
      )
      res.status(200).json(basic_info)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const candidate = await Candidate.findOne({ id: id })
      res.status(200).json(candidate)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const candidate = await Candidate.find()
      res.status(200).json(candidate)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = candidateControllers
