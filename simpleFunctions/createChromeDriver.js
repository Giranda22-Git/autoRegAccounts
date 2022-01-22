const SeleniumStealth = require('selenium-stealth-fixed')
const headerGenerator = require('header-generator')
const {Builder} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const Proxy = require('../lowLevelObjects/Proxy.js')
const Stealth = require('../lowLevelObjects/Stealth.js')

const createChromeDriver = async function (generateUserAgent, proxy) {
  try {
    if (!proxy) {
      proxy = await (await new Proxy().init()).activate()
    }

    const listOfChromeOptionArgs = [
      '--disable-blink-features=AutomationControlled',
      '--use-fake-ui-for-media-stream',
      '--start-maximized',
      '--disable-plugins-discovery',
      '--profile-directory=Default',
      '--disable-extensions',
      '--incognito',
      //`--proxy-server=${proxy.publicProxyUrl}`,
    ]

    if (generateUserAgent) {
      const generatedHeaders = new headerGenerator({
        browsers: [
          {name: "firefox", minVersion: 80},
          {name: "chrome", minVersion: 87},
          "safari"
        ],
        devices: [
          "desktop"
        ]
      }).getHeaders()

      console.log(generatedHeaders['user-agent'])

      listOfChromeOptionArgs.push(`--user-agent=${generatedHeaders['user-agent']}`)
    }

    let option = new chrome.Options().addArguments(listOfChromeOptionArgs)

    const driver = await new Builder()
      //.usingServer("http://localhost:4444/wd/hub")
      .setChromeOptions(option)
      .withCapabilities({
        'goog:chromeOptions': {
            excludeSwitches: [
                'enable-automation',
                'useAutomationExtension',
            ],
        },
      })
      .forBrowser('chrome')
      .build()


    const stealthParams = new Stealth()

    const seleniumStealth = new SeleniumStealth(driver)

    await seleniumStealth.stealth(stealthParams)

    //await driver.get('http://whatismyip.host/')
    await driver.get('https://bot.sannysoft.com/')
    await driver.sleep(1000)

    return {driver, proxy}
  }
  catch (err) {
    console.log('createChromeDriver Error: ', err)
  }
}

// languages: ["en-US", "en"],
// vendor: "Google Inc.",
// platform: "Win32",
// webglVendor: "Intel Inc.",
// renderer: "Intel Iris OpenGL Engine",
// fixHairline: true

module.exports = createChromeDriver

// {'PROXY_HOST':'45.140.75.90','PROXY_PORT':'30011',
// 'PROXY_USER':'reazer381_gmail_com','PROXY_PASS':'58cc69361f'},

// {'PROXY_HOST':'45.140.73.93','PROXY_PORT':'30011',
// 'PROXY_USER':'reazer381_gmail_com','PROXY_PASS':'58cc69361f'},

// {'PROXY_HOST':'45.140.75.177','PROXY_PORT':'30011',
// 'PROXY_USER':'reazer381_gmail_com','PROXY_PASS':'58cc69361f'},

// {'PROXY_HOST':'212.162.135.59','PROXY_PORT':'30011',
// 'PROXY_USER':'reazer381_gmail_com','PROXY_PASS':'58cc69361f'},

// {'PROXY_HOST':'212.162.135.5','PROXY_PORT':'30011',
// 'PROXY_USER':'reazer381_gmail_com','PROXY_PASS':'58cc69361f'},
