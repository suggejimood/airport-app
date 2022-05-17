import { Schema, model } from "mongoose";

interface IFlight {
    flightNumber: number,
    IATA: string,
}

class Flight implements IFlight{
    public flightNumber: number;
    public IATA: string;

    constructor(flightNumber: number, IATA: string){
        this.flightNumber = flightNumber;
        this.IATA = IATA;
    }
}

interface FlightDoc extends Document{
    flightNumber: number;
    IATA: string;
    seats: Array<boolean>;
    estimatedLandingTime: Date;
}

const flightSchema = new Schema<FlightDoc>({
    flightNumber: {
        type: Number,
        unique: true,
        required: true
    },
    IATA: {
        type: String,
        required: true
    },
    seats: [
        {
            type: Boolean,
            default: false
        },
        {
            type: Boolean,
            default: false
        },
        {
            type: Boolean,
            default: false
        },
        {
            type: Boolean,
            default: false
        },
    ],
    estimatedLandingTime: {
        type: Date,
        required: true
    }
});

const FlightModel = model<FlightDoc>('Flight', flightSchema);

export {
    Flight,
    FlightModel
}