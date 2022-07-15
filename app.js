const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



// routers
const loginRouter = require('./controllers/login')
const createAdministratorRouter = require('./controllers/createAdministrator')
const createMemberRouter = require('./controllers/createMember')
const membersRouter = require('./controllers/member')



logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })

app.use(cors())
// app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
// here login & create user routers
// app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)
// here other routes

app.use('/api/login', loginRouter)  // declare this first to avoid token problems
app.use('/api/createAdministrator', createAdministratorRouter)  // declare this first to avoid token problems
app.use('/api/createMember', createMemberRouter)
app.use('/api/members', membersRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app