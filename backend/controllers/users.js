const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user') /* User automatically create 'users' collection in mongodb */

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
    console.log('User get: Error 404: User does not exist')
  }
})
// Searches user by Email
usersRouter.post('/getUser', async (request, response) => {
  try {
    const body = request.body
    const user = await User.findOne({ email: body.email })
    response.json(user)
    console.log('Got the user:\n' + user)
  } catch {
    response.status(404)
    response.json({ error: 'User does not exist' })
    console.log('User get: Error 404: User does not exist ')
  }
})

/**
 * This function renders all users from db.
 */
usersRouter.get('/', async (request, response) => {
  await User.find({}).then((users) => {
    response.json(users)
  })
})

/* This function logs in the user. */
usersRouter.post('/login', async (request, response) => {
  console.log('controller/users.js: trying to login..')
  const body = request.body

  /* find user with same email */
  const user = await User.findOne({ email: body.email })

  let passwordCorrect = false

  console.log('controller/users.js: ', body)

  /* error checking when db could not find a match */
  if (user === null) {
    passwordCorrect = false
  } else if (body.password === user.password) {
    passwordCorrect = true
  }

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'controller/users.js: invalid email or password',
    })
  }

  console.log('controller/users.js: logged in')

  /* generate token for user */
  const userForToken = {
    email: user.email,
    id: user._id,
  }

  /* sign token with jwt.sign() */
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({
    token,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
})

/**
 * This function adds a user to the database.
 */
usersRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('controller/users.js: ', body)

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    biography: 'none',
    achievements: 'none',
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
    console.log('User patch: Error 404: User does not exist')
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
    console.log('User delete: Error 404: User does not exist')
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
