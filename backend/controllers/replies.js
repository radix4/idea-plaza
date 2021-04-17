const repliesRouter = require('express').Router()
const Idea = require('../models/idea')
const Comment = require('../models/comment')

const Reply = require('../models/reply')

/**
 * This function gets a comment from the database
 */
repliesRouter.get('/:id', async (request, response) => {
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
 * This function adds a reply to the database.
 */
repliesRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('replysRouter.post ' + body)

  if (request.body.content.length < 1) {
    response.status(400).json({ error: 'Empty content' })
    return
  }
  const commentID = body.comment

  const reply = new Reply({
    content: body.content,
    comment: commentID,
    author: body.author,
  })

  try {
    const savedReply = await reply.save()
    console.log(request.body + ' saved:', savedReply.content)

    await Comment.findOneAndUpdate({ _id: commentID }, { $push: { replies: reply._id } })

    response.status(200).json(request.body)
  } catch (e) {
    console.log('Error adding reply:', e)
    console.log(body)
    response.status(500).end()
  }
})

module.exports = repliesRouter
