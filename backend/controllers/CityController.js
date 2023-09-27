const CityModel = require("../models/City")

class CityController {

    static store = async(req,res) => {
        try{
            const { cityName, state } = req.body

            const data = new CityModel({
                cityName: cityName,
                state: state,
            })

            const isDataSaved = data.save()

            if (isDataSaved) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'City Added Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static show = async(req,res) => {
        try{
            const data = await CityModel.find()
            res.status(201)
            .json({ 
                success: true,
                data
            }) 
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static showCityByState = async(req,res) => {
        try{
            const state = req.params.id
            const data = await CityModel.find({ state: state })
            res.status(201)
            .json({ 
                success: true,
                data
            }) 
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static view = async(req,res) => {
        try{
            const data = await CityModel.findById(req.params.id)
            res.status(201)
            .json({ 
                success: true,
                data
            }) 
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static update = async(req,res) => {
        try{
            const { cityName, state } = req.body

            const data = await CityModel.findByIdAndUpdate(req.params.id,{
                cityName: cityName,
                state: state,
            })

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'City Updated Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

    static delete = async(req,res) => {
        try{
            const data = await CityModel.findByIdAndDelete(req.params.id)

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'City Deleted Successfully.' })
            } else {
                res
                .status(401)
                .json({ 'status': 401, 'message': 'Error Try Again' }) 
            }
        }catch(err) {
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }

}

module.exports = CityController