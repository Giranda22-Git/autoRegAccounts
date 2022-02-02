const { uid } = require('uid')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')

module.exports =
class Instagram {
  constructor (email) {
    this.email = email
    this.firstName = email.firstName
    this.lastName = email.lastName
    this.dateOfBirth = email.dateOfBirth
    this.accountName = uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals, colors, adjectives, colors, animals, adjectives],
      length: 8
    })
    this.password = email.password
  }

  get person () {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accountName: this.accountName,
      password: this.password
    }
  }
}