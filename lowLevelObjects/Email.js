const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator')
const { uid } = require('uid')

module.exports =
class Email {
  constructor (firstName, lastName, dateOfBirth, sex, accountName, password) {
    this.firstName = firstName
    this.lastName = lastName
    this.dateOfBirth = dateOfBirth
    this.sex = sex
    this.accountName = accountName
    this.password = password

    return this.randomizeData()
  }

  get person () {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      sex: this.sex,
      accountName: this.accountName,
      password: this.password
    }
  }

  randomizeData () {
    this.firstName = this.randomizeFirstName()
    this.lastName = this.randomizeLastName()
    this.dateOfBirth = this.randomizeDateOfBirth()
    this.sex = this.randomizeSex()
    this.accountName = this.randomizeAccountName()
    this.password = this.randomizePassword()

    return this.person
  }

  randomizeFirstName () {
    if (this.firstName)
      return this.firstName

    return this.randomizeName()
  }

  randomizeLastName () {
    if (this.lastName)
      return this.lastName

    return this.randomizeName()
  }

  randomizeDateOfBirth () {
    if (this.dateOfBirth) {
      if (Object.keys(this.dateOfBirth).length > 0)
        return this.dateOfBirth
    }

    const randomDate = this.randomizeDateFromTo(new Date(1960, 1, 1), new Date(2000, 1, 1))

    return {
      day: randomDate.getDate(),
      month: randomDate.getMonth() + 1,
      year: randomDate.getFullYear()
    }
  }

  randomizeSex () {
    if (this.sex)
      return this.sex

    return ['male', 'female'][this.getRandomArbitrary(1, 2) - 1]
  }

  randomizeAccountName () {
    if (this.accountName)
      return this.accountName

    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3
    })
  }

  randomizePassword () {
    if (this.password)
      return this.password

    return uid(35)
  }

  // support functions is not available

  randomizeName () {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      length: 3
    })
  }

  randomizeDateFromTo (start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }

  getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min)
  }
}