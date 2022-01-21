const { uid } = require('uid')

module.exports =
class Instagram {
  constructor (email) {
    this.email = email
    this.firstName = email.firstName
    this.lastName = email.lastName
    this.dateOfBirth = email.dateOfBirth
    this.accountName = uid(15)
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