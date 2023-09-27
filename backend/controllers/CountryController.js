const CountryModel = require("../models/Country")

class CountryController {

    static store = async(req,res) => {
        try{
            const { countryName } = req.body

            const data = new CountryModel({
                countryName: countryName
            })

            const isDataSaved = data.save()

            if (isDataSaved) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Country Added Successfully.' })
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
            const data = await CountryModel.find()
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
            const data = await CountryModel.findById(req.params.id)
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
            const { countryName } = req.body

            const data = await CountryModel.findByIdAndUpdate(req.params.id,{
                countryName: countryName
            })

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Country Updated Successfully.' })
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
            const data = await CountryModel.findByIdAndDelete(req.params.id)

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'Country Deleted Successfully.' })
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

module.exports = CountryController