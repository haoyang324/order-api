const PhotoModel = require('../models/Image')
require('dotenv').config()

const upload = async (req, res) => {
  const img = req.file
  const name = img.randomname
  const path = '/images/' + name
  try {
    const photo = new PhotoModel({ name: name, path: img.originalname })
    await photo.save()
    res.status(201).send({ imageUrl: path })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

module.exports = {
  upload
}
