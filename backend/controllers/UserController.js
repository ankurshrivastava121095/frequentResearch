const UserModel = require("../models/User")

class UserController {

    static store = async(req,res) => {
        try{
            const { firstName, lastName, email, city, state, country, gender, dob, age } = req.body

            const data = new UserModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                city: city,
                state: state,
                country: country,
                gender: gender,
                dob: dob,
                age: age,
            })

            const isDataSaved = data.save()

            if (isDataSaved) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'User Added Successfully.' })
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
            const data = await UserModel.find()
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
            const data = await UserModel.findById(req.params.id)
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
            const { firstName, lastName, email, city, state, country, gender, dob, age } = req.body

            const data = await UserModel.findByIdAndUpdate(req.params.id,{
                firstName: firstName,
                lastName: lastName,
                email: email,
                city: city,
                state: state,
                country: country,
                gender: gender,
                dob: dob,
                age: age,
            })

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'User Updated Successfully.' })
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
            const data = await UserModel.findByIdAndDelete(req.params.id)

            if (data) {
                res
                .status(201)
                .json({ 'status': 201, 'message': 'User Deleted Successfully.' })
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

module.exports = UserController