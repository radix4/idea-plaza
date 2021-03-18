const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const ideaSchema = require('./idea')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  ideas: {
    type: [{type: Schema.Types.ObjectId, ref: 'Idea'}],
  },
})
const Author = mongoose.model('Author', authorSchema)
module.exports = Author
