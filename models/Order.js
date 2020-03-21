const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  customerIdentity: String,
  customerName: String,
  date: Date,
  address: {
    name: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    zip: String,
    country: String
  },
  contact: Number,
  note: String,
  status: {
    type: String,
    enum: ['Pending', 'Comfirmed', 'Completed', 'Canceled']
  },
  value: mongoose.Schema.Types.Decimal128,
  products: [{
    name: String,
    price: mongoose.Schema.Types.Decimal128,
    quantity: Number
  }]
})

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel
