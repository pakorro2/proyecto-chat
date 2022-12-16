const userControllers = require('./users.controllers')
const mailer = require('../utils/mailer')
const config = require('../../config')
//Get Post 

const getAllUsers = (req, res) => {
  userControllers.findAllUsers()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const getUserById = (req, res) => {
  const id = req.params.id
  userControllers.findUserById(id)
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

const getMyUser = (req, res) => {
  const id = req.user.id
  userControllers.findUserById(id)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const postUser = (req, res) => {
  const { firstName, lastName, email, password, gender, birthday, phone, profileImgeUrl } = req.body
  userControllers.createUser({ firstName, lastName, email, password, gender, birthday, phone, profileImgeUrl })
    .then(async data => {
      //? Usando sendMail de la libreria nodemailer 
      //? Lo estamos usando para enviar un mensaje a
      //? los nuevos usuarios que se crean una cuanta
      await mailer.sendMail({
        from: `<${config.api.email}>`,
        to: data.email,
        subject: `Bienvenido ${data.firstName} ${data.lastName}`,
        // html: `<h1>Hola bienvenido a app X! </h1>`,
        text: 'Que gusto verte por aqui',

      })
      res.status(201).json(data)
    })
    .catch(err => {
      res.status(400).json({
        message: err.message, fields: {
          firstName: 'String',
          lastName: 'String',
          email: 'example@email.com',
          password: 'String',
          gender: 'String',
          birthday: 'YYYY/MM/DD',
          phone: '1112223333',
          profileImgeUrl: 'https://yourpage.com/images/profile.png'
        }
      })
    })
}

//? Solo admins pueden ejecutarlo
const patchUser = (req, res) => {
  const id = req.paramas.id
  const { firstName, lastName, email, gender, birthday, phone, profileImgeUrl, role, status } = req.body

  userControllers.updateUser(id, { firstName, lastName, email, gender, birthday, phone, profileImgeUrl, role, status })
    .then(data => {
      if (data) {
        res.status(200).json({ message: `User edited succesfully whit id: ${id}` })
      } else {
        res.status(404).json({ message: `User whit id: ${id}, not found` })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const patchMyUser = (req, res) => {
  const id = req.user.id
  const { firstName, lastName, gender, birthday, phone, profileImgeUrl } = req.body
  userControllers.updateUser(id, { firstName, lastName, gender, birthday, phone, profileImgeUrl })
    .then(() => {
      res.status(200).json({ message: 'Your user was edited succesfully!' })
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

//? Solo admins pueden ejecutarlo
const deleteUser = (req, res) => {
  const id = req.params.id
  userControllers.deleteUser(id)
    .then(data => {
      if (data) {
        res.status(204).json()
      } else {
        res.status(404).json({ message: `User whit id: ${id}, not found` })
      }
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

const deleteMyUser = (req, res) => {
  const id = req.user.id
  userControllers.deleteUser(id)
    .then(() => {
      res.status(204).json()
    })
    .catch(err => {
      res.status(400).json({ message: err.message })
    })
}

module.exports = {
  getAllUsers,
  getUserById,
  getMyUser,
  postUser,
  patchUser,
  patchMyUser,
  deleteUser,
  deleteMyUser
}