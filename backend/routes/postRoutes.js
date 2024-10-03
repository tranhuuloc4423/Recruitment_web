const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  updateViews,
  updateApplied,
  getPostWithApplicants,
  updateStatus,
  updateSaved
} = require('../controllers/postControllers')

router.post('/:userType/:userId', createPost)
router.put('/:authorType/:userId/:postId', updatePost)
router.delete('/:authorType/:userId/:postId', deletePost)
router.get('/:authorType/:userId/', getAllPosts)
router.get('/:authorType/:userId/:postId', getPostById)
router.put('/:postId/views', updateViews)
router.put('/applied', updateApplied)
router.put('/saved', updateSaved)
router.get('/applicants', getPostWithApplicants)
router.put('/status', updateStatus)

module.exports = router
