const mongoInstagram = require('../../../models/instagram.js')

const mongoUpdateInstagramUsedEmail = async function (instagramId, emailId) {
  await mongoInstagram.updateOne(
    { _id: instagramId },
    { email: emailId }
  ).exec()
}

module.exports = mongoUpdateInstagramUsedEmail
