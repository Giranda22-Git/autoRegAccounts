const {By, until} = require('selenium-webdriver')

const openInstagramRegistrationPage = async function (driver) {
  try {
    await driver.get('https://www.instagram.com/accounts/emailsignup/')

    return {result: true, driver}
  }
  catch (err) {
    console.log('catched Error: ', err)
    await driver.quit()
    return {result: false, driver}
  }
}

module.exports = openInstagramRegistrationPage