const usersRouter = require('express').Router()
const User = require('../models/user') /* User automatically create 'users' collection in mongodb */

/**
 * This function gets users from the database
 */
usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find()
    response.json(users)
    console.log('Got the users:\n' + user)
  } catch {
    response.status(404)
    response.json({ error: 'Users do not exist' })
    console.log('Error 404: Users do not exist')
  }
})

/**
 * This function gets the user from the database
 */
usersRouter.get('/:id', async (request, response) => {
  try {
    const userId = request.params.id
    const user = await User.findOne({ _id: userId })
    response.json(user)
    console.log('Got the user:\n' + user)
  } catch {
    response.status(404)
    response.json({ error: 'User does not exist' })
    console.log('Error 404: User does not exist')
  }
})

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

/**
 * This function updates the user in the database
 */
usersRouter.patch('/:id', async (request, response) => {
  try {
    const userId = request.params.id
    const body = request.body
    console.log(body)

    const user = await User.findOne({ _id: userId })
    console.log(user)

    if (body.firstName) {
      user.firstName = body.firstName
    }

    if (body.lastName) {
      user.lastName = body.lastName
    }

    if (body.email) {
      user.email = body.email
    }

    if (body.password) {
      user.password = body.password
    }

    if (body.biography) {
      user.biography = body.biography
    }

    if (body.achievements) {
      user.achievements = body.achievements
    }

    const updatedUser = await user.save()
    response.json(updatedUser)
    console.log('User updated!')
  } catch {
    response.status(404)
    response.json({ error: 'User does not exist' })
    console.log('Error 404: User does not exist')
  }
})

/**
 * This function deletes the user
 */
usersRouter.delete('/:id', async (request, response) => {
  try {
    const userId = request.params.id
    const body = request.body
    console.log(body)

    const deletedUser = await User.findOne({ _id: userId })
    await User.deleteOne({ _id: userId })
    response.status(204).json()
    console.log(deletedUser)
    console.log('User deleted!')
  } catch {
    response.status(404)
    response.json({ error: 'User does not exist' })
    console.log('Error 404: User does not exist')
  }
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
