const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  name: String
})

const ImageModel = mongoose.model('Image', imageSchema)

module.exports = ImageModel
