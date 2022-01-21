const mongoose = require('mongoose')

const proxy = new mongoose.Schema({
  host: String,
  port: String,
  username: Object,
  password: String,
  instagram: {
    type: Array,
    default: []
  },
  email: {
    type: Array,
    default: []
  }
})

const mongoProxy = mongoose.model('proxys', proxy)
module.exports = mongoProxy
