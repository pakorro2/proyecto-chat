const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.model')
const Messages = require('./massages.model')
const Participants = require('./participants.model')

const initModels = () => {
  //? RecoveryPasswords
  Users.hasMany(RecoveryPasswords)
  RecoveryPasswords.belongsTo(Users)

  //? Realaciones de cada tabla (donde hay fk)

  //? Participants - Tabla pivote
  Users.hasMany(Participants)
  Participants.belongsTo(Users)
  Conversations.hasMany(Participants)
  Participants.belongsTo(Conversations)

  //? Conversations
  Users.hasMany(Conversations)
  Conversations.belongsTo(Users)

  //? Mesages
  Users.hasMany(Messages)
  Messages.belongsTo(Users)
  Conversations.hasMany(Messages)
  Messages.belongsTo(Conversations)
}

module.exports = initModels