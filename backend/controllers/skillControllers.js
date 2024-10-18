const Skill = require('../models/skillModel')

const skillControllers = {
  fetchAndSaveSkills: async (req, res) => {
    try {
      const skillsData = [
        { value: 'reactjs', label: 'React JS' },
        { value: 'nodejs', label: 'NodeJS' },
        { value: 'mongodb', label: 'MongoDB' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'expressjs', label: 'ExpressJS' },
        { value: 'python', label: 'Python' }
      ]
      const operations = skillsData.map((skill) => ({
        updateOne: {
          filter: { value: skill.value },
          update: { $setOnInsert: skill },
          upsert: true
        }
      }))

      await Skill.bulkWrite(operations)

      res.status(200).json({ message: 'Lưu dữ liệu kỹ năng thành công' })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: 'Lỗi khi lấy và lưu dữ liệu kỹ năng',
        error: error.message
      })
    }
  },

  getAllSkills: async (req, res) => {
    try {
      const skills = await Skill.find()
      res.status(200).json(skills)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy dữ liệu kỹ năng', error: error.message })
    }
  },

  getSkillById: async (req, res) => {
    try {
      const { id } = req.params
      const skill = await Skill.findById(id)
      if (!skill) {
        return res.status(404).json({ message: 'Kỹ năng không tồn tại' })
      }
      res.status(200).json(skill)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi lấy dữ liệu kỹ năng', error: error.message })
    }
  },

  createSkill: async (req, res) => {
    const { value, label } = req.body
    try {
      if (!value || !label) {
        return res.status(400).json({ message: 'Giá trị và nhãn là bắt buộc' })
      }
      const existingSkill = await Skill.findOne({ value })
      if (existingSkill) {
        return res.status(400).json({ message: 'Kỹ năng đã tồn tại' })
      }

      const newSkill = new Skill({ value, label })
      await newSkill.save()
      res.status(201).json(newSkill)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi tạo kỹ năng', error: error.message })
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const { id } = req.params
      const deletedSkill = await Skill.findByIdAndDelete(id)
      if (!deletedSkill) {
        return res.status(404).json({ message: 'Kỹ năng không tồn tại' })
      }
      res.status(200).json({ message: 'Xóa kỹ năng thành công' })
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Lỗi khi xóa kỹ năng', error: error.message })
    }
  }
}

module.exports = skillControllers
