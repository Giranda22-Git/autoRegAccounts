const mongoose = require('mongoose')

const email = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Object,
  sex: String,
  accountName: String,
  password: String,
  imapPassword: {
    type: String,
    default: ''
  },
  tuned: {
    type: Boolean,
    default: false
  },
  instagramMail: {
    date: Date,
    subject: String,
    message: String
  },
  instagram: {
    type: String,
    default: ''
  },
  proxy: {
    type: String,
    default: ''
  }
})

const mongoEmail = mongoose.model('emails', email)
module.exports = mongoEmail
