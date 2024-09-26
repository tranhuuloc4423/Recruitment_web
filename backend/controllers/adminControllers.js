const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/adminModels')
const Admin = require('../models/adminModels')

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params
    const { image, dob, phone, address, gender } = req.body

    try {
      const basic_info = await Admin.findByIdAndUpdate(
        { id: adminId },
        {
          $set: {
            'basic_info.image': image,
            'basic_info.dob': dob,
            'basic_info.phone': phone,
            'basic_info.address': address,
            'basic_info.gender': gender
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }
      res.json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params
    const { desc, education, exps, skills, projects, certificates } = req.body

    try {
      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc
      if (education !== undefined)
        updateFields['other_info.education'] = education
      if (exps !== undefined) updateFields['other_info.exps'] = exps
      if (skills !== undefined) updateFields['other_info.skills'] = skills
      if (projects !== undefined) updateFields['other_info.projects'] = projects
      if (certificates !== undefined)
        updateFields['other_info.certificates'] = certificates

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Admin.findByIdAndUpdate(
        { id: adminId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getDataById: async (req, res) => {
    try {
      const { adminId } = req.params
      const admin = await Admin.findOne({ id: adminId })
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const admin = await Admin.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  createPost: async (req, res) => {
    const { adminId } = req.params
    const newPost = req.body

    try {
      const admin = await Admin.findById({ id: adminId })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      admin.posts.push(newPost)
      await admin.save()

      res.status(201).json(admin.posts[admin.posts.length - 1])
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updatePost: async (req, res) => {
    const { adminId, postId } = req.params
    const updatedPost = req.body

    try {
      const admin = await Admin.findById({ id: adminId })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      const postIndex = admin.posts.findIndex(
        (post) => post.id === Number(postId)
      )
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' })
      }

      admin.posts[postIndex] = {
        ...admin.posts[postIndex],
        ...updatedPost
      }
      await admin.save()

      res.json(admin.posts[postIndex])
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  deletePost: async (req, res) => {
    const { adminId, postId } = req.params

    try {
      const admin = await Admin.findById({ id: adminId })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      const postIndex = admin.posts.findIndex(
        (post) => post.id === Number(postId)
      )
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' })
      }

      admin.posts.splice(postIndex, 1)
      await admin.save()

      res.json({ message: 'Post deleted successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getAllPosts: async (req, res) => {
    const { adminId } = req.params

    try {
      const admin = await Admin.findById({ id: adminId })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.json(admin.posts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getPostById: async (req, res) => {
    const { adminId, postId } = req.params

    try {
      const admin = await Admin.findById({ id: adminId })
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      const post = admin.posts.find((post) => post.id === Number(postId))
      if (!post) {
        return res.status(404).json({ message: 'Post not found' })
      }

      res.json(post)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

module.exports = adminControllers
