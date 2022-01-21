const mongoEmail = require("../../../models/email")

const mongoUpdateEmailUsedInInstagram = async function (emailId, instagramId) {
  await mongoEmail.updateOne(
    { _id: emailId },
    { instagram: instagramId }
  ).exec()
}

module.exports = mongoUpdateEmailUsedInInstagram
