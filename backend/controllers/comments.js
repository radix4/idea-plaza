const commentsRouter = require('express').Router()
const Idea = require('../models/idea')

/**
 * This function adds a comment to the database.
 */
commentsRouter.post('/', async (request, response) => {
  if (request.body.content.length < 1) {
    response.status(400).json({ error: "Empty content" })
    return
  }
  // array name: "questions" or "criticisms"
  const arrayName = request.body.type + 's'
  const ideaID = request.body.idea

  try {
    await Idea.findOneAndUpdate(
      { _id: ideaID },
      { $push: { [arrayName]: request.body.content } })

    response.status(200).json(request.body)
  } catch (e) {
    console.log("Error adding comment:", e)
    response.status(500).end()
  }
})

module.exports = commentsRouter
