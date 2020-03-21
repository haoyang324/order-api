const express = require('express')
const cors = require('cors')
// const bodyParser = require('body-parser')

require('dotenv').config()
require('./utils/db')

const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())

app.use('/admin', require('./routes/admin'))
app.use('/users', require('./routes/users'))
app.use('/products', require('./routes/products'))
app.use('/images', require('./routes/images'))
app.use('/orders', require('./routes/orders'))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
