const mongoProxy = require("../../../models/proxy")

const mongoUpdateEmailUsedProxy = async function (emailId, proxyId) {
  await mongoProxy.updateOne(
    { _id: emailId },
    { proxy: proxyId }
  ).exec()
}

module.exports = mongoUpdateEmailUsedProxy
