const usersRouter = require('express').Router()
const User = require('../models/user') /* User automatically create 'users' collection in mongodb */

/**
 * This function adds a user to the database.
 */
usersRouter.post('/', async (request, response) => {
  const body = request.body

  console.log(body)

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  })

  const savedUser = await user.save()
  response.json(savedUser)
  console.log('User saved!')
})

module.exports = usersRouter
