const express = require('express')
const auth = require('../middleware/auth')
const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/', productController.getAllProduct)
productRouter.post('/', auth.admin, productController.addProduct)
productRouter.get('/:id', productController.getProduct)
productRouter.put('/:id', auth.admin, productController.updateProduct)
productRouter.delete('/:id', auth.admin, productController.deleteProduct)

module.exports = productRouter
