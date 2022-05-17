import { Request, Response } from "express";
import bcrypt from 'bcrypt';
//Models
import { UserModel } from "../models/user";
//Errors
import { UnauthorizedError } from "../errors/unauthorized_error";
//Services
import { jwtUser } from "../services/cookie_pareser";
import { BadRequestError } from "../errors/bad_request_error";

const updateProfile = async ( req: Request, res: Response ) => {
    const { name, surname } = req.body;
    const cookieUser = await jwtUser(req);

    const user = await UserModel.findOne({ email: cookieUser.email });

    if(!user){
        throw new UnauthorizedError();
    }

    await user.updateOne({name: name, surname: surname});

    res.status(200).json({message: "Profil başarı ile güncellendi."});
};

const seeProfile = async ( req: Request, res: Response ) => {
    const cookieUser = await jwtUser(req);

    res.status(200).json(cookieUser);
};

const updatePassword = async ( req: Request, res: Response ) => {
    const { newPassword } = req.body;
    const userInfo = await jwtUser(req);

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findOneAndUpdate({email: userInfo.email}, {password: hashedPassword});

    if(!user){
        throw new BadRequestError('Bir nedenden dolayı şifre değiştirilemedi!');
    }

    res.status(200).json({message: "Şifre başarılı bir şekilde değiştirildi"});
}

export {
    updateProfile,
    seeProfile,
    updatePassword
}