const Recruiter = require('../models/recruiterModel')
const User = require('../models/userModel')

const recruiterControllers = {
  updateBasicInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { image, field, tax_id, address, name } = req.body

    try {
      const basic_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        {
          $set: {
            'basic_info.image': image,
            'basic_info.field': field,
            'basic_info.tax_id': tax_id,
            'basic_info.address': address,
            'basic_info.name': name
          }
        },
        { new: true }
      )

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        {
          $set: {
            name: name
          }
        },
        { new: true }
      )

      await updatedUser.save()

      if (!basic_info) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.status(200).json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { desc, speciality, images, types, wforms } = req.body

    try {
      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc
      if (speciality !== undefined)
        updateFields['other_info.speciality'] = speciality
      if (types !== undefined) updateFields['other_info.types'] = types
      if (wforms !== undefined) updateFields['other_info.wforms'] = wforms
      if (images !== undefined) updateFields['other_info.images'] = images
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getDataById: async (req, res) => {
    try {
      const { recruiterId } = req.params
      const recruiter = await Recruiter.findOne({ userId: recruiterId })
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
  },
  getPosts: async (req, res) => {
    try {
      const { userId } = req.params

      const recruiter = await Recruiter.findOne({ userId }).populate('posts')

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.posts)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  getConfirmedPosts: async (req, res) => {
    try {
      const { userId } = req.params

      const recruiter = await Recruiter.findOne({ userId }).populate(
        'manage_post.confirmed'
      )

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.manage_post.confirmed)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },
  getPostedPosts: async (req, res) => {
    try {
      const { userId } = req.params

      const recruiter = await Recruiter.findOne({ userId }).populate(
        'manage_post.posted'
      )

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.manage_post.posted)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = recruiterControllers
