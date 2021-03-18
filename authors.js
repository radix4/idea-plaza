const express = require('express')
const router = express.Router()
const Author = require('../models/Author')
const Idea = require('../models/Idea')
const mongoose = require('mongoose')

// Get All Route
router.get('/', async (req, res) => {
  try {
    // let author = await new Author({ name: 'a1', biography: 'b1' })
    // let idea = await new Idea({
    //   title: 'ideatest',
    //   problemDescription: 'pd1',
    //   currentSolutions: 'cs1',
    //   proposedSolution: 'ps1',
    //   author: author,
    // })

    // let idea2 = await new Idea({
    //   title: 'ideatest',
    //   problemDescription: 'pd1',
    //   currentSolutions: 'cs1',
    //   proposedSolution: 'ps1',
    //   author: author,
    // })

    // author.ideas.push(mongoose.Types.ObjectId(idea._id))
    // author.ideas.push(mongoose.Types.ObjectId(idea2._id))
    // author.save() && idea.save() && idea2.save()
    // res.json(author)

    const authors = await Author.find().populate('ideas');
    res.json({authors})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get Ideas
router.get('/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find().populate('author');
    res.json({ideas})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get One Route
router.get('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id).populate('ideas');
    if (author == null) {
      return res.status(404).json({ message: 'Cannot find User' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.json(author)
});

router.get('/generateData', async (req, res) => {
  let author = await new Author({ name: 'a1', biography: 'b1' })
    let idea = await new Idea({
      title: 'ideatest',
      problemDescription: 'pd1',
      currentSolutions: 'cs1',
      proposedSolution: 'ps1',
      author: author,
    })

    let idea2 = await new Idea({
      title: 'ideatest',
      problemDescription: 'pd1',
      currentSolutions: 'cs1',
      proposedSolution: 'ps1',
      author: author,
    })

    author.ideas.push(mongoose.Types.ObjectId(idea._id))
    author.ideas.push(mongoose.Types.ObjectId(idea2._id))
    author.save() && idea.save() && idea2.save()
    res.json(author)
})

module.exports = router
