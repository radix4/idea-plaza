const mongoose = require('mongoose')

/**
 * @firstName user's first name
 * @lastName user's last name
 * @email user's email address (unique)
 * @password user's password
 * @biography user's biography
 * @achievements user's achievements
 * @ideas user has a set of ideas
 */

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  // TODO: make email address to be unique
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  achievements: {
    type: String,
    required: true,
  },
  ideas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
    },
  ],
})

/* 
This function reformats mongo's id and versioning field.
Mongo's id field looks like a string, but it's an object (watch out!) and
the toJSON method here takes care of it just in case.
*/
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('User', userSchema)
