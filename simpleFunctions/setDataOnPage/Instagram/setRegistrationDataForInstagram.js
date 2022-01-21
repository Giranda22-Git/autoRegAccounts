const {Builder, By, Key, until} = require('selenium-webdriver')
const getEmails = require('../../../globalFunctions/getEmails.js')
const waitElement = require('../../waitElement.js')

const monthsRuText = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
]

const setRegistrationDataForInstagram = async function (driver, instagramData) {
  try {
    // await a load registration fields
    await driver.sleep(2000)

    // if exist a apply cookie popup then click apply
    try {
      await driver.findElement(By.css('html > body > div:nth-of-type(4) > div > div > button'))
        .click()

      await driver.sleep(2000)
    }
    catch (err) {
      console.log('not find')
    }

    // set email account name
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(3) > div > label > input'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(3) > div > label > input'))
      .sendKeys(instagramData.email.accountName)

    // set first and last name
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(4) > div > label > input'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(4) > div > label > input'))
      .sendKeys(`${instagramData.firstName}`)

    // set instagram account name
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(5) > div > label > input'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(5) > div > label > input'))
      .sendKeys(instagramData.accountName)

    // set password
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(6) > div > label > input'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > form > div:nth-of-type(6) > div > label > input'))
      .sendKeys(instagramData.password)

    // click to registration button
    await waitElement(driver, By.xpath('/html/body/div[1]/section/main/div/div/div[1]/div/form/div[7]/div/button'))
    console.log('registration')
    await driver.sleep(1500)

    await driver.findElement(By.xpath('/html/body/div[1]/section/main/div/div/div[1]/div/form/div[7]/div/button'))
      .click()

    // wait a new fields
    await driver.sleep(1000)

    // set dateOfBirth month
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span > select'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span > select'))
      .sendKeys(monthsRuText[instagramData.dateOfBirth.month])

    // set dateOfBirth day
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span:nth-of-type(2) > select'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span:nth-of-type(2) > select'))
      .sendKeys(instagramData.dateOfBirth.day)

    // set dateOfBirth year
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span:nth-of-type(3) > select'))
    await driver.findElement(By.css(`div#react-root > section > main > div > div > div > div > div:nth-of-type(4) > div > div > span > span:nth-of-type(3) > select`))
      .sendKeys(instagramData.dateOfBirth.year)

    // click to next button
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div > div:nth-of-type(6) > button'))
    await driver.findElement(By.css(`div#react-root > section > main > div > div > div > div > div:nth-of-type(6) > button`))
      .click()


    // wait a verification code
    const imapConfig = {
      id: instagramData.email._id,
      user: instagramData.email.accountName,
      password: instagramData.email.imapPassword,
      host: 'imap.mail.ru',
      port: 993,
      tls: true
    }

    const mailFromInstagram = await getEmails(imapConfig)

    const verificationCode = mailFromInstagram.subject.substring(0, 6)

    console.log('verificationCode: ', verificationCode)

    // set a verification code
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div:nth-of-type(2) > form > div > div > input'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div:nth-of-type(2) > form > div > div > input'))
      .sendKeys(verificationCode)

    // click to next button
    await waitElement(driver, By.css('div#react-root > section > main > div > div > div > div:nth-of-type(2) > form > div > div:nth-of-type(2)'))
    await driver.findElement(By.css('div#react-root > section > main > div > div > div > div:nth-of-type(2) > form > div > div:nth-of-type(2)'))
      .click()

    return { driver, result: true }
  }
  catch (err) {
    console.log('catched Error: ', err)
    return { driver, result: false }
  }
  finally {
    console.log(instagramData)
  }
}

module.exports = setRegistrationDataForInstagram
