const mongoProxy = require("../../../models/proxy")

const mongoUpdateProxyUsedInEmail = async function (proxyId, emailId) {
  await mongoProxy.updateOne(
    { _id: proxyId },
    { $push: { email: emailId } }
  ).exec()
}

module.exports = mongoUpdateProxyUsedInEmail
