const express = require('express')
const auth = require('../middleware/auth')
const userController = require('../controllers/userController')
const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')

const router = express.Router()
const userRouter = express.Router()
const adminRouter = express.Router()
const productRouter = express.Router()

// User routes
router.use('/users', userRouter)
userRouter.post('/', userController.createUser)
userRouter.post('/login', userController.login)
userRouter.get('/me', auth.user, userController.showSelfPage)
userRouter.post('/me/logout', auth.user, userController.logout)
userRouter.post('/me/logoutall', auth.user, userController.logoutAll)

// Admin routes
router.use('/admin', adminRouter)
adminRouter.get('/', auth.admin, adminController.showAdminPage)

// Product routes
router.use('/product', productRouter)
productRouter.get('/all', productController.getAllProduct)
productRouter.post('/add', auth.admin, productController.addProduct)
productRouter.post('/del', auth.admin, productController.deleteProductByID)

module.exports = router
