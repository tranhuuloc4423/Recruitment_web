const express = require('express')
const router = express.Router()
const {
  fetchAndSaveSkills,
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillControllers')

router.get('/fetch-and-save', fetchAndSaveSkills)
router.get('/', getAllSkills)
router.get('/:id', getSkillById)
router.post('/', createSkill)
router.put('/:id', updateSkill)
router.delete('/:id', deleteSkill)

module.exports = router
