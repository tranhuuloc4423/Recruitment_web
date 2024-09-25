const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/recruiterModels')
const Recruiter = require('../models/recruiterModels')

const recruiterControllers = {
  updateBasicInfo: async (req, res) => {
    const id = parseInt(req.params.id)
    const { image, field, tax_id, address } = req.body
    try {
      const basic_info = await Recruiter.findOneAndUpdate(
        { id: id },
        {
          $set: {
            'basic_info.image': image,
            'basic_info.field': field,
            'basic_info.tax_id': tax_id,
            'basic_info.address': address
          }
        },
        {
          new: true
        }
      )
      res.status(200).json(basic_info)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  updateOtherInfo: async (req, res) => {
    const id = parseInt(req.params.id)
    const { desc, speciality, images } = req.body
    try {
      const other_info = await Recruiter.findOneAndUpdate(
        { id: id },
        {
          $set: {
            'other_info.desc': desc,
            'other_info.speciality': speciality,
            'other_info.images': images
          }
        },
        {
          new: true
        }
      )
      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const recruiter = await Recruiter.findOne({ id: id })
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const recruiter = await Recruiter.find()
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  createPost: async (req, res) => {
    const { recruiterId } = req.params
    const newPost = req.body

    try {
      const recruiter = await Recruiter.findById({ id: recruiterId })
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      recruiter.posts.push(newPost)
      await recruiter.save()

      res.status(201).json(recruiter.posts[recruiter.posts.length - 1])
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updatePost: async (req, res) => {
    const { recruiterId, postId } = req.params
    const updatedPost = req.body

    try {
      const recruiter = await Recruiter.findById({ id: recruiterId })
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      const postIndex = recruiter.posts.findIndex(
        (post) => post.id === Number(postId)
      )
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' })
      }

      recruiter.posts[postIndex] = {
        ...recruiter.posts[postIndex],
        ...updatedPost
      }
      await recruiter.save()

      res.json(recruiter.posts[postIndex])
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  deletePost: async (req, res) => {
    const { recruiterId, postId } = req.params

    try {
      const recruiter = await Recruiter.findById({ id: recruiterId })
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      const postIndex = recruiter.posts.findIndex(
        (post) => post.id === Number(postId)
      )
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' })
      }

      recruiter.posts.splice(postIndex, 1)
      await recruiter.save()

      res.json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getAllPosts: async (req, res) => {
    const { recruiterId } = req.params

    try {
      const recruiter = await Recruiter.findById({ id: recruiterId })
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.json(recruiter.posts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getPostById: async (req, res) => {
    const { recruiterId, postId } = req.params

    try {
      const recruiter = await Recruiter.findById({ id: recruiterId })
      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      const post = recruiter.posts.find((post) => post.id === Number(postId))
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = recruiterControllers
