const {Builder, By, Key, until} = require('selenium-webdriver')

const setAuthorizationDataForEmail = async function (driver, emailData) {
  // set account name
  await driver.findElement(By.css('div#mailbox > form > div > div:nth-of-type(2) > input'))
    .sendKeys(emailData.accountName)

  // push accountName
  await driver.findElement(By.css('div#mailbox > form > button'))
    .click()

  // wait a password input
  await driver.sleep(1000)

  // set password
  await driver.findElement(By.css('div#mailbox > form > div:nth-of-type(2) > input'))
    .sendKeys(emailData.password)

  // push password and entry
  await driver.findElement(By.css('div#mailbox > form > button:nth-of-type(2)'))
    .click()

  return { result: true, driver }
}

module.exports = setAuthorizationDataForEmail
