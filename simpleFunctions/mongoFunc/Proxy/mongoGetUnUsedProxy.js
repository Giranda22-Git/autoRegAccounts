const mongoProxy = require('../../../models/proxy.js')

const mongoGetUnUsedProxy = async function (subject) {
  const proxys = await mongoProxy.find({ subject }).lean().exec()

  console.log(`${subject}: ${proxys.length}`)
  console.log(proxys[0])

  return proxys[0]
}

module.exports = mongoGetUnUsedProxy
