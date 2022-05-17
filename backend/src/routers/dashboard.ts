import express from 'express';
//Controller
import { allFlights, totalFlightInDay, totalFlightInTomorow, totalUser } from '../controllers/dashboard';

const router = express.Router();

router.get('/total_today', totalFlightInDay);
router.get('/total_tomorow', totalFlightInTomorow);
router.get('/total_user', totalUser);
router.get('/all_flights/:page', allFlights);

export { router as dashboardRouter };