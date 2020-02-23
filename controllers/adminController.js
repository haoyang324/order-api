// const User = require('../models/User')

const showAdminPage = async (req, res) => {
  res.send(req.user)
}

module.exports = {
  showAdminPage
}
