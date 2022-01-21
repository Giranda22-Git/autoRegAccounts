const router = require('express').Router()
const mongoProxy = require('../models/proxy.js')


router.get('/', async (req, res) => {
  try {
    const proxys = await mongoProxy.find().lean().exec()

    res.json(proxys)
  }
  catch (err) {
    console.log('proxy gateway (get all) error: ', err)
    res.sendStatus(500)
  }
})

router.post('/', async (req, res) => {
  try {
    const data = req.body

    const newProxys = new Array()

    if (Array.isArray(data.proxy)) {
      for (const proxy of data.proxy) {
        newProxys.push(await createNewProxy(proxy))
      }
    } else {
      newProxys.push(await createNewProxy(proxy))
    }

    res.json(newProxys)
  }
  catch (err) {
    console.log('proxy gateway (create new) error: ', err)
    res.sendStatus(500)
  }
})


module.exports = router

async function createNewProxy (proxy) {
  if (Object.keys(proxy)) {
    const newProxy = new mongoProxy(proxy)

    return await newProxy.save()
  }
}
