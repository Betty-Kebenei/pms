import { Router } from 'express';
import LocationController from '../controllers/LocationController';

const router = Router();

router.get('/', LocationController.getAllLocations);
router.post('/', LocationController.addLocation);
router.get('/:id', LocationController.getALocation);
router.put('/:id', LocationController.updatedLocation);
router.delete('/:id', LocationController.deleteLocation);

export default router;
