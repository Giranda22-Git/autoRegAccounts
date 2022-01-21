const axios = require('axios').default
const settings = require('../staticData/settings.js').data

const sendCaptchaToRuCaptcha = async function (method, value) {
  const params = {
    key: settings.rucaptchaApiKey,
    method
  }

  if (method === 'base64') {
    params.body = value
  }
  else if (method === 'userrecaptcha') {
    params.googlekey = value.googlekey,
    params.pageurl = value.pageurl
  }

  console.log(params)

  const response = await axios.post('http://rucaptcha.com/in.php', params)
  console.log(response.data)
  const answerArray = response.data.split('|')

  const status = answerArray[0]

  if (status === 'OK') {
    const captchaId = answerArray[1]
    console.log(status, captchaId)

    const result = await getAnswerOfCaptcha(captchaId)

    console.log('rucaptcha result: ', result)

    return result
  }
}

async function getAnswerOfCaptcha (captchaId) {
  const response = await axios.get(`https://rucaptcha.com/res.php?key=${settings.rucaptchaApiKey}&action=get&id=${captchaId}&json=1`)

  if (response.data.status === 1) {
    return response.data.request
  }
  else {
    return await getAnswerOfCaptcha(captchaId)
  }
}

module.exports = sendCaptchaToRuCaptcha
