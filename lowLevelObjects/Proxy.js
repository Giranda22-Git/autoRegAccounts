const { uid } = require('uid')
const proxyChain = require('proxy-chain')
const mongoGetUnUsedProxy = require('../simpleFunctions/mongoFunc/Proxy/mongoGetUnUsedProxy.js')
const axios = require('axios').default

// instagram
const mongoUpdateInstagramUsedProxy = require('../simpleFunctions/mongoFunc/Instagram/mongoUpdateInstagramUsedProxy.js')
const mongoUpdateInstagramUsedEmail = require('../simpleFunctions/mongoFunc/Instagram/mongoUpdateInstagramUsedEmail.js')

// email
const mongoUpdateEmailUsedInInstagram = require('../simpleFunctions/mongoFunc/Email/mongoUpdateEmailUsedInInstagram.js')
const mongoUpdateEmailUsedProxy = require('../simpleFunctions/mongoFunc/Email/mongoUpdateEmailUsedProxy.js')

// proxy
const mongoUpdateProxyUsedInEmail = require('../simpleFunctions/mongoFunc/Proxy/mongoUpdateProxyUsedInEmail')
const mongoUpdateProxyUsedInInstagram = require('../simpleFunctions/mongoFunc/Proxy/mongoUpdateProxyUsedInInstagram.js')


module.exports =
class proxy {
  constructor (proxy) {
    this.setDefaultData(proxy)
  }

  setDefaultData (proxy) {
    if (proxy) {
      this.id = proxy._id
      this.host = proxy.host
      this.port = proxy.port
      this.username = proxy.username
      this.password = proxy.password
      this.instagram = proxy.instagram
      this.email = proxy.email
    }
  }

  get proxy () {
    return {
      id: this._id,
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      instagram: this.instagram,
      email: this.email
    }
  }

  /**
   * @param {{ _id: any; }} email
   */
  set addEmail (email) {
    this.email = email._id
  }

  /**
   * @param {{ _id: any; }} instagram
   */
  set addInstagram (instagram) {
    this.instagram = instagram._id
  }

  async init(subject) {
    try {
      this.updateProxyIp()

      const proxy = await mongoGetUnUsedProxy(subject)

      if (!proxy) {
        throw new Error('proxy servers is over')
      }

      this.setDefaultData(proxy)

      return this
    }
    catch (err) {
      console.log('proxy init error: ', err)
    }
  }

  async updateProxyIp () {
    await axios.get('http://185.70.109.21/x220xy7561c2t7d3o1mrd99r9bj2lj417.php')
    await axios.get('https://onlinesim.ru/api/proxy/changeIp.php?apikey=6437947a11fe16d32f552e76e28a8137&tzid=12734')
  }

  async activate () {
    const privateProxyUrl = `http://${this.username}:${this.password}@${this.host}:${this.port}`

    this.publicProxyUrl = await proxyChain.anonymizeProxy(privateProxyUrl)

    return this
  }

  async end () {
    if (this.instagram && this.email && this.id) {
      await this.bindAllModules()
    }

    await proxyChain.closeAnonymizedProxy(this.publicProxyUrl, true)
  }

  async endEmail (endProxy) {
    try {
      if (this.email && this.id) {
        // await mongoUpdateEmailUsedProxy(this.email, this.id)
        // await mongoUpdateProxyUsedInEmail(this.id, this.email)

        if (endProxy) {
          await proxyChain.closeAnonymizedProxy(this.publicProxyUrl, true)
        }
      }
      else {
        throw new Error('email | proxy id is undefined')
      }
    }
    catch (err) {
      console.log('Proxy class Error: ', err)
    }
  }

  async endInstagram (endProxy) {
    try {
      if (this.email && this.id && this.instagram) {
        // // instagram
        // await mongoUpdateInstagramUsedEmail(this.instagram, this.email)
        // await mongoUpdateInstagramUsedProxy(this.instagram, this.id)

        // // email
        // await mongoUpdateEmailUsedInInstagram(this.email, this.instagram)

        // // proxy
        // await mongoUpdateProxyUsedInInstagram(this.id, this.instagram)

        if (endProxy) {
          await proxyChain.closeAnonymizedProxy(this.publicProxyUrl, true)
        }
      }
      else {
        throw new Error('email | proxy id is undefined')
      }
    }
    catch (err) {
      console.log('Proxy class Error: ', err)
    }
  }

  async bindAllModules () {
    // instagram
    await mongoUpdateInstagramUsedEmail(this.instagram, this.email)
    await mongoUpdateInstagramUsedProxy(this.instagram, this.id)

    // email
    await mongoUpdateEmailUsedInInstagram(this.email, this.instagram)
    await mongoUpdateEmailUsedProxy(this.email, this.id)

    // proxy
    await mongoUpdateProxyUsedInEmail(this.id, this.email)
    await mongoUpdateProxyUsedInInstagram(this.id, this.instagram)
  }
}