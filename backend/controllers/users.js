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

usersRouter.post('/updateBios_Achieve', async (request, response) => {
  const body = request.body

  const find = { firstName: body.firstName }
  const update = { biography: 'test1', achievements: 'test1' }

  const doc = await User.findOneAndUpdate(find, update, (error, data) => {
    if (error) {
      // prints error
      console.log(error)
    } else {
      // prints outcome
      console.log(data)
      response.json(data)
    }
  })

  console.log('Updated user')
})

module.exports = usersRouter
