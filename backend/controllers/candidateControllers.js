const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/userModels')
const Candidate = require('../models/candidateModels')
const mongoose = require('mongoose')

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
  }
}

module.exports = candidateControllers
