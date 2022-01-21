const mongoEmail = require('../../../models/email.js')

const mongoUpdateTuneEmail = async function (accountName, imapPassword) {
  try {
    await mongoEmail.updateOne(
      { accountName },
      {
        tuned: true,
        imapPassword
      }
    )
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = mongoUpdateTuneEmail
