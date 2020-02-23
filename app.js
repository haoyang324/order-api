const express = require('express')
const router = require('./routers/index')
require('dotenv').config()
require('./utils/db')

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
