import express from 'express';
//Controllers
import { lookFlight, searchFlight } from '../controllers/flights';
//Middlewares
import { validateRequest } from '../middlewares/validate_request';
import { lookFlightValidation, searchFlightValidation } from '../middlewares/validation_middleware.ts';

const router = express.Router();

router.post('/search_flight', searchFlightValidation(), validateRequest, searchFlight);
router.post('/look_flight', lookFlightValidation(), validateRequest, lookFlight);

export { router as flightsRouter };