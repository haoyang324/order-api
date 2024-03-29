const ProductModel = require('../models/Product')

const get = async (req, res) => {
  const product = await ProductModel.findOne({ _id: req.params.id })
  // Get request url
  const requestURL = req.protocol + '://' + req.get('host')
  if (product.imgURL[0] === '/') {
    product.imgURL = requestURL + product.imgURL
  }
  res.send(product)
}

const getAll = async (req, res) => {
  const product = await ProductModel.find({})
  // Get request url
  const requestURL = req.protocol + '://' + req.get('host')
  product.forEach(element => {
    if (element.imgURL[0] === '/') {
      element.imgURL = requestURL + element.imgURL
    }
  })
  res.send(product)
}

const add = async (req, res) => {
  try {
    const product = new ProductModel(req.body)
    await product.save()
    res.status(201).send({ success: 'Product was added successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const filter = { _id: req.params.id }
    const update = req.body
    await ProductModel.findOneAndUpdate(filter, update)
    res.status(201).send({ success: 'Product was updated successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const del = async (req, res) => {
  try {
    await ProductModel.deleteByID(req.params.id)
    res.status(201).send({ success: 'Product was deleted successfully' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  get,
  getAll,
  add,
  update,
  del
}
