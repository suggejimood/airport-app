import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//Models
import { UserModel } from '../models/user';
//Error
import { UnauthorizedError } from '../errors/unauthorized_error';
import { JWTisnotValid } from '../errors/jwt_isNotValid_error';

const verify = async (req: Request, res: Response, next: NextFunction) => {
    const _token = req.cookies['Set-Cookie'];
    let decoded;

    if(!_token){
        throw new UnauthorizedError();
    }

    try {
        decoded = await <any>jwt.verify(_token, `${process.env.JWT_SECRET}`);
        const { email } = decoded;

        const user = await UserModel.findOne({email});

        if(!user){
            throw new JWTisnotValid();
        }

        next();
    } catch (error) {
        console.log(error);  
    }
};

export { verify };