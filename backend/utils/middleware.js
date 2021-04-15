/** This file is responsible to provide error messages and handle errors. */

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

/* This method is triggered if no valid endpoints found. */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

/* This method handle errors. */
const errorHandler = (error, request, response, next) => {
  console.log('utils/middleware.js/errorHandler: ')
  console.log(error.message)

  /* when required fields not provided */
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
