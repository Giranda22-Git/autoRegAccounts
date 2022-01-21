const { until } = require('selenium-webdriver')
const { uid } = require('uid')

const waitElement = async function (driver, locate, id) {
  try {
    if (!id) {
      id = uid(3)
    }

    console.log('waitElement: ', id)

    const result = await driver.wait(until.elementLocated(locate), 2000)

    if (result) {
      return true
    }
    else {
      throw new Error('error')
    }
  }
  catch (err) {
    driver.sleep(500)
    return await waitElement(driver, locate, id)
  }
}

module.exports = waitElement
