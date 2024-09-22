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
      const { id } = req.params
      const updateData = req.body

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid candidate ID format' })
      }

      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: id },
        { $set: { basic_info: updateData } },
        { new: true, runValidators: true }
      )

      if (!updatedCandidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      res.status(200).json(updatedCandidate)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  },
  getDataById: async (req, res) => {
    try {
      const { id } = req.params

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid candidate ID format' })
      }

      const candidate = await Candidate.findById(id)

      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      res.status(200).json(candidate)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = candidateControllers
