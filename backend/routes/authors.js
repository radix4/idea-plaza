const express = require('express')
const router = express.Router()
const Author = require('../models/Author')
const Idea = require('../models/Idea')

// Get All Route
router.get('/', async (req, res) => {
  try {
    let author = await new Author({ name: 'a1', biography: 'b1' })
    let idea = await new Idea({
      title: 'ideatest',
      problemDescription: 'pd1',
      currentSolutions: 'cs1',
      proposedSolution: 'ps1',
      author: author,
    })

    author.ideas.push(idea)
    author.save && idea.save
    const authors = await Author.find()
    res.json(authors)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get One Route
router.get('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    if (author == null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.json(author)
})

module.exports = router
