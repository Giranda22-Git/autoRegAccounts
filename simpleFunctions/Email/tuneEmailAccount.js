const {Builder, By, Key, until} = require('selenium-webdriver')
const sendCaptchaToRuCaptcha = require('../sendCaptchaToRuCaptcha.js')
const mongoUpdateTuneEmail = require('../mongoFunc/Email/mongoUpdateTuneEmail.js')
const waitElement = require('../waitElement.js')

const tuneEmailAccount = async function (driver, emailData) {
  try {
    let tabs = await driver.getAllWindowHandles()

    await driver.switchTo().window(tabs[0])

    // const firstLoginSettingElement = false //await driver.findElement(By.css('html > body > div:nth-of-type(16) > div:nth-of-type(2) > div > div > div:nth-of-type(2) > form > div > div > div:nth-of-type(2) > div:nth-of-type(3) > div > button > spanhtml > body > div:nth-of-type(16) > div:nth-of-type(2) > div > div > div:nth-of-type(2) > form > div > div > div:nth-of-type(2) > div:nth-of-type(3) > div > button > span'))

    // if (firstLoginSettingElement) {
    //   await firstLoginSettingElement.click()

    //   await driver.findElement(By.css('html > body > div:nth-of-type(16) > div:nth-of-type(2) > div > div > div:nth-of-type(3) > form > div > div > div:nth-of-type(6) > div > button > span'))
    //     .click()

    //   await driver.findElement(By.css('html > body > div:nth-of-type(16) > div:nth-of-type(2) > div > div > div > svg'))
    //     .click()
    // }

    await waitElement(driver, By.css('div#ph-whiteline > div > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(2)'))

    await driver.findElement(By.css('div#ph-whiteline > div > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(2)'))
      .click()

    await waitElement(driver, By.css('div#ph-whiteline > div > div:nth-of-type(3) > div > div > a:nth-of-type(2) > div:nth-of-type(2)'))

    await driver.findElement(By.css('div#ph-whiteline > div > div:nth-of-type(3) > div > div > a:nth-of-type(2) > div:nth-of-type(2)'))
      .click()

    tabs = await driver.getAllWindowHandles()

    await driver.switchTo().window(tabs[0])

    await driver.wait(until.urlContains('id.mail.ru/security'), 5000)

    await waitElement(driver, By.css('div#root > div > div:nth-of-type(3) > div > a:nth-of-type(5) > div:nth-of-type(2) > div > div:nth-of-type(2) > svg'))

    await driver.findElement(By.css('div#root > div > div:nth-of-type(3) > div > a:nth-of-type(5) > div:nth-of-type(2) > div > div:nth-of-type(2) > svg'))
      .click()

    await driver.wait(until.urlContains('account.mail.ru/user/2-step-auth/passwords'), 3000)

    await waitElement(driver, By.css('div#account-content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(5) > div > a > span'))

    await driver.findElement(By.css('div#account-content > div:nth-of-type(3) > div > div:nth-of-type(2) > div > div:nth-of-type(5) > div > a > span'))
      .click()

    await waitElement(driver, By.name('name'))

    await driver.findElement(By.name('name'))
      .sendKeys('automatization')

    await driver.findElement(By.className('btn_main btn_stylish'))
      .click()

    await waitElement(driver, By.css('input'))
    await driver.sleep(1000)

    await driver.findElement(By.css('input'))
      .sendKeys(emailData.password)

    await driver.sleep(3000)

    const targetReCaptcha = await driver.findElement(By.css('iframe'))
    const reCaptchaSrc = await targetReCaptcha.getAttribute('src')
    const reCaptchaSrcArguments = reCaptchaSrc.split('&')
    const reCaptchaKey = reCaptchaSrcArguments[1].split('=')[1]
    const pageurl = await driver.getCurrentUrl()

    const reCaptchaAnswer = await sendCaptchaToRuCaptcha('userrecaptcha', { googlekey: reCaptchaKey, pageurl })

    await driver.executeScript("document.getElementById('g-recaptcha-response').style.display = 'block';")

    await driver.findElement(By.id('g-recaptcha-response'))
      .sendKeys(reCaptchaAnswer)

    await driver.executeScript("___grecaptcha_cfg.clients[0].H.H.callback()")

    await waitElement(driver, By.css('div#account-content > div:nth-of-type(3) > div > div > div > div:nth-of-type(4) > form > div:nth-of-type(7) > div > button > span'))

    await driver.findElement(By.css('div#account-content > div:nth-of-type(3) > div > div > div > div:nth-of-type(4) > form > div:nth-of-type(7) > div > button > span'))
      .click()

    await waitElement(driver, By.className('view_dialog__password'))

    const imapPassword = await driver.findElement(By.className('view_dialog__password')).getText()

    console.log('new imapPassword: ', imapPassword)

    await mongoUpdateTuneEmail(emailData.accountName, imapPassword)

    emailData.imapPassword = imapPassword

    return { result: emailData, driver }
  }
  catch (err) {
    console.log(err)
    return { result: false, driver }
  }
}

module.exports = tuneEmailAccount
