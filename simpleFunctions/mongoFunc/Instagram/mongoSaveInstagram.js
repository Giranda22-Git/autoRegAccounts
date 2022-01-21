const mongoInstagram = require('../../../models/instagram.js')

const mongoSaveInstagram = async function (instagram) {
  const newInstagram = new mongoInstagram({
    firstName: instagram.firstName,
    lastName: instagram.lastName,
    dateOfBirth: instagram.dateOfBirth,
    accountName: instagram.accountName,
    password: instagram.password
  })

  return await newInstagram.save()
}

module.exports = mongoSaveInstagram
