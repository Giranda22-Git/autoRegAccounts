const {Builder, By, Key, until} = require('selenium-webdriver')
const waitElement = require('../../waitElement.js')

const setRegistrationDataForEmail = async function (driver, emailData) {
  try {
    // await driver.sleep(2000)

    await waitElement(driver, By.name('fname'))

    // set firstName
    await driver.findElement(By.name('fname')).sendKeys(emailData.firstName)

    // set lastName
    await driver.findElement(By.name('lname')).sendKeys(emailData.lastName)

    // set dateOfBirth day
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > div:nth-of-type(5) > div:nth-of-type(2) > div > div > div > div > div > div > div:nth-of-type(2) > svg')).click()
    await driver.findElement(By.css(`div#react-select-2-option-${emailData.dateOfBirth.day - 1} > div > div`)).click()

    // set dateOfBirth month
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > div:nth-of-type(5) > div:nth-of-type(2) > div > div:nth-of-type(3) > div > div > div')).click()
    await driver.findElement(By.css(`div#react-select-3-option-${emailData.dateOfBirth.month - 1} > div > div`)).click()

    // set dateOfBirth years
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > div:nth-of-type(5) > div:nth-of-type(2) > div > div:nth-of-type(5) > div > div > div > div')).click()
    await driver.findElement(By.css(`div#react-select-4-option-${calcYearElement(emailData.dateOfBirth.year)} > div > div`)).click()

    // set sex
    if (emailData.sex === 'male')
      await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > div:nth-of-type(8) > div:nth-of-type(2) > div > label')).click()
    else
      await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > div:nth-of-type(8) > div:nth-of-type(2) > div > label:nth-of-type(2)')).click()

    // set accountName
    await driver.findElement(By.css('input#aaa__input'))
      .sendKeys(emailData.accountName)

    // set password
    await driver.findElement(By.css('input#password'))
      .sendKeys(emailData.password)

    // set repeat password
    await driver.findElement(By.css('input#repeatPassword'))
      .sendKeys(emailData.password)

    // click to create account button
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(4) > div > div > div > form > button')).click()

    return { driver, result: true }
  }
  catch (err) {
    console.log('catched Error: ', err)
    return { driver, result: false }
  }
  finally {
    console.log(emailData)
    //await driver.quit()
  }
}

function calcYearElement (year) {
  const maxValue = 2021
  return (maxValue - year)
}

module.exports = setRegistrationDataForEmail
