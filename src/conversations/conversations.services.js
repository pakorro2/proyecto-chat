const conversationControllers = require('./conversations.controllers')

const getAllConversations = (req, res) => {
  conversationControllers.findAllConversations()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postConversations = (req, res) => {
  const { title, imageUrl, participantId } = req.body
  const ownerId = req.user.id
  conversationControllers.createConversation({ title, imageUrl, participantId, ownerId })
    .then(data => {
      if (participantId !== ownerId) {
        res.status(201).json(data)
      } else {
        res.status(404).json({ message: 'The conversation requires at least 2 participants' })
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message, fields: {
          title: 'string',
          imageUrl: 'https://myweb.com/image/myimage.png',
          participantId: 'UUID'
        }
      })
    })
}


const getConversationsById = (req, res) => {
  const id = req.params.conversation_id
  conversationControllers.findConversationsById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Inalid ID' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const patchConversations = (req, res) => {
  const id = req.params.conversation_id
  const { title, imageUrl } = req.body
  conversationControllers.updateConversations(id, { title, imageUrl })
    .then(data => {
      if (data) {
        res.status(200).json({ message: `Conversation with id ${id} update succesfully!` })
      } else {
        res.status(404).json({ message: 'Inalid ID' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.messages })
    })
}

const deleteConversations = (req, res) => {
  const id = req.params.conversation_id
  conversationControllers.deleteConversations(id)
    .then(data => {
      if (data) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: 'Inalid ID' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.messages })
    })
}

module.exports = {
  getAllConversations,
  getConversationsById,
  postConversations,
  patchConversations,
  deleteConversations
}