const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Connect to database
mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

// *** Middleware that must be first ***
app.use(cors())
app.use(express.static('build')) // connect to front end
app.use(express.json())
// Log every request
app.use(middleware.requestLogger)

// Routing middleware
app.use('/api/notes', notesRouter)

// Unknown endpoint Middleware
// 404
app.use(middleware.unknownEndpoint)
// Errors
app.use(middleware.errorHandler)

module.exports = app
// Server is started by index.js
