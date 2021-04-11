const ideasRouter = require('express').Router()
const Idea = require('../models/idea') /* User automatically create 'users' collection in mongodb */

/**
 * This function adds an idea to the database.
 */
ideasRouter.post('/', async (request, response) => {
  const body = request.body

  console.log(body)

  const idea = new Idea({
    title: body.title,
    problemStatement: body.problemStatement,
    author: body.author,
    upVote: body.upVote,
    downVote: body.downVote,
    questions: body.questions,
    criticisms: body.criticisms,
    //user: body.user,
  })

  const savedIdea = await idea.save()
  response.json(savedIdea)
  console.log('Idea saved!')
})

// This function gets an idea from the database
ideasRouter.get('/:id', async (request, response) => {
  const ideaID = request.params.id
  try {
    const idea = await Idea.findOne({ _id: ideaID })
    response.json(idea)
  } catch {
    response.status(404).json({ error: 'Idea does not exist' })
    console.log('Could not find idea', ideaID)
  }
})

// This function adds an upvote/downvote rating to an idea
ideasRouter.post('/:id/rating', async (request, response) => {
  // type should be upVote or downVote
  const type = request.body.type
  try {
    const ideaID = request.params.id
    await Idea.findOneAndUpdate(
      { _id: ideaID },
      { $inc: { [type]: 1 } })

      response.json(request.body)
  } catch {
    response.status(404).json({ error: 'Idea does not exist' })
    console.log('Error 404: Idea does not exist')
  }
})

module.exports = ideasRouter
