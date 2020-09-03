// const User = require('../models/User')
const OrderModel = require('../models/Order')
const UserModel = require('../models/User')

const showAdminPage = async (req, res) => {
  res.send(req.user)
}

const getAllOrders = async (req, res) => {
  const orders = await OrderModel.find({})
  res.send(orders)
}

const updateOrder = async (req, res) => {
  try {
    const filter = { _id: req.body._id }
    const update = req.body
    const opts = { runValidators: true }

    await OrderModel.findOneAndUpdate(filter, update, opts)

    res.status(201).send({ success: 'Order was updated successfully by admin' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const getAllUsers = async (req, res) => {
  const users = await UserModel.find({})
  res.send(users)
}

const updateUser = async (req, res) => {
  try {
    console.log(req.body)
    const filter = { _id: req.body._id }
    const update = req.body
    const opts = { runValidators: true }

    await UserModel.findOneAndUpdate(filter, update, opts)

    res.status(201).send({ success: 'User was updated successfully by admin' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  showAdminPage,
  getAllOrders,
  updateOrder,
  getAllUsers,
  updateUser
}
