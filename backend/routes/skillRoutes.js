const express = require('express')
const router = express.Router()
const skillControllers = require('../controllers/skillControllers')

router.get('/fetch-and-save', skillControllers.fetchAndSaveSkills)
router.get('/', skillControllers.getAllSkills)
router.get('/:id', skillControllers.getSkillById)
router.post('/', skillControllers.createSkill)
router.delete('/:id', skillControllers.deleteSkill)

module.exports = router
