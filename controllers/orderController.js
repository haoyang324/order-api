const OrderModel = require('../models/Order')

const create = async (req, res) => {
  try {
    let totalValue = 0
    req.body.products.forEach(product => {
      totalValue = totalValue + product.price * product.quantity
    })

    const orderInfo = {
      customerIdentity: req.user ? req.user.email : 'Guest',
      customerName: req.user ? req.user.name : 'Guest',
      date: req.body.date,
      address: req.body.address,
      notes: req.body.notes,
      value: totalValue.toFixed(2),
      products: req.body.products
    }

    const order = new OrderModel(orderInfo)
    await order.save()
    res.status(201).send({ success: 'Order Placed' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const get = async (req, res) => {
  const order = await OrderModel.findOne({ _id: req.params.id })
  res.send(order)
}

const getAll = async (req, res) => {
  const orders = await OrderModel.find({ customerIdentity: req.user.email })
  res.send(orders)
}

const cancelOrder = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = { status: 'Canceled' }
    const opts = { runValidators: true }

    await OrderModel.findOneAndUpdate(filter, update, opts)

    res.status(201).send({ success: 'Order was canceled successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const addNotes = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = { notes: req.body.notes }

    await OrderModel.findOneAndUpdate(filter, update)

    res.status(201).send({ success: 'Order notes was updated successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const del = async (req, res) => {
}

module.exports = {
  create,
  getAll,
  get,
  cancelOrder,
  addNotes,
  del
}
