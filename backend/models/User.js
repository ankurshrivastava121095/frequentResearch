const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    dob: {
        type: String,
        require: true,
    },
    age: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var UserModel = mongoose.model('users', userSchema)

module.exports = UserModel