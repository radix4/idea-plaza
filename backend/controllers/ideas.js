const ideasRouter = require('express').Router()
const Idea = require('../models/idea') /* User automatically create 'users' collection in mongodb */
const User = require('../models/user')
const Comment = require('../models/comment')

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
    user: body.user,
  })

  try {
    // Save idea to db
    const savedIdea = await idea.save()
    console.log('Idea saved:', savedIdea.title)

    // Find user and add the idea reference to array
    const user = await User.findOneAndUpdate(
      { _id: body.user },
      { $push: { ideas: savedIdea._id } }
    )
    if (!user) {
      console.log('Error saving idea: no user with ID:', body.user)
      // Delete idea
      await Idea.deleteOne({ _id: savedIdea._id })
      console.log('Deleted invalid idea')
      throw 'Could not find user'
    }
    response.json(savedIdea)
  } catch (error) {
    console.log('Could not save idea:', error)
    response.status(500).end()
  }
})

// This function gets an idea from the database
ideasRouter.get('/:id', async (request, response) => {
  const ideaID = request.params.id
  try {
    const idea = await Idea.findOne({ _id: ideaID })
    idea.questions = await Comment.find({
      idea: ideaID,
      feedbackType: 'question',
    })
    idea.criticisms = await Comment.find({
      idea: ideaID,
      feedbackType: 'criticism',
    })
    response.json(idea)

    console.log('Got the idea:\n' + idea)
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
    await Idea.findOneAndUpdate({ _id: ideaID }, { $inc: { [type]: 1 } })

    response.json(request.body)
  } catch {
    response.status(404).json({ error: 'Idea does not exist' })
    console.log('Error 404: Idea does not exist')
  }
})

module.exports = ideasRouter
