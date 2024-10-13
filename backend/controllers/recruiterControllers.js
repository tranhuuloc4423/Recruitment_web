const Recruiter = require('../models/recruiterModel')
const Address = require('../models/addressModel')
const User = require('../models/userModel')
const Skill = require('../models/skillModel')
const Image = require('../models/imageModel')

const validateAddress = async (address) => {
  if (address && address.province && address.district && address.ward) {
    const provinceObj = await Address.findById(address.province)
    if (!provinceObj) {
      return { success: false, message: 'Tỉnh/Thành không tồn tại' }
    }

    const districtObj = provinceObj.districts.id(address.district)
    if (!districtObj) {
      return { success: false, message: 'Quận/Huyện không tồn tại' }
    }

    const wardObj = districtObj.wards.id(address.ward)
    if (!wardObj) {
      return { success: false, message: 'Phường/Xã không tồn tại' }
    }

    return { success: true, validatedAddress: address }
  }

  return {
    success: false,
    message: 'Địa chỉ không hợp lệ hoặc thiếu thông tin'
  }
}

const recruiterControllers = {
  updateBasicInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { field, tax_id, address, name, email, phone } = req.body
    let imageId = null

    try {
      const currentRecruiter = await Recruiter.findById(recruiterId)
      if (!currentRecruiter) {
        return res.status(404).json({ message: 'Recruiter không tồn tại' })
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

      if (req.file) {
        const { path, filename } = req.file
        const newImage = new Image({
          public_id: filename,
          url: path
        })
        const savedImage = await newImage.save()
        imageId = savedImage._id
      }

      const basic_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        {
          $set: {
            'basic_info.image': imageId,
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
        return res.status(404).json({ message: 'Recruiter không tồn tại' })
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
    const { desc, speciality, types, wforms } = req.body
    let updateFields = {}

    try {
      if (desc) updateFields['other_info.desc'] = desc
      if (speciality) {
        updateFields['other_info.speciality'] = Array.isArray(speciality)
          ? speciality
          : [speciality]
      }
      if (types) {
        updateFields['other_info.types'] = types.map((item) => ({
          label: item.label,
          value: item.value
        }))
      }
      if (wforms) {
        updateFields['other_info.wforms'] = wforms.map((item) => ({
          label: item.label,
          value: item.value
        }))
      }

      if (req.files && req.files.length > 0) {
        const savedImages = await Promise.all(
          req.files.map(async (file) => {
            const newImage = new Image({
              public_id: file.filename,
              url: file.path
            })
            const savedImage = await newImage.save()
            return savedImage._id
          })
        )
        updateFields['other_info.images'] = savedImages
      }

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
    const { recruiterId } = req.params
    try {
      const recruiter = await Recruiter.findOne({
        userId: recruiterId
      }).populate([
        { path: 'basic_info.address.province', select: 'name' },
        { path: 'basic_info.address.district', select: 'name' },
        { path: 'basic_info.address.ward', select: 'name' }
      ])

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
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
        return res.status(404).json({ message: 'Recruiter not found' })
      }
      res.status(200).json(recruiter.posts)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  },

  getConfirmedPosts: async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id).populate(
        'manage_post.confirmed'
      )
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }
      res.status(200).json(recruiter.manage_post.confirmed)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  },

  getPostedPosts: async (req, res) => {
    try {
      const recruiter = await Recruiter.findById(req.params.id).populate(
        'manage_post.posted'
      )
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }
      res.status(200).json(recruiter.manage_post.posted)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  }
}

module.exports = recruiterControllers
