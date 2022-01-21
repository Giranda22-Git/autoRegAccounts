const mongoInstagram = require('../../../models/instagram.js')

const mongoUpdateInstagramUsedProxy = async function (instagramId, proxyId) {
  await mongoInstagram.updateOne(
    { _id: instagramId },
    { email: proxyId }
  ).exec()
}

module.exports = mongoUpdateInstagramUsedProxy
