const express = require('express')
const auth = require('../middleware/auth')
const productController = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/', productController.getAll)
productRouter.post('/', auth.admin, productController.add)
productRouter.get('/:id', productController.get)
productRouter.put('/:id', auth.admin, productController.update)
productRouter.delete('/:id', auth.admin, productController.del)

module.exports = productRouter
