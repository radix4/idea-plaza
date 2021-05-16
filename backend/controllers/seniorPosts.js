const postsRouter = require('express').Router()
const Idea = require('../models/idea') /* User automatically create 'users' collection in mongodb */
const User = require('../models/user')
const Comment = require('../models/comment')
const Reply = require('../models/reply')
const SeniorTeamPost = require('../models/seniorPost')

/**
 * This function adds a post to the database.
 */
postsRouter.post('/', async (request, response) => {
  const body = request.body
  const post = new SeniorTeamPost({
    title: body.title,
    major: body.major,
    technologies: body.technologies,
    strengths: body.strengths,
    weaknesses: body.weaknesses,
    author: body.author,
    user: body.user,
    date: new Date(),
  })

  try {
    const savedPost = await post.save()
    response.json(savedPost)
  } catch (error) {
    console.log('Could not save idea:', error)
    response.status(500).end()
  }
})

// This function gets all posts
postsRouter.get('/', async (request, response) => {
  await SeniorTeamPost.find({}).then((posts) => {
    response.json(posts)
  })
})

module.exports = postsRouter
