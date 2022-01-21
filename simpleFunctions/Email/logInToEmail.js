const openEmailAuthorizationPage = require('../openPageFunc/Email/openEmailAuthorizationPage.js')
const setAuthorizationDataForEmail = require('../setDataOnPage/Email/setAuthorizationDataForEmail.js')
const createChromeDriver = require('../createChromeDriver.js')

const logInToEmail = async function (emailData) {
  let driver = await createChromeDriver(false)
  let tmpResults = { result: false, driver }

  tmpResults = await openEmailAuthorizationPage(driver)

  if (tmpResults.result) {
    driver = tmpResults.driver
    tmpResults = await setAuthorizationDataForEmail(driver, emailData)
  }

  return tmpResults
}

module.exports = logInToEmail
