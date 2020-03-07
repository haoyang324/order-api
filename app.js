const express = require('express')
const router = require('./routers/index')
const imageRouter = require('./routers/image-upload')
const cors = require('cors')
// const bodyParser = require('body-parser')
require('dotenv').config()
require('./utils/db')

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.use('/', cors(), router)
app.use('/', imageRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
