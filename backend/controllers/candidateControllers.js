const mongoose = require('mongoose')
const Candidate = require('../models/candidateModel')
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const Post = require('../models/postModel')

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

const candidateControllers = {
  updateBasicInfo: async (req, res) => {
    const { candidateId } = req.params
    const { image, dob, phone, address, gender, name, email } = req.body

    try {
      const currentCandidate = await Candidate.findById(candidateId)
      if (!currentCandidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      // Kiểm tra email trùng lặp
      if (email) {
        const emailExists = await User.findOne({
          email,
          _id: { $ne: currentCandidate.userId }
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

      // Cập nhật thông tin cơ bản của ứng viên
      const basic_info = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        {
          $set: {
            'basic_info.image': image,
            'basic_info.dob': dob,
            'basic_info.phone': phone,
            'basic_info.gender': gender,
            'basic_info.name': name,
            'basic_info.email': email,
            'basic_info.address': updatedAddress
          }
        },
        { new: true }
      )

      if (!basic_info)
        return res.status(404).json({ message: 'Candidate not found' })

      // Cập nhật thông tin người dùng liên quan
      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      if (!updatedUser)
        return res.status(404).json({ message: 'User not found' })

      res.json({ candidate: basic_info, user: updatedUser })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { candidateId } = req.params
    const { desc, education, exps, skills, projects, certificates } = req.body

    try {
      const updateFields = {}
      if (desc) updateFields['other_info.desc'] = desc
      if (education) updateFields['other_info.education'] = education
      if (exps) updateFields['other_info.exps'] = exps
      if (skills)
        updateFields['other_info.skills'] = skills.map((skillId) =>
          mongoose.Types.ObjectId(skillId)
        )
      if (projects) updateFields['other_info.projects'] = projects
      if (certificates) updateFields['other_info.certificates'] = certificates

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info)
        return res.status(404).json({ message: 'Candidate not found' })
      res.json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateTarget: async (req, res) => {
    const { candidateId } = req.params
    const { target_money, skills, types, address, wforms } = req.body

    try {
      const updateFields = {}
      if (target_money) {
        updateFields['target.target_money.min_money'] = target_money.min_money
        updateFields['target.target_money.max_money'] = target_money.max_money
      }
      if (skills) updateFields['target.skills'] = skills
      if (types) updateFields['target.types'] = types
      if (address && address.province)
        updateFields['target.address.province'] = address.province
      if (wforms) updateFields['target.wforms'] = wforms

      const updatedTarget = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $set: updateFields },
        { new: true }
      )

      if (!updatedTarget)
        return res.status(404).json({ message: 'Candidate not found' })
      res.json(updatedTarget)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getDataById: async (req, res) => {
    try {
      const { candidateId } = req.params
      const candidate = await Candidate.findOne({ userId: candidateId })
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
  getSavedJobs: async (req, res) => {
    try {
      const candidateId = req.params.candidateId
      const candidate = await Candidate.findById(candidateId).populate(
        'jobs.saved'
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }
      res.status(200).json(candidate.jobs.saved)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi lấy công việc đã lưu' })
    }
  },
  getRecentJobs: async (req, res) => {
    try {
      const candidateId = req.params.candidateId
      const candidate = await Candidate.findById(candidateId).populate(
        'jobs.recent'
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }
      res.status(200).json(candidate.jobs.recent)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi lấy công việc gần đây' })
    }
  },
  getAppliedJobs: async (req, res) => {
    try {
      const candidateId = req.params.candidateId
      const candidate = await Candidate.findById(candidateId).populate(
        'jobs.applied'
      )
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }
      res.status(200).json(candidate.jobs.applied)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi lấy công việc đã ứng tuyển' })
    }
  },
  getFollowedJobs: async (req, res) => {
    try {
      const candidateId = req.params.candidateId
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }
      res.status(200).json(candidate.jobs.followed)
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy nhà tuyển dụng đang theo dõi' })
    }
  },
  followUser: async (req, res) => {
    try {
      const { candidateId } = req.params
      const { userIdToFollow } = req.body
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }

      if (candidate.jobs.followed.includes(userIdToFollow)) {
        return res
          .status(400)
          .json({ message: 'Bạn đã theo dõi người dùng này' })
      }

      candidate.jobs.followed.push(userIdToFollow)
      await candidate.save()

      res.status(200).json({
        message: 'Theo dõi thành công',
        followed: candidate.jobs.followed
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi theo dõi người dùng' })
    }
  },
  updateRecent: async (req, res) => {
    try {
      const { candidateId } = req.params
      const { postId } = req.body

      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      if (!candidate.jobs.recent.includes(postId)) {
        candidate.jobs.recent.push(postId)
      }

      await candidate.save()

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: 'Server error', error })
    }
  }
}

module.exports = candidateControllers
