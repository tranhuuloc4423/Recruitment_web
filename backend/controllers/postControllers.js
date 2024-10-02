const Post = require('../models/postModel')
const Admin = require('../models/adminModel')
const Recruiter = require('../models/recruiterModel')
const Candidate = require('../models/candidateModel')

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
    const { postId } = req.params // Lấy `postId` từ params
    const { candidateId } = req.body // Nhận `candidateId` từ body

    try {
      // Kiểm tra xem `candidateId` có hợp lệ không
      const candidate = await Candidate.findById(candidateId)
      if (!candidate) {
        return res.status(404).json({ message: 'Candidate not found' })
      }

      // Thêm `_id` của `candidate` vào mảng `applied` trong bài đăng
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { applied: candidateId } }, // Thêm `candidateId` vào mảng `applied`
        { new: true }
      )

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.json({ message: 'Applied updated successfully', post })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Hàm lấy bài đăng và sử dụng `populate` để lấy chi tiết thông tin của các ứng viên đã nộp đơn
  getPostWithApplicants: async (req, res) => {
    const { postId } = req.params

    try {
      // Sử dụng `populate` để lấy chi tiết thông tin ứng viên từ `applied`
      const post = await Post.findById(postId).populate('applied')

      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = postController
