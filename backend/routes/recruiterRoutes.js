const recruiterControllers = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.put('/:id/basic_info', recruiterControllers.updateBasicInfo)
router.put('/:id/other_info', recruiterControllers.updateOtherInfo)
router.get('/:id/', recruiterControllers.getDataById)
router.get('/', recruiterControllers.getAllData)
router.post('/:recruiterId/posts', recruiterControllers.createPost)
router.put('/:recruiterId/posts/:postId', recruiterControllers.updatePost)
router.delete('/:recruiterId/posts/:postId', recruiterControllers.deletePost)
router.get('/:recruiterId/posts', recruiterControllers.getAllPosts)
router.get('/:recruiterId/posts/:postId', recruiterControllers.getPostById)

module.exports = router
