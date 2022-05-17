import { Request } from 'express';
import jwt from 'jsonwebtoken';
//Models
import { UserModel } from '../models/user';
//Errors
import { JWTisnotValid } from '../errors/jwt_isNotValid_error';
import { UnauthorizedError } from '../errors/unauthorized_error';

async function jwtUser(req: Request){
    const token = req.cookies['Set-Cookie'];

    if(!token){
        throw new UnauthorizedError();
    }

    const decode = await <any>jwt.verify(token, `${process.env.JWT_SECRET}`);

    if(!decode){
        throw new JWTisnotValid();
    }

    const { email } = decode;
    const user = await UserModel.findOne({email});

    if(!user){
        throw new UnauthorizedError();
    }

    const _user = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        totalBooking: user.totalBooking
    }

    return _user;
}

export {
    jwtUser
}