const express = require('express')
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')

const adminRouter = express.Router()

adminRouter.get('/', auth.admin, adminController.showAdminPage)

module.exports = adminRouter
