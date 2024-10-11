const express = require('express')
const router = express.Router()
const {
  fetchAndSaveSkills,
  getAllSkills,
  getSkillById,
  createSkill,
  deleteSkill
} = require('../controllers/skillControllers')

router.get('/fetch-and-save', fetchAndSaveSkills)
router.get('/', getAllSkills)
router.get('/:id', getSkillById)
router.post('/', createSkill)
router.delete('/:id', deleteSkill)

module.exports = router
