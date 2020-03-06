const UserModel = require('../models/User')

const createUser = async (req, res) => {
  // Create a new user
  try {
    const user = new UserModel(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const login = async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body
    const user = await UserModel.findByCredentials(email, password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

const showSelfPage = async (req, res) => {
  // View logged in user profile
  res.send(req.user)
}

const logout = async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

const logoutAll = async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports = {
  createUser,
  login,
  showSelfPage,
  logout,
  logoutAll
}
