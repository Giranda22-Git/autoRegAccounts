const createChromeDriver = require('../simpleFunctions/createChromeDriver.js')
const openInstagramRegistrationPage = require('../simpleFunctions/openPageFunc/Instagram/openInstagramRegistrationPage.js')
const setRegistrationDataForInstagram = require('../simpleFunctions/setDataOnPage/Instagram/setRegistrationDataForInstagram.js')
const mongoSaveInstagram = require('../simpleFunctions/mongoFunc/Instagram/mongoSaveInstagram.js')
const Instagram = require('../lowLevelObjects/Instagram.js')

const createInstagram = async function (email) {
  let instagram = new Instagram(email)

  const chrome = await createChromeDriver(true, 'instagram')

  let proxy = chrome.proxy
  let driver = chrome.driver

  let tmpResults = { result: false, driver }

  tmpResults = await openInstagramRegistrationPage(driver)

  console.log(email)

  // if (tmpResults.result) {
  //   driver = tmpResults.driver
  //   tmpResults = await setRegistrationDataForInstagram(driver, instagram)
  // }

  // instagram = await mongoSaveInstagram(instagram)

  // proxy.addInstagram = instagram

  // await proxy.endInstagram(true)

  //return {result: instagram, proxy}
  return true
}

module.exports = createInstagram
