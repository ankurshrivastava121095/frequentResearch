const express = require('express')
const CountryController = require('../controllers/CountryController')
const StateController = require('../controllers/StateController')
const CityController = require('../controllers/CityController')
const UserController = require('../controllers/UserController')
const DashboardController = require('../controllers/DashboardController')
const router = express.Router()





//DashboardController
router.get('/dashboard',DashboardController.index)


//CountryController
router.post('/store-country',CountryController.store)
router.get('/show-country',CountryController.show)
router.get('/view-country/:id',CountryController.view)
router.post('/update-country/:id',CountryController.update)
router.get('/delete-country/:id',CountryController.delete)


//StateController
router.post('/store-state',StateController.store)
router.get('/show-state',StateController.show)
router.get('/view-state/:id',StateController.view)
router.get('/show-state-by-country/:id',StateController.showStateByCountry)
router.post('/update-state/:id',StateController.update)
router.get('/delete-state/:id',StateController.delete)


//CityController
router.post('/store-city',CityController.store)
router.get('/show-city',CityController.show)
router.get('/view-city/:id',CityController.view)
router.get('/show-city-by-state/:id',CityController.showCityByState)
router.post('/update-city/:id',CityController.update)
router.get('/delete-city/:id',CityController.delete)


//UserController
router.post('/store-user',UserController.store)
router.get('/show-user',UserController.show)
router.get('/view-user/:id',UserController.view)
router.post('/update-user/:id',UserController.update)
router.get('/delete-user/:id',UserController.delete)












module.exports = router