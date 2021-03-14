const express = require('express')
const router = express.Router()
const Author = require('../models/Author')

// Get All Route
router.get('/', async (req, res) => {
  try {
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
