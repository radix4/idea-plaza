require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors') /* allow middleware to catch errors */
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json()) /* parse request.body to json, important middleware */

const url = process.env.MONGODB_URI

/* connect to database */
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const usersRouter = require('./controllers/users')
const ideasRouter = require('./controllers/ideas')
const commentsRouter = require('./controllers/comments')
const replysRouter = require('./controllers/replies')
const seniorPostsRouter = require('./controllers/seniorPosts')

const middleware = require('./utils/middleware')

app.use('/api/users', usersRouter)
app.use('/api/ideas', ideasRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/replies', replysRouter)
app.use('/api/seniorPosts', seniorPostsRouter)

/* error handlers */
app.use(middleware.unknownEndpoint)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

/* opens port on the browser */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
