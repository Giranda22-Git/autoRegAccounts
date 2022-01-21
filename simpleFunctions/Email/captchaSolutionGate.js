const {Builder, By, Key, until} = require('selenium-webdriver')
const axios = require('axios').default
const sendCaptchaToRuCaptcha = require('../sendCaptchaToRuCaptcha.js')
const fs = require('fs').promises
const {uid} = require('uid')
const sharp = require('sharp')
const waitElement = require('../waitElement.js')

const captchaSolutionGate = async function (driver) {
  try {
    await waitElement(driver, By.className('styles-mobile__captchaImage--sHzh3'))

    await driver.sleep(2000)

    const image = await driver.takeScreenshot()

    const fileName = uid(10) + '.png'

    const filePath = `${__dirname}/../../assets/${fileName}`
    const finishFilePath = `${__dirname}/../../cropedCaptches/${fileName}`

    await fs.writeFile(filePath, image, 'base64')

    await cropImage(filePath, finishFilePath)
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err)
      }
    })

    const bitmap = await fs.readFile(finishFilePath)

    const base64_captcha_image = Buffer.from(bitmap).toString('base64')

    const answerToCaptcha = await sendCaptchaToRuCaptcha('base64', base64_captcha_image)

    fs.unlink(finishFilePath, (err) => {
      if (err) {
        console.log(err)
      }
    })

    // set answer to captcha
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(3) > div > div > form > div:nth-of-type(5) > div > div > div > div > div > div > input'))
      .sendKeys(answerToCaptcha)

    // click to check captcha
    await driver.findElement(By.css('html > body > div > div:nth-of-type(3) > div:nth-of-type(3) > div:nth-of-type(3) > div > div > form > button'))
      .click()

    return { driver, result: true }
  }
  catch (err) {
    console.log(err)
  }
}

async function getMetadata(filePath) {
  try {
    const metadata = await sharp(filePath).metadata()
    return metadata
  }
  catch (err) {
    console.log(err)
  }
}

async function cropImage(filePath, newFilePath) {
  try {
    console.log('file metaData: ', await getMetadata(filePath))
    await sharp(filePath)
      .extract({ width: 390, height: 180, left: 1215, top: 380  })
      .toFile(newFilePath)
  } catch (error) {
    console.log(error)
  }
}

module.exports = captchaSolutionGate
