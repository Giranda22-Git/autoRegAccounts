const mongoEmail = require('../../../models/email.js')
const getMessageTextFromEmail = require('../../getMessageTextFromEmail.js')

const mongoUpdateInstagramMail = async function (emailId, date, subject, message) {
  message = getMessageTextFromEmail(message)

  await mongoEmail.updateOne(
    { _id: emailId },
    {
      instagramMail: {
        date,
        subject,
        message
      }
    }
  )
}

module.exports = mongoUpdateInstagramMail
