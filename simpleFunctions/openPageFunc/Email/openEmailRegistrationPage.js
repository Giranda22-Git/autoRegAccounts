const {By, until} = require('selenium-webdriver')

const openEmailRegistrationPage = async function (driver) {
  try {
    await driver.get('https://account.mail.ru/signup?from=main&rf=auth.mail.ru')

    // await driver.findElement(By.className('svelte-y47oj9')).click()

    // await driver.sleep(5000)

    // const tabs = await driver.getAllWindowHandles()
    // await driver.switchTo().window(tabs[1])

    // await driver.wait(until.urlContains('signup'), 10000)

    return {result: true, driver}
  }
  catch (err) {
    console.log('catched Error: ', err)
    await driver.quit()
    return {result: false, driver}
  }
}

module.exports = openEmailRegistrationPage