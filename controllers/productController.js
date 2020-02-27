const ProductModel = require('../models/Product')

const getAllProduct = async (req, res) => {
  const product = await ProductModel.find({})
  res.send(product)
}

const addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body)
    await product.save()
    res.status(201).send(product)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const deleteProductByID = async (req, res) => {
  try {
    await ProductModel.deleteOne({ _id: req.body.id })
    res.status(201).send()
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  getAllProduct,
  addProduct,
  deleteProductByID
}
