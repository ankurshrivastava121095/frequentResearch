const mongoose = require('mongoose')


const citySchema = new mongoose.Schema({
    cityName: {
        type: String,
        require: true,
    },
    state: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var CityModel = mongoose.model('cities', citySchema)

module.exports = CityModel