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

const findAllMessages = async (id) => {
  const data = await Messages.findAll({
    where: {
      conversationId: id
    }
  })
  return data
}
const findMessagesById = async (id) => {
  const data = await Messages.findOne({
    where: {
      id: id
    }
  })
  return data
}
const removeMessage = async ({ id, myUser }) => {
  const data = await Messages.destroy({
    where: {
      id: id,
      userId: myUser
    }
  })
  return data
}

module.exports = {
  createMessage,
  findAllMessages,
  findMessagesById,
  removeMessage
}