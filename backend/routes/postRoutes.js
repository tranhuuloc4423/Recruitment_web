const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getAllConfirmedPosts,
  getPostByUserId,
  getPostById,
  updateViews,
  updateApplied,
  updateSaved,
  updateStatus,
  updateApproved
  // searchPostsByKeyword
} = require('../controllers/postControllers')

router.post('/create', createPost)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)
router.get('/', getAllPosts)
router.get('/confirmed', getAllConfirmedPosts)
router.get('/:userId/', getPostByUserId)
router.get('/:postId', getPostById)
router.put('/:postId/views', updateViews)
router.put('/:postId/applied', updateApplied)
router.put('/:postId/approved', updateApproved)
router.put('/:postId/saved', updateSaved)
router.put('/:postId/status', updateStatus)
// router.get('/keywords', searchPostsByKeyword)

module.exports = router
