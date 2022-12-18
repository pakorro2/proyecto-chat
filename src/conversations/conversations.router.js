const router = require('express').Router();
const conversationServices = require('./conversations.services')
const passportJWT = require('../middlewares/auth.middleware')
const messageServevices = require('../messages/messages.services')
const participantValidate = require('../middlewares/participantValidate.middleware')


router.route('/')
  .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getAllConversations)
  .post(passportJWT.authenticate('jwt', { session: false }), conversationServices.postConversations)


router.route('/:conversation_id')
  .get(passportJWT.authenticate('jwt', { session: false }), conversationServices.getConversationsById)
  .patch(passportJWT.authenticate('jwt', { session: false }), conversationServices.patchConversations)
  .delete(passportJWT.authenticate('jwt', { session: false }), conversationServices.deleteConversations)

router.route('/:conversation_id/message')
  .post(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServevices.postMessage)
  .get(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServevices.getAllMessage)

router.route('/:conversation_id/message/:message_id')
  .get(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServevices.getMessageById)
  .delete(passportJWT.authenticate('jwt', { session: false }), participantValidate, messageServevices.deleteMessage)


module.exports = router



