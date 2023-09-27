const StateModel = require("../models/State")

class StateController {

    static store = async(req,res) => {
        try{
            const { stateName, country } = req.body

            const data = new StateModel({
                stateName: stateName,
                country: country,
            })

            const isDataSaved = data.save()

            if (isDataSaved) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'State Added Successfully.' })
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
            const data = await StateModel.find()
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

    static showStateByCountry = async(req,res) => {
        try{
            const country = req.params.id
            const data = await StateModel.find({ country: country })
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
            const data = await StateModel.findById(req.params.id)
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
            const { stateName, country } = req.body

            const data = await StateModel.findByIdAndUpdate(req.params.id,{
                stateName: stateName,
                country: country,
            })

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'State Updated Successfully.' })
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
            const data = await StateModel.findByIdAndDelete(req.params.id)

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'State Deleted Successfully.' })
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

module.exports = StateController