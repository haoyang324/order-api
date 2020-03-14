const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  imgURL: {
    type: String,
    required: true
  }
})

productSchema.pre('save', async function (next) {
  const exist = await ProductModel.findOne({ name: this.name })
  if (exist) {
    throw new Error('Duplicate product name')
  }
  next()
})

productSchema.statics.deleteByID = async (id) => {
  // Search for a user by email and password.
  const product = await ProductModel.findOne({ _id: id })
  if (!product) {
    throw new Error('Delete failed! Product not found')
  }
  await ProductModel.deleteOne({ _id: id })
}

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
