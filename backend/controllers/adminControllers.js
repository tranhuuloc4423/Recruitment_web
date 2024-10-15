const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const { uploadImage, uploadImages } = require('../utils/funcs')

const validateAddress = async (address) => {
  if (address && address.province && address.district && address.ward) {
    const provinceObj = await Address.findOne({ name: address.province })
    if (!provinceObj) {
      return { success: false, message: 'Tỉnh/Thành không tồn tại' }
    }

    const districtObj = provinceObj.districts.find(
      (district) => district.name === address.district
    )
    if (!districtObj) {
      return { success: false, message: 'Quận/Huyện không tồn tại' }
    }

    const wardObj = districtObj.wards.find((ward) => ward.name === address.ward)
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

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params
    const { field, tax_id, address, name, email, phone, image } = req.body

    try {
      const currentAdmin = await Admin.findById(adminId)
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      if (email) {
        const emailExists = await User.findOne({
          email: email,
          _id: { $ne: currentAdmin.userId }
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

      const imageResult = await uploadImage(currentAdmin, image, 'admin/basic')

      const basic_info = await Admin.findOneAndUpdate(
        { _id: adminId },
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
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' })

      res.json({ admin: basic_info, user: updatedUser })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params
    const { desc, speciality, types, wforms, images } = req.body
    let updateFields = {}

    try {
      const currentAdmin = await Admin.findById(adminId)
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
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

      const imagesResult = await uploadImages(
        currentAdmin,
        images,
        'admin/other'
      )

      if (images) {
        updateFields['other_info.images'] = imagesResult
      }

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Admin.findOneAndUpdate(
        { _id: adminId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getDataById: async (req, res) => {
    const { adminId } = req.params
    try {
      const admin = await Admin.findOne({ userId: adminId }).populate([
        { path: 'basic_info.address.province', select: 'name' },
        { path: 'basic_info.address.district', select: 'name' },
        { path: 'basic_info.address.ward', select: 'name' }
      ])

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  getAllData: async (req, res) => {
    try {
      const admin = await Admin.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate('posts')
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.status(200).json(admin.posts)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  },
  getConfirmedPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate(
        'manage_post.confirmed'
      )
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.status(200).json(admin.manage_post.confirmed)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  },
  getPostedPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate(
        'manage_post.posted'
      )
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.status(200).json(admin.manage_post.posted)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  }
}

module.exports = adminControllers
