import { Schema, model, PaginateModel } from "mongoose";
import paginate from 'mongoose-paginate-v2';

//Models
import { User, UserModel } from "./user";
import { Flight, FlightModel } from "./flights";
//Errors
import { BadRequestError } from "../errors/bad_request_error";

interface BookingDoc extends Document{
    user: User;
    flight: Flight
    seatsNumber: number
}

const bookingSchema = new Schema<BookingDoc>({
    user: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        }
    },
    flight: {
        flightNumber: {
            type: String,
            required: true
        },
        IATA: {
            type: String,
            required: true
        },
    },
    seatsNumber: {
        type: Number,
        required: true,
    }
});

//Burada yapılan işlemler TypeOrm Casced olarak düşünülebilir. Mongoose için middleware olarak geçiyor.
bookingSchema.pre('save', async function(next){
    if(this.isModified('user')){
        const user = await UserModel.findOne({email: this.user.email});

        if(!user){
            throw new BadRequestError('Kullanıcı bulunamadı');
        }
        const newTotalBooking: number = user.totalBooking + 1;

        await user.updateOne({totalBooking: newTotalBooking});
    }

    if(this.isModified('flight')){
        const flight = await FlightModel.findOne({flightNumber: this.flight.flightNumber});

        if(!flight){
            throw new BadRequestError('Uçuş bulunamadı');
        }

        const seats = flight.seats;
        seats[this.seatsNumber] = true;

        await flight.updateOne({seats: seats});
    }

    next();
});

bookingSchema.pre('remove', async function(next) {
    const user = await UserModel.findOne({email: this.user.email});

    if(!user){
        throw new BadRequestError('Kullanıcı bulunamadı');
    }
    const newTotalBooking: number = user.totalBooking - 1;

    await user.updateOne({totalBooking: newTotalBooking});


    const flight = await FlightModel.findOne({flightNumber: this.flight.flightNumber});

    if(!flight){
        throw new BadRequestError('Uçuş bulunamadı');
    }

    const seats = flight.seats;
    seats[this.seatsNumber] = false;

    await flight.updateOne({seats: seats});


    next();
});

bookingSchema.plugin(paginate);
const BookingModel = model<BookingDoc, PaginateModel<BookingDoc>>('Booking', bookingSchema);

export { BookingModel };