const mongoose = require('mongoose')


const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var CountryModel = mongoose.model('countries', countrySchema)

module.exports = CountryModel