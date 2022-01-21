const mongoEmail = require('../../models/email.js')

const mailFromInstagramEvent = async function (emailId) {
  const startTime = new Date()
  return await checkForExistsMail(emailId, startTime)
}

const checkForExistsMail = async function (emailId, startTime) {
  const endTime = new Date()

  if (endTime.getTime - startTime.getTime > 1000 * 60) {
    console.log('awaitMailFromInstagram: out of time error')
    return false
  }

  const email = await mongoEmail.findById(emailId).lean().exec()

  if (email) {
    if (typeof email.instagramMail === 'object') {
      if (Object.keys(email.instagramMail).length > 0) {
        if (email.instagramMail.date) {
          return email.instagramMail
        }
      }
    }
  }

  return await checkForExistsMail(emailId, startTime)
}

module.exports = mailFromInstagramEvent
