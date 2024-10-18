const Candidate = require('../models/candidateModel')
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const Post = require('../models/postModel')
const { uploadImage } = require('../utils/funcs')

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

    return {
      success: true,
      validatedAddress: {
        province: { name: provinceObj.name, code: provinceObj.code },
        district: { name: districtObj.name, code: districtObj.code },
        ward: { name: wardObj.name, code: wardObj.code }
      }
    }
  }

  return {
    success: false,
    message: 'Địa chỉ không hợp lệ hoặc thiếu thông tin'
  }
}

const candidateControllers = {
  updateBasicInfo: async (req, res) => {
    const { candidateId } = req.params
    const { dob, phone, address, gender, name, email } = req.body

    try {
      const currentCandidate = await Candidate.findById(candidateId)
      if (!currentCandidate) {
        return res.status(404).json({ message: 'Ứng viên không tồn tại' })
      }

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

      const basic_info = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        {
          $set: {
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
        return res.status(404).json({ message: 'Ứng viên không tồn tại' })

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      if (!updatedUser)
        return res.status(404).json({ message: 'Người dùng không tồn tại' })

      res.json({ candidate: basic_info, user: updatedUser })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { candidateId } = req.params
    const { desc, education, exps, skills, projects, certificates } = req.body
    let updateFields = {}

    try {
      if (desc) updateFields['other_info.desc'] = desc
      if (education) updateFields['other_info.education'] = education
      if (exps) updateFields['other_info.exps'] = exps
      if (skills) {
        updateFields['other_info.skills'] = Array.isArray(skills)
          ? skills
          : [skills]
      }
      if (projects) updateFields['other_info.projects'] = projects
      if (certificates) updateFields['other_info.certificates'] = certificates

      if (Object.keys(updateFields).length === 0) {
        return res
          .status(400)
          .json({ message: 'Không có trường nào để cập nhật' })
      }

      const other_info = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info)
        return res.status(404).json({ message: 'Ứng viên không tồn tại' })
      res.json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateTarget: async (req, res) => {
    const { candidateId } = req.params
    const { target_money, skills, types, address, wforms } = req.body
    let updateFields = {}

    try {
      if (target_money) {
        updateFields['target.target_money.min_money'] = target_money.min_money
        updateFields['target.target_money.max_money'] = target_money.max_money
      }

      if (skills) updateFields['target.skills'] = skills
      if (types) updateFields['target.types'] = types

      if (address) {
        if (address.province) {
          updateFields['target.address.province.name'] = address.province.name
          updateFields['target.address.province.code'] = address.province.code
        }
      }
      if (wforms) updateFields['target.wforms'] = wforms

      const updatedTarget = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $set: updateFields },
        { new: true }
      )

      if (!updatedTarget)
        return res.status(404).json({ message: 'Ứng viên không tồn tại' })

      res.json(updatedTarget)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getDataById: async (req, res) => {
    const { candidateId } = req.params
    try {
      const candidate = await Candidate.findOne({
        userId: candidateId
      })
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
        return res.status(404).json({ message: 'Ứng viên không tồn tại' })
      }

      if (!candidate.jobs.recent.includes(postId)) {
        candidate.jobs.recent.push(postId)
      }

      await candidate.save()

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' })
      }

      res.status(200).json(post)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  }
}

module.exports = candidateControllers
