const mongoEmail = require('../../../models/email.js')

const mongoSaveEmail = async function (email) {
  const newEmail = new mongoEmail({
    firstName: email.firstName,
    lastName: email.lastName,
    dateOfBirth: email.dateOfBirth,
    sex: email.sex,
    accountName: email.accountName + '@mail.ru',
    password: email.password
  })

  return await newEmail.save()
}

module.exports = mongoSaveEmail
