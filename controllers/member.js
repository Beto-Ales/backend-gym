const membersRouter = require('express').Router()
const Member = require('../models/member')

// get all members
membersRouter.get('/', async (request, response) => {
    const members = await Member
        .find({})
    response.json(members)
})

membersRouter.get('/:id', async (request, response) => {
    const member = await Member
        .findById(request.params.id)
    if (member) {
        response.json(member)
    } else {
        response.status(404).end()
    }    
})

membersRouter.put('/:id', async (request, response) => {
    const member = await Member
        .findById(request.params.id)
    const { name, lastname, email, phone, address } = request.body

    if (!member) {
        return response.status(401).json({ error: 'Invalid data' })
    }

    const memberToUpdate = {
        name,
        lastname,
        email,
        phone,
        address
    }

    const updatedMember = await Member.findByIdAndUpdate(request.params.id, memberToUpdate, { new: true })
        response.status(200).json(updatedMember)
})

membersRouter.delete('/:id', async (request, response) => {
    
    await Member.findByIdAndRemove(request.params.id)
    response.status(204).end()
    
})

module.exports = membersRouter