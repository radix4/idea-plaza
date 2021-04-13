const commentsRouter = require('express').Router()
const Idea = require('../models/idea')
const Comment = require('../models/comment')

/**
 * This function gets a comment from the database
 */
commentsRouter.get('/:id', async (request, response) => {
  try {
    const commentID = request.params.id
    const comment = await Comment.findOne({ _id: commentID })
    response.json(comment)
    console.log('Got the comment:\n' + comment)
  } catch {
    response.status(404)
    response.json({ error: 'Comment does not exist' })
    console.log('Comment get: Error 404: Comment does not exist')
  }
})

/**
 * This function adds a comment to the database.
 */
commentsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)

  if (request.body.content.length < 1) {
    response.status(400).json({ error: 'Empty content' })
    return
  }

  // array name: "questions" or "criticisms"
  const arrayName = request.body.type + 's'
  const ideaID = request.body.idea

  const comment = new Comment({
    content: body.content,
    idea: ideaID,
  })

  try {
    const savedComment = await comment.save()
    console.log(request.body.type + 's saved:', savedComment.content)

    await Idea.findOneAndUpdate(
      { _id: ideaID },
      { $push: { [arrayName]: comment._id } }
    )

    response.status(200).json(request.body)
  } catch (e) {
    console.log('Error adding comment:', e)
    response.status(500).end()
  }
})

module.exports = commentsRouter
