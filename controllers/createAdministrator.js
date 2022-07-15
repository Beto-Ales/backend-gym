const bcrypt = require('bcrypt')
const createAdministratorRouter = require('express').Router()
const Administrator = require('../models/administrator')

createAdministratorRouter.post('/', async (request, response) => {
    // const { password, name, lastname, email, phone, address } = request.body
    const { username, password } = request.body

    // const existingUser = await User.findOne({ email })
    const existingUser = await Administrator.findOne({ username })

    if (existingUser) {
        return response.status(400).json({ error: 'Username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const administrator = new Administrator({
        passwordHash,
        username,
        date: new Date(),
    })

    const savedAdministrator = await administrator.save()

    response.json(savedAdministrator)
})

module.exports = createAdministratorRouter