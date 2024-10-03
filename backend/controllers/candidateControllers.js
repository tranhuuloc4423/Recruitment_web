const Candidate = require('../models/candidateModel')
const User = require('../models/userModel')

const candidateControllers = {
  updateBasicInfo: async (req, res) => {
    const { candidateId } = req.params // candidateId là _id của User, kiểu String
    const { image, dob, phone, address, gender, email, name } = req.body

    try {
      // Tìm kiếm và cập nhật Candidate bằng _id
      const basic_info = await Candidate.findOneAndUpdate(
        { id: candidateId }, // `id` của Candidate là chuỗi từ `User._id`
        {
          $set: {
            'basic_info.image': image,
            'basic_info.dob': dob,
            'basic_info.phone': phone,
            'basic_info.address': address,
            'basic_info.gender': gender,
            'basic_info.email': email,
            'basic_info.name': name
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      // Tìm kiếm và cập nhật User bằng _id (chuyển từ candidateId sang ObjectId)
      const updatedUser = await User.findOneAndUpdate(
        candidateId, // Sử dụng `_id` của User để tìm kiếm
        {
          $set: {
            email: email,
            name: name
          }
        },
        { new: true }
      )

      await updatedUser.save()

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.json({ candidate: basic_info, user: updatedUser })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const { candidateId } = req.params
    const { desc, education, exps, skills, projects, certificates } = req.body

    try {
      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc
      if (education !== undefined)
        updateFields['other_info.education'] = education
      if (exps !== undefined) updateFields['other_info.exps'] = exps
      if (skills !== undefined) updateFields['other_info.skills'] = skills
      if (projects !== undefined) updateFields['other_info.projects'] = projects
      if (certificates !== undefined)
        updateFields['other_info.certificates'] = certificates

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Candidate.findOneAndUpdate(
        { id: candidateId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      res.json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateTarget: async (req, res) => {
    try {
      const { candidateId } = req.params
      const target = await Candidate.findOneAndUpdate(
        { id: candidateId },
        req.body,
        {
          new: true
        }
      )
      res.status(200).json(target)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const { candidateId } = req.params
      const candidate = await Candidate.findOne({ id: candidateId })
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
  updateAppliedJobs: async (candidateId, postId) => {
    try {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $push: { 'jobs.applied': postId } },
        { new: true }
      )

      if (!updatedCandidate) {
        throw new Error('Candidate not found or update failed')
      }

      return updatedCandidate
    } catch (error) {
      throw new Error(error.message)
    }
  },
  updateSavedJobs: async (candidateId, postId) => {
    try {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $push: { 'jobs.saved': postId } },
        { new: true }
      )

      if (!updatedCandidate) {
        throw new Error('Candidate not found or update failed')
      }

      return updatedCandidate
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = candidateControllers
