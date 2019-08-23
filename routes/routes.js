const { Router } = require('express');
const LocationController = require ('../controllers/LocationController');

const router = Router();

router.get('/', LocationController.getAllLocations);
router.post('/', LocationController.addLocation);
router.get('/:id', LocationController.getALocation);
router.put('/:id', LocationController.updatedLocation);
router.delete('/:id', LocationController.deleteLocation);

module.exports = router;
