require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
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

app.use('/api/users', usersRouter)
app.use('/api/ideas', ideasRouter)

/* opens port on the browser */
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
