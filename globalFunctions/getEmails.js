const ImapClient = require('emailjs-imap-client-2').default
const mongoUpdateInstagramMail = require('../simpleFunctions/mongoFunc/Email/mongoUpdateInstagramMail.js')
const mailFromInstagramEvent = require('../simpleFunctions/customEvents/mailFromInstagramEvent.js')

const getEmails = async function (imapConfig) {
  const client = new ImapClient(imapConfig.host, imapConfig.port, {
    auth: {
      user: imapConfig.user,
      pass: imapConfig.password
    }
  })

  // Handling imap mail error
  client.onerror = (err) => {
    console.log(err)
  };

  client.onupdate = function (path, type, value) {
    if (path === 'INBOX/Social' && type === 'exists') {
      return client.listMessages('INBOX/Social', '1:*', ['uid', 'flags', 'envelope', 'body[]'])
        .then(messages => {
          const lastMessage = messages[messages.length - 1]

          const messageDate = new Date(lastMessage.envelope.date)
          const messageSubject = lastMessage.envelope.subject
          const messageBody = lastMessage['body[]']

          mongoUpdateInstagramMail(imapConfig.id, messageDate, messageSubject, messageBody)

          console.log('новое сообщение ' + messageDate + ':\n' + messageSubject + ':\n')
        })
    }
  }

  // Create mail connection
  await client.connect();

  client.subscribeMailbox('INBOX').then(() => {
    console.log('subscribed')
  })

  client.listMessages('INBOX/Social', '1:*', ['uid', 'envelope', 'flags', 'body[]']).then((messages) => {
    messages.forEach((message) => {
      const messageDate = new Date(message.envelope.date);
      const messageSubject = message.envelope.subject;
      const messageBody = message['body[]'];

      console.log(messageSubject)
    })
  })

  const mailFromInstagram = await mailFromInstagramEvent(imapConfig.id)

  // Close mail connection
  await client.close()

  return mailFromInstagram
}

module.exports = getEmails
