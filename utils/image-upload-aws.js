const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

require('dotenv').config()

aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  accessKeyId: process.env.AWS_SECRET_ACCESS,
  region: 'ca-central-1'
})

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid Media Type, only JPEG and PNG'), false)
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: 'order-api-image/image',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString().concat('.jpg'))
    }
  })
})

module.exports = upload
