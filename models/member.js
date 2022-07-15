const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true        
    }, 
    email: {
        type: String,
        required: true
    }, 
    phone: {
        type: Number,
        required: true
    }, 
    address: {
        type: String,
        required: true
    }, 
    date: Date,
    // hours: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Hour'
    // }],
})



memberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v        
    }
})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member