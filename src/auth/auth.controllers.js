const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const RecoveryPassword = require('../models/recoveryPasswords.models')
const uuid = require('uuid')

const chekUserCredentials = async (email, password) => {
  try {
    const user = await findUserByEmail(email)
    const verifydPassword = comparePassword(password, user.password)
    if (verifydPassword) {
      return user
    }
    return null

  } catch (error) {
    return null
  }
}

createRecoveryToken = async (email) => {
  try {
    const user = await findUserByEmail(email)
    const data = await RecoveryPassword.create({
      id: uuid.v4(),
      userId: user.id
    })
    return data
  } catch (error) {
    return error
  }
}

module.exports = {
  chekUserCredentials,
  createRecoveryToken
}