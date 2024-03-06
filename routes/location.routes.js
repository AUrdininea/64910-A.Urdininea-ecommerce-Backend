const express = require('express')
const router = express.Router()
const jwtVerify = require('../middlewares/isAuth')
const locationController = require('../controllers/location.controller')

router.get("/locations", locationController.getLocations)

router.post("/locations", locationController.postLocation)

module.exports = router;