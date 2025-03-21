const Post = require('../models/postModel')
const Notification = require('../models/notificationModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')
const { parseDate } = require('../utils/funcs')
const { rankCandidatesForPost } = require('../service/candidateRanking')

const formatDate = (date) => {
  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const postController = {
  createPost: async (req, res) => {
    const { postData } = req.body

    try {
      let dateUpload
      if (postData.date_upload) {
        dateUpload = new Date(postData.date_upload)
      } else {
        dateUpload = new Date()
      }
      postData.date_upload = formatDate(dateUpload)

      let user
      if (postData.authorType === 'admin') {
        user = await Admin.findById(postData.author)
        if (user) {
          postData.location = { address: user.basic_info.address }
          postData.status = 'confirmed'
        }
      } else if (postData.authorType === 'recruiter') {
        user = await Recruiter.findById(postData.author)
        if (user) {
          postData.location = { address: user.basic_info.address }
          postData.status = 'posted'
        }
      }

      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' })
      }

      const newPost = await Post.create(postData)

      if (postData.authorType === 'admin') {
        await Admin.findByIdAndUpdate(
          postData.author,
          {
            $push: { posts: newPost._id, 'manage_post.confirmed': newPost._id }
          },
          { new: true }
        )
      } else if (postData.authorType === 'recruiter') {
        await Recruiter.findByIdAndUpdate(
          postData.author,
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

        if (updatedPost.date_upload) {
          updatedPost.date_upload = formatDate(
            new Date(updatedPost.date_upload)
          )
        }
        if (updatedPost.date_expiration) {
          updatedPost.date_expiration = formatDate(
            new Date(updatedPost.date_expiration)
          )

          const expirationDate = new Date(updatedPost.date_expiration)
          const currentDate = new Date()

          if (expirationDate < currentDate) {
            updatedPost.status = 'expired'
          } else {
            updatedPost.status = post.status
          }
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

      const currentDate = new Date()

      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          if (post.date_expiration) {
            const expirationDate = parseDate(post.date_expiration)

            if (expirationDate < currentDate && post.status !== 'expired') {
              post.status = 'expired'
              await post.save()
            }
          }

          return post
        })
      )
      res.status(200).json(updatedPosts)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy các bài Post:', error)
      res.status(500).json({ message: 'Không thể lấy các bài Post.' })
    }
  },
  getAllPostedPosts: async (req, res) => {
    try {
      const posts = await Post.find({ status: 'posted' })

      res.status(200).json(posts)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy các bài Post:', error)
      res.status(500).json({ message: 'Không thể lấy các bài Post.' })
    }
  },
  getAllConfirmedPosts: async (req, res) => {
    try {
      const posts = await Post.find({ status: 'confirmed' })

      const currentDate = new Date()

      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          if (post.date_expiration) {
            const expirationDate = parseDate(post.date_expiration)

            if (expirationDate < currentDate && post.status !== 'expired') {
              post.status = 'expired'
              await post.save()
            }
          }

          let author = await Recruiter.findById(post.author)
          if (!author) {
            author = await Admin.findById(post.author)
          }

          return {
            ...post.toObject(),
            // authorId: post.author,
            wforms: author?.other_info?.wforms || null,
            types: author?.other_info?.types || null
          }
        })
      )

      const confirmedPosts = updatedPosts.filter(
        (post) => post.status === 'confirmed'
      )

      res.status(200).json(confirmedPosts)
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy các bài Post:', error)
      res.status(500).json({ message: 'Không thể lấy các bài Post.' })
    }
  },

  getAllExpiredPosts: async (req, res) => {
    try {
      const posts = await Post.find({ status: 'expired' })

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
  // getPostById: async (req, res) => {
  //   const { postId } = req.params

  //   try {
  //     const post = await Post.findOne({
  //       _id: postId,
  //       author: userId,
  //       authorType
  //     })

  //     if (!post) {
  //       return res
  //         .status(404)
  //         .json({ message: 'Bài viết không tìm thấy hoặc bạn không có quyền' })
  //     }

  //     res.json(post)
  //   } catch (error) {
  //     res.status(500).json({ message: error.message })
  //   }
  // },
  getPostById: async (req, res) => {
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
      if (post.views >= 200) {
        updateType = 'superhot'
      } else if (post.views >= 100) {
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

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      if (post.quantity && post.applied.length >= post.quantity) {
        return res.status(400).json({ message: 'Đã đủ người cho bài viết' })
      }

      if (post.applied.includes(candidateId)) {
        return res
          .status(400)
          .json({ message: 'Ứng viên đã ứng tuyển vào bài viết này' })
      }

      if (post.approved.includes(candidateId)) {
        return res
          .status(400)
          .json({ message: 'Ứng viên đã được duyệt ở bài viết này' })
      }

      post.applied.push(candidateId)
      await post.save()

      if (!candidate.jobs.applied.includes(postId)) {
        candidate.jobs.applied.push(postId)
        await candidate.save()
      }

      let recruiterOrAdmin = await Recruiter.findById(post.author)
      if (!recruiterOrAdmin) {
        recruiterOrAdmin = await Admin.findById(post.author)
      }

      if (!recruiterOrAdmin) {
        return res
          .status(404)
          .json({ message: 'Không tìm thấy người tạo bài viết' })
      }

      const newNotification = new Notification({
        sender: candidateId,
        recipient: recruiterOrAdmin._id,
        title: 'Ứng viên mới đã ứng tuyển!',
        desc: `Ứng viên ${
          candidate.basic_info?.name || 'N/A'
        } đã ứng tuyển vào bài viết "${post.title}".`
      })

      await newNotification.save()

      recruiterOrAdmin.notifications.push(newNotification._id)
      await recruiterOrAdmin.save()

      res.json({
        message: 'Cập nhật ứng tuyển thành công',
        post,
        notification: newNotification
      })
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

      if (post.approved.includes(candidateId)) {
        return res
          .status(400)
          .json({ message: 'Ứng viên đã được duyệt cho bài viết này' })
      }

      if (post.quantity && post.approved.length >= post.quantity) {
        await post.save()
        return res.status(400).json({ message: 'Đã đủ người cho bài viết' })
      }

      post.approved.push(candidateId)

      const appliedIndex = post.applied.indexOf(candidateId)
      if (appliedIndex !== -1) {
        post.applied.splice(appliedIndex, 1)
      }

      await post.save()

      if (!candidate.jobs.approved.includes(postId)) {
        candidate.jobs.approved.push(postId)
      }

      const candidateAppliedIndex = candidate.jobs.applied.indexOf(postId)
      if (candidateAppliedIndex !== -1) {
        candidate.jobs.applied.splice(candidateAppliedIndex, 1)
      }

      await candidate.save()

      let recruiterOrAdmin = await Recruiter.findById(post.author)
      if (!recruiterOrAdmin) {
        recruiterOrAdmin = await Admin.findById(post.author)
      }

      if (!recruiterOrAdmin) {
        return res
          .status(404)
          .json({ message: 'Không tìm thấy người tạo bài viết' })
      }

      const newNotification = new Notification({
        sender: recruiterOrAdmin._id,
        recipient: candidate._id,
        title: 'Bạn đã được duyệt cho công việc!',
        desc: `Nhà tuyển dụng "${
          recruiterOrAdmin.basic_info?.name || 'N/A'
        }" đã chấp nhận bạn vào công việc "${post.title}".`
      })

      await newNotification.save()

      candidate.notifications.push(newNotification._id)
      await candidate.save()

      res.json({
        message: 'Duyệt ứng viên thành công',
        post,
        notification: newNotification
      })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateSavedJob: async (req, res) => {
    const { postId } = req.params
    const { candidateId } = req.body

    try {
      const [candidate, post] = await Promise.all([
        Candidate.findByIdAndUpdate(
          candidateId,
          { $addToSet: { 'jobs.saved': postId } },
          { new: true }
        ),
        Post.findByIdAndUpdate(
          postId,
          { $addToSet: { saved: candidateId } },
          { new: true }
        )
      ])

      if (!candidate) {
        return res.status(404).json({ message: 'Không tìm thấy ứng viên' })
      }
      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

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

  getAppliedCandidatesByPostId: async (req, res) => {
    const { postId } = req.params

    try {
      const post = await Post.findById(postId).populate('applied')

      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      res.status(200).json({ applied: post.applied })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getApprovedCandidatesByPostId: async (req, res) => {
    const { postId } = req.params

    try {
      const post = await Post.findById(postId).populate('approved')

      if (!post) {
        return res.status(404).json({ message: 'Không tìm thấy bài viết' })
      }

      res.status(200).json({ approved: post.approved })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getCandidateById: async (req, res) => {
    try {
      const { candidateId } = req.params

      const candidate = await Candidate.findById(candidateId).populate('userId')

      if (!candidate) {
        return res
          .status(404)
          .json({ success: false, message: 'Không tìm thấy ứng viên' })
      }

      res.status(200).json({ success: true, candidate })
    } catch (error) {
      console.error(error)
      res
        .status(500)
        .json({ success: false, message: 'Đã xảy ra lỗi khi lấy ứng viên' })
    }
  },
  cancelPost: async (req, res) => {
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

      if (post.status === 'cancelled') {
        return res.status(400).json({ message: 'Bài viết đã bị từ chối' })
      }

      post.status = 'cancelled'
      await post.save()

      await Admin.findByIdAndUpdate(userId, {
        $pull: { 'manage_post.posted': postId, 'manage_post.confirmed': postId }
      })

      await Recruiter.findByIdAndUpdate(authorId, {
        $pull: { 'manage_post.posted': postId, 'manage_post.confirmed': postId }
      })

      res.json({ message: 'Bài viết đã bị từ chối thành công', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getRankedCandidates: async (req, res) => {
    const { postId } = req.params
    try {
      const rankedCandidates = await rankCandidatesForPost(postId)
      return res.status(200).json({ success: true, data: rankedCandidates })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ success: false, error: error.message })
    }
  }
}

module.exports = postController
