const mongoose = require('mongoose')

/**
 * A comment can be either (1) a question or (2) a criticism.
 *
 * @content content of the reply (aka some text)
 * @replies a comment has a set of replies
 * @idea a comment belongs to an idea
 * */
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  // replies: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Reply',
  //   },
  // ],
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
  },
})

/* 
This function reformats mongo's id and versioning field.
Mongo's id field looks like a string, but it's an object (watch out!) and
  the toJSON method here takes care of it just in case.
*/
commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Comment', commentSchema)
