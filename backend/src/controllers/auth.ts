import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//Models
import { UserModel } from "../models/user";
//Errors
import { AlreadyExistError } from "../errors/already_exist_error";
import { BadRequestError } from "../errors/bad_request_error";

const signup = async ( req: Request, res: Response ) => {
    const { name, surname, phone, email, password } = req.body;

    const existingEmail = await UserModel.findOne({email: email});

    if(existingEmail){
        throw new AlreadyExistError('Bu eposta kullanılamaz!');
    }

    const existingPhone = await UserModel.findOne({phone: phone});

    if(existingPhone){
        throw new AlreadyExistError('Bu telefon numarası kullanılamaz!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        name,
        surname,
        email,
        phone,
        password: hashedPassword
    }

    const newUser = new UserModel(user);
    newUser.save();

    res.status(200).json({message: "Hesabınız başarıyla oluşturuldu."});
};

const signin = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if(!user){
        throw new BadRequestError('Şifre veya eposta hatalı');
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    
    if(!passwordCheck){
        throw new BadRequestError('Şifre veya eposta hatalı');
    }

    const payload = {
        email: user.email
    }

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`)

    res.cookie('Set-Cookie', token, /*{httpOnly: true, secure: true, sameSite: 'none'}*/);
    res.status(200).json({message: "Başarılı bir şekilde giriş yapıldı."});
};

const signout = async ( req: Request, res: Response ) => {

    res.clearCookie('Set-Cookie').json({message: 'Çıkış yapıldı'}).redirect('/index.html');
};

export {
    signup,
    signin,
    signout,
}