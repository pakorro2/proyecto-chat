const { DataTypes } = require('sequelize')
const Users = require('./users.models')
const db = require('../utils/database')

const Conversations = db.define('conversations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    defaultValue: 'New Conversation',
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: 'id'
    }
  }
})

module.exports = Conversations