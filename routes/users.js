const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.login)
userRouter.get('/me', auth.user, userController.showSelf)
userRouter.post('/me/logout', auth.user, userController.logout)
userRouter.post('/me/logoutall', auth.user, userController.logoutAll)
userRouter.post('/me/defaultaddress', auth.user, userController.updateDefaultAddress)

module.exports = userRouter
