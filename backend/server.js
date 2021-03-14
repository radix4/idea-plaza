require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('connection to db established'))
app.use(express.json())

const authorsRouter = require('./routes/authors')
app.use('/authors', authorsRouter)

app.listen(process.env.PORT, () =>
  console.log(`server has started at port ${process.env.PORT}`)
)
