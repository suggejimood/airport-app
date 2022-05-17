import { Request, Response } from "express";
import axios from 'axios';
//Models
import { FlightModel } from "../models/flights";
//Errors
import { NotFoundError } from "../errors/not_found_error";

const searchFlight = async ( req:Request, res: Response ) => {
    const { IATA, startDate, endDate, page } = req.body;

    const link: string = `https://api.schiphol.nl/public-flights/flights?flightDirection=D&route=IST&includedelays=false&page=${page}&sort=%2BscheduleTime&fromScheduleDate=${startDate}&toScheduleDate=${endDate}`;

    const config = {
        headers: {
            Accept: 'application/json',
            app_id: 'c3da66f1',
            app_key: 'ad91cc9734d4d5a16482e52c0a782b7a',
            ResourceVersion: 'v4'
        }
    }

    console.log(IATA + " " +  startDate + " " + endDate + " " + page)

    const { data, status } = await axios.get(link, config);

    if(status != 200){
        throw new NotFoundError();
    }

    res.status(200).json({flights: data.flights});
};

const lookFlight = async ( req: Request, res: Response ) => {
    const { flightNumber, IATA, estimatedLandingTime } = req.body;

    let flight = await FlightModel.findOne({flightNumber: flightNumber});

    if(!flight){
        flight = new FlightModel({ flightNumber, IATA, estimatedLandingTime });
        await flight.save();
    }

    res.status(200).json({flight});
}

export {
    searchFlight,
    lookFlight,
};