const mongoose = require('mongoose')
const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Address = require('../models/addressModel')

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

const adminControllers = {
  // Cập nhật thông tin cơ bản của Admin
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params
    const { image, field, tax_id, address, name, email, phone } = req.body

    try {
      const currentAdmin = await Admin.findById(adminId)
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      // Kiểm tra email trùng lặp
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

      // Cập nhật thông tin cơ bản của Admin
      const basic_info = await Admin.findOneAndUpdate(
        { _id: adminId },
        {
          $set: {
            'basic_info.image': image,
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

      // Cập nhật thông tin trong bảng User liên quan
      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      await updatedUser.save()

      res.json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Cập nhật thông tin khác của Admin
  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params
    const { desc, speciality, images, types, wforms } = req.body

    try {
      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc
      if (speciality !== undefined)
        updateFields['other_info.speciality'] = Array.isArray(speciality)
          ? speciality
          : [speciality]
      if (types !== undefined)
        updateFields['other_info.types'] = types.map((item) => ({
          label: item.label,
          value: item.value
        }))
      if (wforms !== undefined)
        updateFields['other_info.wforms'] = wforms.map((item) => ({
          label: item.label,
          value: item.value
        }))
      if (images !== undefined) updateFields['other_info.images'] = images

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

  // Lấy thông tin chi tiết của Admin theo ID
  getDataById: async (req, res) => {
    const { adminId } = req.params
    try {
      const admin = await Admin.findById(adminId).populate([
        { path: 'basic_info.address.province', select: 'name' },
        { path: 'basic_info.address.district', select: 'name' },
        { path: 'basic_info.address.ward', select: 'name' },
        { path: 'other_info.speciality', select: 'label value' }
      ])

      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  // Lấy tất cả thông tin Admin
  getAllData: async (req, res) => {
    try {
      const admin = await Admin.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = adminControllers
