const mongoose = require('mongoose')


const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var StateModel = mongoose.model('states', stateSchema)

module.exports = StateModel