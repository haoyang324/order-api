const express = require('express')
const auth = require('../middleware/auth')
const adminController = require('../controllers/adminController')

const adminRouter = express.Router()

adminRouter.get('/', auth.admin, adminController.showAdminPage)
adminRouter.get('/orders', auth.admin, adminController.getAllOrders)
adminRouter.put('/orders/:id', auth.admin, adminController.updateOrder)

module.exports = adminRouter
