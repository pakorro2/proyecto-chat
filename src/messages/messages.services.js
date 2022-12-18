const messageControllers = require('./messages.controllers')

const postMessage = (req, res) => {
  const userId = req.user.id
  const conversationId = req.params.conversation_id
  const { message } = req.body

  messageControllers.createMessage({ userId, conversationId, message })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({
        messages: err.message, fields: {
          message: 'text'
        }
      })
    })
}

const getAllMessage = (req, res) => {
  const id = req.params.conversation_id
  messageControllers.findAllMessages(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}
const getMessageById = (req, res) => {
  const id = req.params.message_id
  messageControllers.findMessagesById(id)
    .then(data => {
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(404).json({ message: 'Invalid ID' })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}
const deleteMessage = (req, res) => {
  const id = req.params.message_id
  const myUser = req.user.id
  messageControllers.removeMessage({ id, myUser }) //? Parametros necesarios para validar que somos los usuarios de el message a eliminar.
    .then(data => {
      if (data) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: "You can't delete messages from another user or invalid ID" })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

module.exports = {
  postMessage,
  getAllMessage,
  getMessageById,
  deleteMessage,
}