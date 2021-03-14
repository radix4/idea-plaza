const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ideaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
  },
  problemDescription: {
    type: String,
    required: true,
  },
  currentSolutions: {
    type: String,
    required: true,
  },
  proposedSolution: {
    type: String,
    required: true,
  },
})

const Idea = mongoose.model('Idea', ideaSchema)
module.exports = Idea
