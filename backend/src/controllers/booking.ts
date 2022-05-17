import {Request, Response} from 'express';
//Models
import { Flight, FlightModel } from '../models/flights';
import { User } from '../models/user';
//Errors
import { BadRequestError } from '../errors/bad_request_error';
//Services
import { jwtUser } from '../services/cookie_pareser';
import { BookingModel } from '../models/booking';

const bookingFlight = async ( req: Request, res: Response ) => {
    const { flightNumber, seatNumber } = req.body;
    const user = await jwtUser(req);

    const flight = await FlightModel.findOne({flightNumber});

    if(!flight){
        throw new BadRequestError('Geçerli uçuş bulunamadı lütfen daha sonra tekrar deneyin!');
    }

    if(flight.seats[seatNumber]){
        throw new BadRequestError('Seçilen koltuk dolu! Lütfen başka koltuk deneyin.');
    }

    const userObject: User = new User(user.email, user.name, user.surname);

    flight.seats[seatNumber] = true;
    await flight.save();

    const flightObject = new Flight(flight.flightNumber, flight.IATA);

    const booking = new BookingModel({flight: flightObject, user: userObject, seatsNumber: seatNumber});
    await booking.save();

    res.status(200).json({message: "Rezervasyon başarılı bir şekilde yapıldı."});
};

const seeBookedFlights = async ( req: Request, res: Response ) => {
    const {page} = req.params;
    const user = await jwtUser(req);

    const options = {
        page: parseInt(page),
        limit: 10
    }

    const bookingList = BookingModel.paginate({user: {email: user.email}}, options);

    res.status(200).json({bookingList});
};

const seeBookedFlight = async ( req: Request, res: Response ) => {
    const {flightNumber, seatsNumber} = req.body;
    const user = await jwtUser(req);

    const booking = await BookingModel.findOne({user: {email: user.email}, flight: {flightNumber}, seatsNumber})

    res.status(200).json({booking});
};

const cancelFlightBooking = async ( req: Request, res: Response ) => {
    const { flightNumber, seatsNumber } = req.body;

    const booking = await BookingModel.findOne({flight: {flightNumber}, seatsNumber});

    if(!booking){
        throw new BadRequestError('Bir nedenden dolayı rezervasyon silinemedi');
    }
    await booking.remove();
    
    res.status(200).json({message: 'İşleminiz başarı ile gerçekleşmiştir'});
};

const totalBooking = async ( req: Request, res: Response) => {
    const userInfo = await jwtUser(req);

    res.status(200).json({number: userInfo.totalBooking});
}

export {
    bookingFlight,
    seeBookedFlights,
    seeBookedFlight,
    cancelFlightBooking,
    totalBooking
}