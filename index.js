const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// require mongo models
const mongoSaveEmail = require('./simpleFunctions/mongoFunc/Email/mongoSaveEmail.js')

// require setttings data
const settings = require('./staticData/settings.js').data

// initial express js application
const app = express()

// standart express middleweare settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
	res.contentType('application/json')
	next()
})
app.use(cors())

// require global functions
const createEmail = require('./globalFunctions/createEmail.js')
const getEmails = require('./globalFunctions/getEmails.js')
const tuneEmailsScreenplay = require('./globalFunctions/tuneEmailsScreenplay.js')
const createInstagram = require('./globalFunctions/createInstagram.js')

const mongoGetTunedEmails = require('./simpleFunctions/mongoFunc/Email/mongoGetTunedEmails.js')

// require simpleFunctions unrecomended*
const createChromeDriver = require('./simpleFunctions/createChromeDriver.js')

// declare init program function
async function init (settings) {

  // connect to mongodb
  await mongoose.connect(settings.mongoUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

  // function of event on mongodb connection open
  mongoose.connection.once('open', async () => {
    // listen http express server
    app.listen(settings.PORT, '0.0.0.0', (err) => {
			if (err) return new Error(`error in starting server, error: ${err}`)
			else console.log(`server started on \nPORT: ${settings.PORT}\nURL: ${settings.serverUrl}`)
		})

    // require and use express http endPoints
    app.use('/proxy', require('./endPoints/proxy.js'))

    // create email
    //const resultOfCreateEmail = await createEmail()

    // create instagram
    const targetEmail = await mongoGetTunedEmails()

    await createInstagram(targetEmail[0], targetEmail.proxy)

    // const imapConfig = {
    //   id: targetEmail[0]._id,
    //   user: targetEmail[0].accountName,
    //   password: targetEmail[0].imapPassword,
    //   host: 'imap.mail.ru',
    //   port: 993,
    //   tls: true
    // }

    // console.log(imapConfig)

    // const mailFromInstagram = await getEmails(imapConfig)

    // console.log(mailFromInstagram)

    //await tuneEmailsScreenplay()
	})

  // declare event on mongodb connection open
  mongoose.connection.emit('open')
}

init(settings)
