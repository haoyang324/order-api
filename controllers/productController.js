const ProductModel = require('../models/Product')

const getProduct = async (req, res) => {
  const product = await ProductModel.findOne({ _id: req.params.id })
  res.send(product)
}

const getAllProduct = async (req, res) => {
  const product = await ProductModel.find({})
  res.send(product)
}

const addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body)
    await product.save()
    res.status(201).send({ success: 'Product was added successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = req.body
    await ProductModel.findOneAndUpdate(filter, update)
    res.status(201).send({ success: 'Product was updated successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    await ProductModel.deleteByID(req.params.id)
    res.status(201).send({ success: 'Product was deleted successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  getProduct,
  getAllProduct,
  addProduct,
  updateProduct,
  deleteProduct
}
