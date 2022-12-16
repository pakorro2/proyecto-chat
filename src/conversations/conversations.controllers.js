const Participants = require('../models/participants.model')
const Users = require('../models/users.models')
const Conversation = require('../models/conversations.model')
const uuid = require('uuid')

const findAllConversations = async () => {
  const data = await Conversation.findAll({
    include: {
      model: Participants,
      include: {
        model: Users,
        attributes: {
          exclude: ['id', 'email', 'password', 'role', 'status', 'isVerified', 'createdAt', 'updatedAt']
        },
      }
    }
  })
  return data
}

const createConversation = async (obj) => {
  const newConversation = await Conversation.create({
    id: uuid.v4(),
    title: obj.title,
    imageUrl: obj.imageUrl,
    userId: obj.ownerId //? creador de la conversacion (owner)
  })

  //? Se agregan los 2 participantes minimos para que exista la conversacion
  const participant1 = await Participants.create({
    id: uuid.v4(),
    userId: obj.ownerId,//? Este es el usuario que viene desde el token
    conversationId: newConversation.id,
  })
  const participant2 = await Participants.create({
    id: uuid.v4(),
    userId: obj.participantId, //? Este es el usuario que viene desde el body
    conversationId: newConversation.id,
  })
  return {
    newConversation,
    participant1,
    participant2
  }
}


const findConversationsById = async (id) => {
  const data = await Conversation.findOne({
    where: {
      id: id
    },
    include: {
      model: Participants, include: {
        model: Users
      }
    }
  })
  return data
}


const updateConversations = async (id, obj) => {
  const data = await Conversation.update(obj, {
    where: {
      id: id
    }
  })
  return data[0]
}
const deleteConversations = async (id) => {
  const data = await Conversation.destroy({
    where: {
      id: id
    }
  })
  return data
}

module.exports = {
  findAllConversations,
  createConversation,
  findConversationsById,
  updateConversations,
  deleteConversations
}


