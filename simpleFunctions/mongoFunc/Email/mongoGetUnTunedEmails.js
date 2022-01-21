const mongoEmail = require('../../../models/email.js')

const mongoGetUnTunedEmails = async function () {
  const emails = await mongoEmail.find().lean().exec()

  const untunedEmails = emails.filter(email => {
    return !email.tuned
  })

  if (untunedEmails.length > 0) {
    return untunedEmails
  }

  return false
}

module.exports = mongoGetUnTunedEmails
