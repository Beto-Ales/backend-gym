const mongoose = require('mongoose')

const administratorSchema = new mongoose.Schema({
    username: String,    
    passwordHash: String,
    date: Date,
})



administratorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const Administrator = mongoose.model('Administrator', administratorSchema)

module.exports = Administrator