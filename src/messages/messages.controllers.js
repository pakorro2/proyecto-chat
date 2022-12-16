const Messages = require('../models/massages.model')
const uuid = require('uuid')

const createMessage = async (obj) => {
  const data = await Messages.create({
    id: uuid.v4(),
    userId: obj.userId,
    conversationId: obj.conversationId,
    message: obj.message
  })
  return data
}

module.exports = {
  createMessage
}