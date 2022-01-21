const createChromeDriver = require('../simpleFunctions/createChromeDriver.js')
const openInstagramRegistrationPage = require('../simpleFunctions/openPageFunc/Instagram/openInstagramRegistrationPage.js')
const setRegistrationDataForInstagram = require('../simpleFunctions/setDataOnPage/Instagram/setRegistrationDataForInstagram.js')
const mongoSaveInstagram = require('../simpleFunctions/mongoFunc/Instagram/mongoSaveInstagram.js')
//const captchaSolutionGate = require('../simpleFunctions/Email/captchaSolutionGate.js')
const Instagram = require('../lowLevelObjects/Instagram.js')

const createInstagram = async function (email, proxy) {
  let instagram = new Instagram(email)

  const chrome = await createChromeDriver(true, proxy)

  proxy = chrome.proxy
  let driver = chrome.driver

  let tmpResults = { result: false, driver }

  tmpResults = await openInstagramRegistrationPage(driver)

  if (tmpResults.result) {
    driver = tmpResults.driver
    tmpResults = await setRegistrationDataForInstagram(driver, instagram)
  }

  instagram = await mongoSaveInstagram(instagram)

  proxy.addInstagram = instagram

  await proxy.endInstagram(true)

  return {result: instagram, proxy}
}

module.exports = createInstagram
