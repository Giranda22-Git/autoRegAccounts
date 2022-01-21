const getMessageTextFromEmail = function (message) {
  const startIndex = message.indexOf('Content-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n')
  const endIndex = message.indexOf('----ALT--', startIndex)

  const base64Value = message.substring(startIndex + 'Content-Type: text/plain; charset=utf-8\r\nContent-Transfer-Encoding: base64\r\n\r\n'.length, endIndex)

  const value = Buffer.from(base64Value, 'base64').toString()

  return value
}

module.exports = getMessageTextFromEmail
