const express = require('express')
const auth = require('../middleware/auth')
const orderController = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.post('/', orderController.create)
orderRouter.get('/', auth.user, orderController.getAll)
orderRouter.get('/:id', auth.user, orderController.get)
orderRouter.put('/:id', auth.user, orderController.update)
orderRouter.delete('/:id', auth.user, orderController.del)

module.exports = orderRouter
