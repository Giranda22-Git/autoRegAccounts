const mongoEmail = require('../../../models/email.js')

const mongoGetTunedEmails = async function () {
  const emails = await mongoEmail.find({ tuned: true }).lean().exec()

  return emails
}

module.exports = mongoGetTunedEmails
