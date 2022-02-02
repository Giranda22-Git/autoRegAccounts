const createChromeDriver = require('../simpleFunctions/createChromeDriver.js')
const openEmailRegistrationPage = require('../simpleFunctions/openPageFunc/Email/openEmailRegistrationPage.js')
const setRegistrationDataForEmail = require('../simpleFunctions/setDataOnPage/Email/setRegistrationDataForEmail.js')
const captchaSolutionGate = require('../simpleFunctions/Email/captchaSolutionGate.js')
const mongoSaveEmail = require('../simpleFunctions/mongoFunc/Email/mongoSaveEmail.js')
const tuneEmailAccount = require('../simpleFunctions/Email/tuneEmailAccount.js')
const Email = require('../lowLevelObjects/Email.js')

const createEmail = async function () {
  const generatedEmailData = new Email()

  const chrome = await createChromeDriver(false, 'mailru')

  let driver = chrome.driver

  const proxy = chrome.proxy

  let tmpResults = { result: false, driver }

  tmpResults = await openEmailRegistrationPage(driver)

  if (tmpResults.result) {
    driver = tmpResults.driver
    tmpResults = await setRegistrationDataForEmail(driver, generatedEmailData)
  }

  if (tmpResults.result) {
    driver = tmpResults.driver
    tmpResults = await captchaSolutionGate(driver)
  }

  const email = await mongoSaveEmail(generatedEmailData)

  if (tmpResults.result) {
    driver = tmpResults.driver
    tmpResults = await tuneEmailAccount(driver, email)
  }

  proxy.addEmail = email

  await proxy.endEmail(false)

  await tmpResults.driver.quit()

  return {result: email, proxy}
}

module.exports = createEmail
