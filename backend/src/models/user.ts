import { Schema, model } from "mongoose";

interface IUser {
    email: string,
    name: string,
    surname: string
}

class User implements IUser{
    public email: string;
    public name: string;
    public surname: string;

    constructor(email: string, name: string, surname: string){
        this.email = email;
        this.name = name;
        this.surname = surname;
    }
}

interface UserDoc extends Document{
    name: string;
    surname: string;
    email: string;
    phone: string;
    password: string;
    totalBooking: number;
}

const userSchema = new Schema<UserDoc>({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    totalBooking: {
        type: Number,
        default: 0
    }
});

const UserModel = model<UserDoc>('User', userSchema);

export {
    User,
    UserModel
}