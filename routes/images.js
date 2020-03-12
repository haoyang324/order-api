const express = require('express')
const auth = require('../middleware/auth')
const imageRouter = express.Router()

const upload = require('../utils/image-upload')

const singleUpload = upload.single('image')

imageRouter.post('/', auth.admin, function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] })
    }
    return res.json({ imageUrl: req.file.location })
  })
})

module.exports = imageRouter
