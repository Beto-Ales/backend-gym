const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Administrator = require('../models/administrator')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const administrator = await Administrator
        .findOne({ username })        

    const passwordCorrect = administrator === null
        ? false
        : await bcrypt.compare(password, administrator.passwordHash)

    if (!(administrator && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: administrator.username,
        id: administrator._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    console.log('user id', administrator._id)

    response
        .status(200)
        .send({ token, username: administrator.username, id: administrator._id })
        // id was used to get all this user data. now it's not needed anymore
        // becouse we populate the hours
})

module.exports = loginRouter