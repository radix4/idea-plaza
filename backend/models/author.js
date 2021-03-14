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
    type: [Schema.Types.ObjectId],
  },
})
const Author = mongoose.model('Author', authorSchema)
module.exports = Author
