import { body } from 'express-validator';

//Auth
const signupValidation = () => {
    return[
        body('name')
            .trim()
            .isLength({min: 2}).withMessage('İsim en az 2 karakter olmalı')
            .isLength({max: 30}).withMessage('İsim en fazla 30 karakter olmalı'),
        body('surname')
            .trim()
            .isLength({min: 2}).withMessage('Soyad en az 2 karakter olmalı')
            .isLength({max: 30}).withMessage('Soyad en fazla 30 karakter olmalı'),
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir eposta girin'),
        body('phone')
            .trim()
            .isLength({min: 10, max: 10}).withMessage('Telefon numarası 10 haneli olmalıdır.'),
        body('password')
            .trim()
            .isLength({min: 6}).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({max: 25}).withMessage('Şifre en fazla 25 karakter olmalı'),
    ];
};

const signinValidation = () =>{
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir eposta girin'),
        body('password')
            .trim()
            .isLength({min: 6}).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({max: 25}).withMessage('Şifre en fazla 25 karakter olmalı'),
    ];
};

//User
const userUpdateValidation = () => {
    return[
        body('name')
            .trim()
            .isLength({min: 2, max: 45}).withMessage('İsim en az 2, en fazla 45 karakterli olabilir.'),
        body('surname')
            .trim()
            .isLength({min: 2, max: 45}).withMessage('Soyisim en az 2, en fazla 45 karakterli olabilir.'),
    ];
}

const updatePasswordValidation = () => {
    return[
        body('newPassword')
            .trim()
            .isLength({min: 6, max: 45}).withMessage('Şifre en az 6 karakterli en fazla 45 karakterli olmalıdır.'),
        body('reNewPassword')
            .trim()
            .isLength({min: 6, max: 45}).withMessage('Şifre en az 6 karakterli en fazla 45 karakterli olmalıdır.'),
    ];
}

//Flights
const searchFlightValidation = () => {
    return[
        body('IATA')
            .trim()
            .toUpperCase()
            .isLength({min: 3, max: 3}).withMessage('IATA kodu 3 karakterli olmak zorunda') 
            //Havacılık kurallarında IATA 2 karakterli olabilir ama bu API 2 karakterli olanların Sonuna X koyuyor.
    ];
}

const lookFlightValidation = () => {
    return[
        body('IATA')
            .trim()
            .toUpperCase()
            .isLength({min: 3, max: 3}).withMessage('IATA kodu 3 karakterli olmak zorunda'),
        body('flightNumber')
            .trim()
            .isNumeric().withMessage('Geçerli bir uçuş numarası girin!')  
    ];
}

//Booking
const bookingFlightValidation = () => {
    return[
        body('flightNumber')
            .trim()
            .isNumeric().withMessage('geçerli bir uçuş numarası giriniz'),
        body('seatNumber')
            .trim()
            .isNumeric().withMessage('Geçerli bir koltuk numarsı girin')
            .custom((value)=>{ 
                if(value > 3){
                    throw new Error('Koltuk numarası 3 den büyük olamaz');
                }
            }),
    ];
}

export { 
    signupValidation,
    signinValidation,
    userUpdateValidation,
    updatePasswordValidation,
    searchFlightValidation,
    lookFlightValidation,
    bookingFlightValidation,
};