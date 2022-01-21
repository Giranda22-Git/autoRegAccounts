const mongoose = require('mongoose')

const instagram = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Object,
  accountName: String,
  password: String,
  tuned: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    default: ''
  },
  proxy: {
    type: String,
    default: ''
  }
})

const mongoInstagram = mongoose.model('instagrams', instagram)
module.exports = mongoInstagram
