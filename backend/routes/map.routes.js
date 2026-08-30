const express = require('express')
const router = express.Router()
const mapController = require('../controllers/map.controller')

router.post('/get-fare', mapController.getFare)

module.exports = router
