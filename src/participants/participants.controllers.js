const uuid = require('uuid')
const Participants = require('../models/participants.model')


const findParticipantConversations = async (userId, conversationId) => {
  const data = await Participants.findOne({
    where: {
      userId: userId,
      conversationId: conversationId
    }
  })
  return data
}

module.exports = {
  findParticipantConversations
}