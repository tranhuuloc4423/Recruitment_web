const Post = require('../models/postModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')

const postController = {
  updateAppliedJobs: async (candidateId, postId) => {
    try {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $push: { 'jobs.applied': postId } },
        { new: true }
      )

      if (!updatedCandidate) {
        throw new Error('Không tìm thấy ứng viên hoặc cập nhật thất bại')
      }

      return updatedCandidate
    } catch (error) {
      throw new Error(error.message)
    }
  },
  updateApprovedJobs: async (candidateId, postId) => {
    try {
      const updatedCandidate = await Candidate.findOneAndUpdate(
        { _id: candidateId },
        { $push: { 'jobs.approved': postId } },
        { new: true }
      )

      if (!updatedCandidate) {
        throw new Error('Không tìm thấy ứng viên hoặc cập nhật thất bại')
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
        throw new Error('Không tìm thấy ứng viên hoặc cập nhật thất bại')
      }

      return updatedCandidate
    } catch (error) {
      throw new Error(error.message)
    }
  },
  createPost: async (req, res) => {
    const { userId, userType, postData } = req.body

    try {
      postData.location = { address: user.basic_info.address }

      const currentDate = new Date()

      // Lấy ngày, tháng, năm hiện tại
      const day = String(currentDate.getDate()).padStart(2, '0')
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const year = currentDate.getFullYear()

      postData.date_upload = `${day}/${month}/${year}`

      let user
      if (userType === 'admin') {
        user = await Admin.findById(userId)
        if (user) {
          // console.log(user.basic_info.address)

          postData.status = 'confirmed'
        }
      } else if (userType === 'recruiter') {
        user = await Recruiter.findById(userId)
        if (user) {
          // console.log(user.basic_info.address)
          postData.status = 'posted'
        }
      }

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' })
      }

      const newPost = await Post.create(postData)

      if (userType === 'admin') {
        await Admin.findByIdAndUpdate(
          userId,
          {
            $push: { posts: newPost._id, 'manage_post.confirmed': newPost._id }
          },
          { new: true }
        )
      } else if (userType === 'recruiter') {
        await Recruiter.findByIdAndUpdate(
          userId,
          {
            $push: { posts: newPost._id, 'manage_post.posted': newPost._id }
          },
          { new: true }
        )
      }

      res.status(201).json(newPost)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updatePost: async (req, res) => {
    const { postId } = req.params
    const { userId, authorType, updatedPost } = req.body

    try {
      const post = await Post.findById(postId)
      if (!post) {
        return res
          .status(404)
          .json({ message: 'Chủ sở hữu hoặc bài viết không tìm thấy' })
      }

      if (!updatedPost.location) {
        let user
        if (authorType === 'admin') {
          user = await Admin.findById(userId)
        } else if (authorType === 'recruiter') {
          user = await Recruiter.findById(userId)
        }

        if (user && user.basic_info && user.basic_info.address) {
          updatedPost.location = { address: user.basic_info.address }
        }
      }

      const oldStatus = post.status
      const newStatus = updatedPost.status
      if (oldStatus !== newStatus) {
        const adminUpdate = {}
        const recruiterUpdate = {}
        if (newStatus === 'confirmed') {
          adminUpdate['$push'] = { 'manage_post.confirmed': postId }
          adminUpdate['$pull'] = { 'manage_post.posted': postId }
          recruiterUpdate['$push'] = { 'manage_post.confirmed': postId }
          recruiterUpdate['$pull'] = { 'manage_post.posted': postId }
        } else if (newStatus === 'posted') {
          adminUpdate['$push'] = { 'manage_post.posted': postId }
          adminUpdate['$pull'] = { 'manage_post.confirmed': postId }
          recruiterUpdate['$push'] = { 'manage_post.posted': postId }
          recruiterUpdate['$pull'] = { 'manage_post.confirmed': postId }
        }

        if (authorType === 'admin') {
          await Admin.findByIdAndUpdate(userId, adminUpdate, { new: true })
        } else if (authorType === 'recruiter') {
          await Recruiter.findByIdAndUpdate(userId, recruiterUpdate, {
            new: true
          })
        }
      }

      const updated = await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true
      })
      res.json(updated)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  deletePost: async (req, res) => {
    const { postId } = req.params
    const { userId, authorType } = req.body

    console.log(postId)
    console.log(userId)
    console.log(authorType)

    try {
      const post = await Post.findById(postId)
      if (!post) {
        return res
          .status(404)
          .json({ message: 'Chủ sở hữu hoặc bài viết không tìm thấy' })
      }

      await Post.findByIdAndDelete(postId)

      const Model = authorType === 'admin' ? Admin : Recruiter
      await Model.findByIdAndUpdate(
        userId,
        {
          $pull: {
            posts: postId,
            'manage_post.confirmed': postId,
            'manage_post.posted': postId
          }
        },
        { new: true }
      )

      res.json({ message: 'Bài viết đã xóa thành công' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()

      res.status(200).json(posts)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy các bài Post:', error)
      res.status(500).json({ message: 'Không thể lấy các bài Post.' })
    }
  },
  getAllConfirmedPosts: async (req, res) => {
    try {
      const posts = await Post.find({ status: 'confirmed' })

      res.status(200).json(posts)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy các bài Post:', error)
      res.status(500).json({ message: 'Không thể lấy các bài Post.' })
    }
  },
  getPostByUserId: async (req, res) => {
    const { userId } = req.params

    try {
      const posts = await Post.find({ author: userId })

      if (!posts || posts.length === 0) {
        return res
          .status(404)
          .json({ message: 'Không tìm thấy bài viết cho chủ sở hữu này.' })
      }

      res.json(posts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getPostById: async (req, res) => {
    const { postId } = req.params
    const { userId, authorType } = req.body

    try {
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })

      if (!post) {
        return res
          .status(404)
          .json({ message: 'Bài viết không tìm thấy hoặc bạn không có quyền' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateViews: async (req, res) => {
    const { postId } = req.params

    try {
      let post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } },
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Bài viết không tìm thấy' })
      }

      let updateType = null
      if (post.views >= 200 && post.type !== 'superhot') {
        updateType = 'superhot'
      } else if (post.views >= 100 && post.type !== 'hot') {
        updateType = 'hot'
      }

      if (updateType) {
        post = await Post.findByIdAndUpdate(
          postId,
          { type: updateType },
          { new: true }
        )
      }

      res.json({ message: 'Lượt xem cập nhật thành công', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateApplied: async (req, res) => {
    const { postId } = req.params
    const { candidateId } = req.body

    try {
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { applied: candidateId } },
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      await updateAppliedJobs(candidateId, postId)

      res.json({ message: 'Cập nhật ứng tuyển thành công', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateApproved: async (req, res) => {
    const { postId } = req.params
    const { candidateId } = req.body

    try {
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      if (post.quantity && post.approved.length >= post.quantity) {
        return res.status(400).json({ message: 'Đã đủ người được tuyển' })
      }

      post.approved.push(candidateId)
      await post.save()

      await updateApprovedJobs(candidateId, postId)

      res.json({ message: 'Cập nhật duyệt ứng viên thành công', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateSaved: async (req, res) => {
    const { postId } = req.params
    const { candidateId } = req.body

    try {
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { saved: candidateId } },
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      await updateSavedJobs(candidateId, postId)

      res.json({ message: 'Lưu công việc thành công', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateStatus: async (req, res) => {
    const { postId } = req.params
    const { userId, authorId } = req.body

    try {
      const admin = await Admin.findById(userId)
      if (!admin) {
        return res
          .status(403)
          .json({ message: 'Tài khoản không phải là admin' })
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Bài viết không tìm thấy' })
      }

      const oldStatus = post.status
      if (oldStatus === 'confirmed') {
        return res.json({ message: 'Bài viết này đã được duyệt', post })
      }

      if (oldStatus === 'posted') {
        post.status = 'confirmed'
        await post.save()

        await Admin.findOneAndUpdate(
          { _id: userId },
          {
            $push: { 'manage_post.confirmed': postId },
            $pull: { 'manage_post.posted': postId }
          }
        )

        await Recruiter.findOneAndUpdate(
          { _id: authorId },
          {
            $push: { 'manage_post.confirmed': postId },
            $pull: { 'manage_post.posted': postId }
          }
        )

        return res.json({
          message: 'Trạng thái bài viết cập nhật thành công',
          post
        })
      }

      res.status(400).json({ message: 'Trạng thái bài đăng không hợp lệ' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  searchPosts: async (req, res) => {
    try {
      const { value } = req.query // Lấy giá trị tìm kiếm từ query parameter

      // Sử dụng regex để tìm kiếm không phân biệt hoa/thường
      const posts = await Post.find({
        $or: [
          { title: { $regex: value, $options: 'i' } },
          { skills: { $regex: value, $options: 'i' } },
          { 'location.address': { $regex: value, $options: 'i' } }
        ]
      })

      res.status(200).json(posts)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tìm kiếm bài post', error })
    }
  }
}

module.exports = postController
