const express = require('express')
const router = express.Router()

const userRoute = require('./userRoutes')
const candidateRoute = require('./candidateRoutes')
const recruiterRoute = require('./recruiterRoutes')
const adminRoute = require('./adminRoutes')
const postRoute = require('./postRoutes')
const notiRoute = require('./notificationRoutes')
const addressRoute = require('./addressRoutes')

router.use('/user', userRoute)
router.use('/candidate', candidateRoute)
router.use('/recruiter', recruiterRoute)
router.use('/admin', adminRoute)
router.use('/post', postRoute)
router.use('/notification', notiRoute)
router.use('/address', addressRoute)

module.exports = router
