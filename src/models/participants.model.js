const { DataTypes } = require('sequelize')
const Users = require('./users.models')
const Conversations = require('./conversations.model')
const db = require('../utils/database')

const Participants = db.define('participants', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  },
  conversationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Conversations,
      key: 'id'
    }
  },
})

module.exports = Participants