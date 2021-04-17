const mongoose = require('mongoose')

/**
 * @content content of the reply (aka some text)
 * @comment a reply belongs to a comment
 */

const replySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
})

/* 
This function reformats mongo's id and versioning field.
Mongo's id field looks like a string, but it's an object (watch out!) and
    the toJSON method here takes care of it just in case.
*/
replySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Reply', replySchema)
