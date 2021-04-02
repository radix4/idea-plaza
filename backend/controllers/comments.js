const commentsRouter = require('express').Router()
const Comment = require('../models/comment') /* User automatically create 'users' collection in mongodb */

/**
 * This function adds a comment to the database.
 */
commentsRouter.post('/', async (request, response) => {
  const body = request.body

  console.log(body)

  const comment = new Comment({
    content: body.content,
    replies: body.replies,
    //idea: body.idea,
  })

  const savedComment = await comment.save()
  response.json(savedComment)
  console.log('Comment saved!')
})

module.exports = commentsRouter
