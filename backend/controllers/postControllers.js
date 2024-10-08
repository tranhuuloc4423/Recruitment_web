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
        throw new Error('Candidate not found or update failed')
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
        throw new Error('Candidate not found or update failed')
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
        throw new Error('Candidate not found or update failed')
      }

      return updatedCandidate
    } catch (error) {
      throw new Error(error.message)
    }
  },
  createPost: async (req, res) => {
    const { userId, userType, postData } = req.body

    try {
      postData.author = userId
      postData.authorType = userType

      let user
      if (userType === 'admin') {
        user = await Admin.findById(userId)
        if (user) {
          postData.location = { address: user.basic_info.address }
          postData.status = 'confirmed'
        }
      } else if (userType === 'recruiter') {
        user = await Recruiter.findById(userId)
        if (user) {
          postData.location = { address: user.basic_info.address }
          postData.status = 'posted'
        }
      }

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
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
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })
      if (!post) {
        return res.status(404).json({ message: 'Author or Post not found' })
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

    try {
      const post = await Post.findOne({
        _id: postId,
        author: userId,
        authorType
      })
      if (!post) {
        return res.status(404).json({ message: 'Author or Post not found' })
      }

      await Post.findByIdAndDelete(postId)

      const postObjectId = mongoose.Types.ObjectId(postId)

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

  getDataByKeyword: async (req, res) => {
    try {
      const { keyword } = req.query

      const posts = await Post.find({
        status: 'confirmed',
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { skills: { $regex: keyword, $options: 'i' } },
          { 'location.address': { $regex: keyword, $options: 'i' } }
        ]
      })

      res.status(200).json(posts)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Lỗi khi tìm kiếm bài đăng.' })
    }
  },
  getPostByUserId: async (req, res) => {
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
          .json({ message: 'Post not found or you do not have access' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateViews: async (req, res) => {
    const { postId } = req.params

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } },
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

      await updateAppliedJobs(candidateId, postId)

      res.json({ message: 'Applied updated successfully', post })
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
        return res.status(404).json({ message: 'Candidate not found' })
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      if (post.quantity && post.approved.length >= post.quantity) {
        return res.status(400).json({ message: 'Approved list is full' })
      }

      post.approved.push(candidateId)
      await post.save()

      await updateApprovedJobs(candidateId, postId)

      res.json({ message: 'Applied updated successfully', post })
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

      await updateSavedJobs(candidateId, postId)

      res.json({ message: 'Saved job updated successfully', post })
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
          .json({ message: 'User is not authorized as admin' })
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      const oldStatus = post.status
      if (oldStatus === 'confirmed') {
        return res.json({ message: 'Post is already confirmed', post })
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
