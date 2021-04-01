const ideasRouter = require('express').Router()
const Idea = require('../models/idea') /* User automatically create 'users' collection in mongodb */

/**
 * This function adds a user to the database.
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

module.exports = ideasRouter
