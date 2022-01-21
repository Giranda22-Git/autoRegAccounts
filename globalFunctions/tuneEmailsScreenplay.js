const mongoGetUnTunedEmails = require('../simpleFunctions/mongoFunc/Email/mongoGetUnTunedEmails.js')
const logInToEmail = require('../simpleFunctions/Email/logInToEmail.js')
const tuneEmailAccount = require('../simpleFunctions/Email/tuneEmailAccount.js')

const tuneEmailsScreenplay = async function () {
  const untunedEmails = await mongoGetUnTunedEmails()

  for (const email of untunedEmails) {
    let tmpResults = await logInToEmail(email)

    if (tmpResults.result) {
      tmpResults = await tuneEmailAccount(tmpResults.driver, email)
    }

    console.log('Result: ', tmpResults.result)

    // tmpResults.driver.quit()
  }

  return untunedEmails
}

module.exports = tuneEmailsScreenplay
