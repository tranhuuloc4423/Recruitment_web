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
    const id = parseInt(req.params.id)
    const { image, dob, phone, address, gender } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        {
          $set: {
            'basic_info.image': image,
            'basic_info.dob': dob,
            'basic_info.phone': phone,
            'basic_info.address': address,
            'basic_info.gender': gender
          }
        },
        { new: true }
      )

      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const id = parseInt(req.params.id)
    const { desc, education, exps, skills, projects, certificates } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        {
          $set: {
            'other_info.desc': desc,
            'other_info.education': education,
            'other_info.exps': exps,
            'other_info.skills': skills,
            'other_info.projects': projects,
            'other_info.certificates': certificates
          }
        },
        { new: true }
      )

      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateTarget: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const target = await Candidate.findOneAndUpdate({ id: id }, req.body, {
        new: true
      })
      res.status(200).json(target)
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
  },
  updateSavedJobs: async (req, res) => {
    const id = parseInt(req.params.id)
    const { post_info } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        { $push: { 'jobs.saved': { post_info } } },
        { new: true }
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateAppliedJobs: async (req, res) => {
    const id = parseInt(req.params.id)
    const { post_info } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        { $push: { 'jobs.applied': { post_info } } },
        { new: true }
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateFollowedCompanies: async (req, res) => {
    const id = parseInt(req.params.id)
    const { company_info } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        { $push: { 'jobs.followed': { company_info } } },
        { new: true }
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateNotifications: async (req, res) => {
    const id = parseInt(req.params.id)
    const { notification } = req.body

    try {
      const candidate = await Candidate.findByIdAndUpdate(
        { id: id },
        { $push: { notifications: { notification } } },
        { new: true }
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }
      res.json(candidate)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = candidateControllers
