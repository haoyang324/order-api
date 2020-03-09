const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  pricing: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  }
})

productSchema.pre('save', async function (next) {
  const exist = await ProductModel.findOne({ title: this.title })
  if (exist) {
    throw new Error('Duplicate product title')
  }
  next()
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
