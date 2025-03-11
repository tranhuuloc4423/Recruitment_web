const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getAllConfirmedPosts,
  getAllPostedPosts,
  getAllExpiredPosts,
  getPostByUserId,
  getPostById,
  updateApplied,
  updateSavedJob,
  updateStatus,
  cancelPost,
  updateApproved,
  getAppliedCandidatesByPostId,
  getApprovedCandidatesByPostId,
  getCandidateById
} = require('../controllers/postControllers')

router.post('/create', createPost)
router.put('/:postId', updatePost)
router.delete('/:postId', deletePost)
router.get('/', getAllPosts)
router.get('/confirmed', getAllConfirmedPosts)
router.get('/posted', getAllPostedPosts)
router.get('/expired', getAllExpiredPosts)
router.get('/user/:userId/', getPostByUserId)
router.get('/:postId', getPostById)
router.get('/:postId/applied', getAppliedCandidatesByPostId)
router.get('/:postId/approved', getApprovedCandidatesByPostId)
router.put('/:postId/applied', updateApplied)
router.put('/:postId/approved', updateApproved)
router.put('/:postId/saved', updateSavedJob)
router.put('/:postId/status', updateStatus)
router.put('/:postId/cancel', cancelPost)
router.get('/candidate/:candidateId', getCandidateById)

module.exports = router
