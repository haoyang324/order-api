const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email address')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  admin: {
    type: Boolean,
    default: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  defaultAddress: {
    name: String,
    phone: String,
    address: String,
    city: String,
    province: String,
    zip: String,
    country: String
  }
})

userSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await UserModel.findOne({ email })
  if (!user) {
    throw new Error('Login failed! Email not found')
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Login failed! Invalid password')
  }
  return user
}

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
