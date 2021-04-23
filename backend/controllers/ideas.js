const ideasRouter = require('express').Router()
const Idea = require('../models/idea') /* User automatically create 'users' collection in mongodb */
const User = require('../models/user')
const Comment = require('../models/comment')
const Reply = require('../models/reply')

/**
 * This function adds an idea to the database.
 */
ideasRouter.post('/', async (request, response) => {
  const body = request.body

  console.log('BE/controllers/ideas.js: ', body)

  const idea = new Idea({
    title: body.title,
    problemStatement: body.problemStatement,
    author: body.author,
    upVote: body.upVote,
    downVote: body.downVote,
    questions: body.questions,
    criticisms: body.criticisms,
    user: body.user,
    date: new Date(),
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

// This function saves changes to an existing idea
ideasRouter.post('/edit/:id', async (request, response) => {
  const ideaID = request.params.id
  try {
    // Save changes
    const savedIdea = await Idea.findOneAndUpdate(
      { _id: ideaID },
      {
        title: request.body.title,
        problemStatement: request.body.problemStatement,
      }
    )
    console.log('Changes to idea saved:', savedIdea.title)

    response.json(savedIdea)
  } catch (error) {
    console.log('Could not save changes to idea:', error)
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
    for (let i = 0; i < idea.questions.length; i++) {
      idea.questions[i].replies = await Reply.find({
        comment: idea.questions[i].id,
      })
    }
    idea.criticisms = await Comment.find({
      idea: ideaID,
      feedbackType: 'criticism',
    })
    for (let i = 0; i < idea.criticisms.length; i++) {
      idea.criticisms[i].replies = await Reply.find({
        comment: idea.criticisms[i].id,
      })
    }
    response.json(idea)
  } catch (error) {
    response.status(404).json({ error: 'Idea does not exist' })
    console.log('Could not find idea', ideaID, error)
  }
})

ideasRouter.get('/', async (request, response) => {
  await Idea.find({}).then((ideas) => {
    response.json(ideas)
  })
})

// This function adds an upvote/downvote rating to an idea
ideasRouter.post('/:id/rating', async (request, response) => {
  // type should be upVote or downVote
  const type = request.body.type

  console.log('type ' + type)
  try {
    const ideaID = request.params.id
    await Idea.findOneAndUpdate({ _id: ideaID }, { $inc: { [type]: 1 } })

    response.json(request.body)
  } catch {
    response.status(404).json({ error: 'Idea does not exist' })
    console.log('Error 404: Idea does not exist')
  }
})

/**
 * This function deletes the idea
 */
ideasRouter.delete('/:id', async (request, response) => {
  try {
    const ideaId = request.params.id

    const deletedIdea = await Idea.findOne({ _id: ideaId })
    const userId = deletedIdea.user
    console.log(userId)

    const author = User.findOne({ _id: userId })
    console.log('author email ' + author.email)
    User.findOneAndUpdate({ _id: userId }, { $pull: { ideas: ideaId } })
    const ideasArray = author.ideas
    console.log(ideasArray)

    console.log(userId)
    await Idea.deleteOne({ _id: ideaId })
    response.status(204).json()
    console.log(deletedIdea)
    console.log('Idea deleted!')

    await Comment.deleteMany({ idea: ideaId })
      .then(function () {
        console.log('Comments deleted') // Success
      })
      .catch(function (error) {
        console.log('Comment deletion ' + error) // Failure
      })

    await Reply.deleteMany({ idea: ideaId })
      .then(function () {
        console.log('Replies deleted') // Success
      })
      .catch(function (error) {
        console.log('Reply deletion ' + error) // Failure
      })
  } catch {
    response.status(404)
    response.json({ error: 'Idea does not exist' })
    console.log('Idea delete: Error 404: Idea does not exist')
  }
})

module.exports = ideasRouter
