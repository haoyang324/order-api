const express = require('express')
const auth = require('../middleware/auth')
const orderController = require('../controllers/orderController')

const orderRouter = express.Router()

orderRouter.get('/', auth.user, orderController.getAll)
orderRouter.post('/order', auth.user, orderController.create)
orderRouter.post('/guestorder', orderController.create)
orderRouter.get('/:id', auth.user, orderController.get)
orderRouter.put('/:id/canceled', auth.user, orderController.cancelOrder)
orderRouter.put('/:id/notes', auth.user, orderController.addNotes)
orderRouter.delete('/:id', auth.user, orderController.del)

module.exports = orderRouter
