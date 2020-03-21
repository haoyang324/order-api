const OrderModel = require('../models/Order')

const create = async (req, res) => {
  try {
    const orderInfo = {
      customerIdentity: req.body.customerIdentity,
      customerName: req.body.customerName,
      date: req.body.date,
      address: req.body.address,
      note: req.body.note,
      value: req.body.value,
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
