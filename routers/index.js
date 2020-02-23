const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

const router = express.Router()

router.post('/users', userController.createUser)
router.post('/users/login', userController.login)
router.get('/users/me', auth, userController.showSelfPage)
router.post('/users/me/logout', auth, userController.logout)
router.post('/users/me/logoutall', auth, userController.logoutAll)

module.exports = router
