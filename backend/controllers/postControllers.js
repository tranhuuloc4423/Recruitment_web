const Post = require('../models/PostModels')
const Admin = require('../models/AdminModels')
const Recruiter = require('../models/RecruiterModels')

const postController = {
  // Tạo bài đăng mới cho Admin hoặc Recruiter
  createPost: async (req, res) => {
    const { userId, userType } = req.params // userId và userType (admin/recruiter)
    const postData = req.body

    try {
      // Tạo bài đăng mới
      const newPost = await Post.create(postData)

      // Thêm `author` và `authorType` cho bài đăng
      newPost.author = userId
      newPost.authorType = userType
      await newPost.save()

      let user
      if (userType === 'admin') {
        user = await Admin.findByIdAndUpdate(
          userId,
          { $push: { posts: newPost._id } }, // Lưu trực tiếp ObjectId vào mảng `posts`
          { new: true }
        )
      } else if (userType === 'recruiter') {
        user = await Recruiter.findByIdAndUpdate(
          userId,
          { $push: { posts: newPost._id } }, // Lưu trực tiếp ObjectId vào mảng `posts`
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

  // Cập nhật bài đăng theo `postId`
  updatePost: async (req, res) => {
    const { userId, postId, authorType } = req.params
    const updatedPost = req.body

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

      // Cập nhật bài đăng
      const updated = await Post.findByIdAndUpdate(postId, updatedPost, {
        new: true
      })
      res.json(updated)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Xóa bài đăng theo `postId`
  deletePost: async (req, res) => {
    const { userId, postId, authorType } = req.params

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
        { $pull: { posts: postObjectId } }, // Xóa `postObjectId` khỏi mảng `posts`
        { new: true }
      )

      res.json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Lấy tất cả bài đăng của Admin hoặc Recruiter
  getAllPosts: async (req, res) => {
    const { userId, authorType } = req.params

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

  // Lấy bài đăng theo `postId`
  getPostById: async (req, res) => {
    const { userId, postId, authorType } = req.params

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
  }
}

module.exports = postController
