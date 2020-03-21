const OrderModel = require('../models/Order')

const create = async (req, res) => {
  try {
    let totalValue = 0
    req.body.products.forEach(product => {
      totalValue = totalValue + product.price * product.quantity
    })

    const orderInfo = {
      customerIdentity: req.body.customerIdentity,
      customerName: req.body.customerName,
      date: req.body.date,
      address: req.body.address,
      note: req.body.note,
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
  const product = await OrderModel.findOne({ _id: req.params.id })
  res.send(product)
}

const getAll = async (req, res) => {
}

const update = async (req, res) => {
}

const del = async (req, res) => {
}

module.exports = {
  create,
  getAll,
  get,
  update,
  del
}
