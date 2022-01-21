const {By, until} = require('selenium-webdriver')

const openEmailAuthorizationPage = async function (driver) {
  try {
    await driver.get('https://mail.ru')

    return {result: true, driver}
  }
  catch (err) {
    console.log('catched Error: ', err)
    await driver.quit()
    return {result: false, driver}
  }
}

module.exports = openEmailAuthorizationPage
