const mongoose = require('mongoose')

const seniorPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  technologies: {
    type: String,
    required: true,
  },
  strengths: {
    type: String,
    required: true,
  },
  weaknesses: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

/* 
This function reformats mongo's id and versioning field.
Mongo's id field looks like a string, but it's an object (watch out!) and
    the toJSON method here takes care of it just in case.
*/
seniorPostSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('SeniorPost', seniorPostSchema)
