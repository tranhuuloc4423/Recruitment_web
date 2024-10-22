const Recruiter = require('../models/recruiterModel')
const User = require('../models/userModel')
const { uploadImage, uploadImages, validateAddress } = require('../utils/funcs')

const recruiterControllers = {
  updateBasicInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { field, tax_id, address, name, email, phone, image } = req.body

    try {
      const currentRecruiter = await Recruiter.findById(recruiterId)
      if (!currentRecruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }

      if (email) {
        const emailExists = await User.findOne({
          email: email,
          _id: { $ne: currentRecruiter.userId }
        })
        if (emailExists) {
          return res
            .status(400)
            .json({ message: 'Email đã tồn tại trong hệ thống' })
        }
      }

      let updatedAddress = {}
      if (address) {
        const { success, message, validatedAddress } = await validateAddress(
          address
        )
        if (!success) {
          return res.status(400).json({ message })
        }
        updatedAddress = validatedAddress
      }

      const imageResult = await uploadImage(
        currentRecruiter,
        image,
        'recruiter/basic'
      )

      const basic_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        {
          $set: {
            'basic_info.image': imageResult,
            'basic_info.field': field,
            'basic_info.tax_id': tax_id,
            'basic_info.address': updatedAddress,
            'basic_info.name': name,
            'basic_info.email': email,
            'basic_info.phone': phone
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      await updatedUser.save()

      res.json({
        message: 'Cập nhật thành công!',
        data: basic_info
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { desc, speciality, types, wforms, images } = req.body
    let updateFields = {}

    try {
      const currentRecruiter = await Recruiter.findById(recruiterId)
      if (!currentRecruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }

      if (desc) updateFields['other_info.desc'] = desc
      if (speciality) {
        updateFields['other_info.speciality'] = Array.isArray(speciality)
          ? speciality
          : [speciality]
      }
      if (types) {
        updateFields['other_info.types'] = types.map((item) => ({
          name: item.name,
          value: item.value
        }))
      }
      if (wforms) {
        updateFields['other_info.wforms'] = wforms.map((item) => ({
          name: item.name,
          value: item.value
        }))
      }

      const imagesResult = await uploadImages(
        currentRecruiter,
        images,
        'recruiter/other'
      )

      if (images) {
        updateFields['other_info.images'] = imagesResult
      }

      if (Object.keys(updateFields).length === 0) {
        return res
          .status(400)
          .json({ message: 'Không có trường nào để cập nhật' })
      }

      const other_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }

      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getDataById: async (req, res) => {
    const { recruiterId } = req.params
    try {
      const recruiter = await Recruiter.findOne({
        userId: recruiterId
      })

      if (!recruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getDataByIdRole: async (req, res) => {
    const { recruiterId } = req.params
    try {
      const recruiter = await Recruiter.findOne(recruiterId)

      if (!recruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }
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
      const recruiter = await Recruiter.findById(req.params.id).populate(
        'posts'
      )
      if (!recruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }
      res.status(200).json(recruiter.posts)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  },

  getConfirmedPosts: async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id).populate(
        'manage_post.confirmed'
      )
      if (!recruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }
      res.status(200).json(recruiter.manage_post.confirmed)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  },

  getPostedPosts: async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id).populate(
        'manage_post.posted'
      )
      if (!recruiter) {
        return res.status(404).json({ message: 'Nhà tuyển dụng không tồn tại' })
      }
      res.status(200).json(recruiter.manage_post.posted)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  }
}

module.exports = recruiterControllers
