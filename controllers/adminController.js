// const User = require('../models/User')
const OrderModel = require('../models/Order')
const UserModel = require('../models/User')

const showAdminPage = async (req, res) => {
  res.send(req.user)
}

const getOrders = async (req, res) => {
  const orders = await OrderModel.find({})
  res.send(orders)
}

const getUsers = async (req, res) => {
  const users = await UserModel.find({})
  res.send(users)
}

module.exports = {
  showAdminPage,
  getOrders,
  getUsers
}
