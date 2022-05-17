import { Request, Response } from 'express';
import axios from 'axios';
//Models
import { UserModel } from '../models/user';
import { BadRequestError } from '../errors/bad_request_error';

const totalFlightInDay = async ( req: Request, res: Response ) => {
    let nowDate = new Date();
    const date = nowDate.toISOString().split('T')[0];

    let page: number = 0;
    let numberOfFlight: number = 0;

    const config = {
        headers: {
            Accept: 'application/json',
            app_id: 'c3da66f1',
            app_key: 'ad91cc9734d4d5a16482e52c0a782b7a',
            ResourceVersion: 'v4'
        }
    }

    while(1){
        const link: string = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${date}&flightDirection=D&includedelays=false&page=${page}&sort=%2BscheduleTime`;
        const { data, status } = await axios.get(link, config);

        numberOfFlight += data.flights.length;
        page += 1;

        if(data.flights.length == 0 || status == 503 || page === 3){
            //page 3de durmasını bilerek yaptım hergün takribi 380 sayfalık uçuş var API tek seferde toplam uçuş sayısını vermiyor. Bu özelikten vaz geçmemek istemediğim için 3de durdurdum.
            break;
        }
    }
    

    res.status(200).json({ number: numberOfFlight });
};

const totalFlightInTomorow = async ( req: Request, res: Response ) => {
    let nowDate = new Date();
    nowDate.setDate(nowDate.getDate()+1);
    const date = nowDate.toISOString().split('T')[0];
    
    let page: number = 0;
    let numberOfFlight: number = 0;

    const config = {
        headers: {
            Accept: 'application/json',
            app_id: 'c3da66f1',
            app_key: 'ad91cc9734d4d5a16482e52c0a782b7a',
            ResourceVersion: 'v4'
        }
    }


    while(1){
        const link: string = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${date}&flightDirection=D&includedelays=false&page=${page}&sort=%2BscheduleTime`;
        const { data, status } = await axios.get(link, config);

        numberOfFlight += data.flights.length;
        page += 1;

        if(data.flights.length == 0 || status != 200 || page === 3){
            //page 3de durmasını bilerek yaptım hergün takribi 380 sayfalık uçuş var API tek seferde toplam uçuş sayısını vermiyor. Bu özelikten vaz geçmemek istemediğim için 3de durdurdum.
            break;
        }
    }

    res.status(200).json({ number: numberOfFlight });
};

const totalUser = async ( req: Request, res: Response ) => {
    const users = await UserModel.find({});
    
    res.status(200).json({ number: users.length});
};
 
const allFlights = async ( req: Request, res: Response ) => {
     const page = req.params.page;

     let nowDate = new Date();
    const date = nowDate.toISOString().split('T')[0];

    const config = {
        headers: {
            Accept: 'application/json',
            app_id: 'c3da66f1',
            app_key: 'ad91cc9734d4d5a16482e52c0a782b7a',
            ResourceVersion: 'v4'
        }
    }

    const link: string = `https://api.schiphol.nl/public-flights/flights?scheduleDate=${date}&flightDirection=D&includedelays=false&page=${page}&sort=%2BscheduleTime`;
    const { data, status } = await axios.get(link, config);

    if(status != 200){
        throw new BadRequestError('Opsss');
    }

    res.status(200).json({ list: data.flights });
}

export {
    totalFlightInDay,
    totalFlightInTomorow,
    totalUser,
    allFlights
};