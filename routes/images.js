const express = require('express')
const auth = require('../middleware/auth')
const crypto = require('crypto')
const multer = require('multer')
const imageController = require('../controllers/imageController')
const imageRouter = express.Router()

const upload = require('../utils/image-upload-aws')

const singleUpload = upload.single('image')

const randomFileName = file => {
  const arr = file.originalname.split('.')
  const extention = arr[arr.length - 1]
  const newName = crypto.randomBytes(20).toString('hex') + '.' + extention
  file.randomname = newName
  return newName
}

const storage = multer.diskStorage({
  // Save product images
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  // Get a random name
  filename: function (req, file, cb) {
    cb(null, randomFileName(file))
  }
})
const multerUpload = multer({
  storage: storage
})

imageRouter.post('/', auth.admin, multerUpload.single('image'), imageController.upload)

imageRouter.post('/aws', auth.admin, function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] })
    }
    return res.json({ imageUrl: req.file.location })
  })
})

module.exports = imageRouter
