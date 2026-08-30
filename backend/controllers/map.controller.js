const { body, validationResult } = require('express-validator')
const { getRoute } = require('../services/map.service')
const { calculateAllFares } = require('../utils/fare')

module.exports.getFare = [
  body('pickup.lat').isFloat({ min: -90, max: 90 }),
  body('pickup.lng').isFloat({ min: -180, max: 180 }),
  body('destination.lat').isFloat({ min: -90, max: 90 }),
  body('destination.lng').isFloat({ min: -180, max: 180 }),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { pickup, destination } = req.body
      const route = await getRoute(pickup, destination)
      const fares = calculateAllFares(route.distance)

      res.status(200).json({
        distance: route.distance,
        duration: route.duration,
        coordinates: route.coordinates,
        fares,
      })
    } catch (error) {
      res.status(400).json({ message: error.message || 'Could not calculate fare' })
    }
  },
]
