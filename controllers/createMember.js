const createMemberRouter = require('express').Router()
const User = require('../models/member')

createMemberRouter.post('/', async (request, response) => {
    const { name, lastname, email, phone, address } = request.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return response.status(400).json({ error: 'E-mail must be unique' })
    }

    const user = new User({
        name,
        lastname,
        email,
        phone,
        address,
        date: new Date(),
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = createMemberRouter