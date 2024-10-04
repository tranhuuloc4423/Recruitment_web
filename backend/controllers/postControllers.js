const Post = require('../models/postModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')
const {
  updateAppliedJobs,
  updateSavedJobs
} = require('../controllers/candidateControllers')

const postController = {
  createPost: async (req, res) => {
    const { userId, userType, postData } = req.body

    try {
      postData.author = userId
      postData.authorType = userType

      if (userType === 'admin') {
        postData.status = 'confirmed'
      } else if (userType === 'recruiter') {
        postData.status = 'posted'
      }

      const newPost = await Post.create(postData)

      let user
      if (userType === 'admin') {
        user = await Admin.findByIdAndUpdate(
          userId,
          {
            $push: { posts: newPost._id, 'manage_post.confirmed': newPost._id }
          },
          { new: true }
        )
      } else if (userType === 'recruiter') {
        user = await Recruiter.findByIdAndUpdate(
          userId,
          {
            $push: { posts: newPost._id, 'manage_post.posted': newPost._id }
          },
          { new: true }
        )
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
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
      // Kiểm tra quyền sở hữu bài đăng
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })
      if (!post) {
        return res.status(404).json({ message: 'Author or Post not found' })
      }

      // Nếu `status` thay đổi, cần cập nhật `manage_post`
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

      // Cập nhật bài đăng
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
      // Kiểm tra quyền sở hữu bài đăng
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })
      if (!post) {
        return res.status(404).json({ message: 'Author or Post not found' })
      }

      // Xóa bài đăng
      await Post.findByIdAndDelete(postId)

      // Chuyển đổi `postId` sang ObjectId nếu cần thiết
      const postObjectId = mongoose.Types.ObjectId(postId)

      // Xóa tham chiếu bài đăng từ Admin hoặc Recruiter
      const Model = authorType === 'admin' ? Admin : Recruiter
      await Model.findByIdAndUpdate(
        userId,
        {
          $pull: {
            posts: postObjectId,
            'manage_post.confirmed': postObjectId,
            'manage_post.posted': postObjectId
          }
        },
        { new: true }
      )

      res.json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getAllPosts: async (req, res) => {
    const { userId } = req.params
    const { authorType } = req.body

    try {
      const posts = await Post.find({ author: userId, authorType })

      if (!posts || posts.length === 0) {
        return res
          .status(404)
          .json({ message: 'No posts found for this author' })
      }

      res.json(posts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getPostById: async (req, res) => {
    const { userId, postId } = req.params
    const { authorType } = req.body

    try {
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })

      if (!post) {
        return res
          .status(404)
          .json({ message: 'Post not found or you do not have access' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateViews: async (req, res) => {
    const { postId } = req.params // Lấy `postId` từ params

    try {
      // Tìm bài đăng và cập nhật trường `views`
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } }, // Tăng `views` thêm 1 mỗi khi có request đến
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.json({ message: 'Views updated successfully', post })
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
        return res.status(404).json({ message: 'Candidate not found' })
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { applied: candidateId } },
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      // Gọi hàm updateCandidate để cập nhật thông tin ứng viên
      await updateAppliedJobs(candidateId, postId)

      res.json({ message: 'Applied updated successfully', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateSaved: async (req, res) => {
    const { postId } = req.params
    const { candidateId } = req.body // Nhận `candidateId` và `postId` từ body

    try {
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { saved: candidateId } },
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      // Gọi hàm updateSavedJobs để cập nhật thông tin ứng viên
      await updateSavedJobs(candidateId, postId)

      res.json({ message: 'Saved job updated successfully', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateStatus: async (req, res) => {
    const { postId } = req.body
    const { userId, authorId } = req.body

    try {
      // Kiểm tra quyền của userId có phải admin không
      const admin = await Admin.findById(userId)
      if (!admin) {
        return res
          .status(403)
          .json({ message: 'User is not authorized as admin' })
      }

      // Tìm bài đăng
      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      // Kiểm tra trạng thái hiện tại của bài đăng
      const oldStatus = post.status
      if (oldStatus === 'confirmed') {
        return res.json({ message: 'Post is already confirmed', post })
      }

      // Nếu bài đăng có trạng thái là `posted`, cập nhật thành `confirmed`
      if (oldStatus === 'posted') {
        post.status = 'confirmed'
        await post.save()

        // Cập nhật `manage_post` của admin
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
          message: 'Post status updated to confirmed successfully',
          post
        })
      }

      res.status(400).json({ message: 'Invalid post status' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = postController
