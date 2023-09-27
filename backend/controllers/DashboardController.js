const CityModel = require("../models/City")
const CountryModel = require("../models/Country")
const StateModel = require("../models/State")
const UserModel = require("../models/User")

class DashboardController {
    static index = async(req,res) => {
        try{
            const countryCount = await CountryModel.countDocuments();
            const stateCount = await StateModel.countDocuments();
            const cityCount = await CityModel.countDocuments();
            const userCount = await UserModel.countDocuments();
        
            res.status(200).json({
              success: true,
              data: {
                user: userCount,
                city: cityCount,
                state: stateCount,
                country: countryCount,
              },
            });
        }catch(err){
            res
            .status(401)
            .json({ 'status': 401, 'message': err }) 
        }
    }
}
module.exports = DashboardController    