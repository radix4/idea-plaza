const mongoose = require('mongoose')

/**
 * @title title of the idea
 * @problemStatement has domain, state of the art, and solution
 * @author author of the idea
 * @upVote number of upvotes idea has
 * @downVote number of downvotes idea has
 * @questions idea has a set of questions
 * @criticisms idea has a set of criticisms
 * @user idea belong to an user
 *  */
const ideaSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	problemStatement: {
		domain: {
			type: String,
			required: true,
		},
		stateOfTheArt: {
			type: String,
			required: true,
		},
		solution: {
			type: String,
			required: true,
		},
	},
	author: {
		type: String,
		required: true,
	},
	upVote: {
		type: Number,
		required: true,
	},
	downVote: {
		type: Number,
		required: true,
	},
	questions: [
		{
			type: String,
			ref: 'Comment',
		},
	],
	criticisms: [
		{
			type: String,
			ref: 'Comment',
		},
	],
	date: Date,
	category: {
		type: String,
		required: true,
	},
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
ideaSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

module.exports = mongoose.model('Idea', ideaSchema)
