const mongoProxy = require("../../../models/proxy")

const mongoUpdateProxyUsedInInstagram = async function (proxyId, instagramId) {
  await mongoProxy.updateOne(
    { _id: proxyId },
    { $push: { instagram: instagramId } }
  ).exec()
}

module.exports = mongoUpdateProxyUsedInInstagram
