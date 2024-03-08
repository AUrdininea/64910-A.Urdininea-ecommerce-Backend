const express = require('express')
const router = express.Router()
const jwtVerify = require('../middlewares/isAuth')
const locationController = require('../controllers/category.controller')

router.get("/categorys", locationController.getCategories)

router.post("/categorys", locationController.postCategory)

module.exports = router;