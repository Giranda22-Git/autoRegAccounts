const mongoProxy = require('../../../models/proxy.js')

const mongoGetUnUsedProxy = async function () {
  const proxys = await mongoProxy.find().lean().exec()

  const targetProxys = proxys.filter(proxy => {
    return proxy.instagram.length < 10 && proxy.email.length < 10
  })

  console.log(targetProxys)

  return targetProxys[0]
}

module.exports = mongoGetUnUsedProxy
