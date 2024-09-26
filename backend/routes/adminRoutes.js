const adminControllers = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/:adminId/basic_info', adminControllers.updateBasicInfo)
router.put('/:adminId/other_info', adminControllers.updateOtherInfo)
router.get('/:adminId/', adminControllers.getDataById)
router.get('/', adminControllers.getAllData)
router.post('/:adminId/posts', adminControllers.createPost)
router.put('/:adminId/posts/:postId', adminControllers.updatePost)
router.delete('/:adminId/posts/:postId', adminControllers.deletePost)
router.get('/:adminId/posts', adminControllers.getAllPosts)
router.get('/:adminId/posts/:postId', adminControllers.getPostById)

module.exports = router
