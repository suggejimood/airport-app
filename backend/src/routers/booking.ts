import express from 'express';
//Controller
import { bookingFlight, cancelFlightBooking, seeBookedFlight, seeBookedFlights, totalBooking } from '../controllers/booking'

const router = express.Router();

router.post('/booking_flight', bookingFlight);
router.get('/see_booked_flights/:page', seeBookedFlights);
router.post('/see_booked_flight', seeBookedFlight);
router.delete('/cancel_flight_booking', cancelFlightBooking);
router.get('/total_booking_number', totalBooking);

export { router as bookingRouter };