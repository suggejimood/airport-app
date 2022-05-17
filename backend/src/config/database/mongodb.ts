import mongoose from "mongoose"
import { DbConnectionError } from "../../errors/db_connection_error";

export const connectDB = async (connection_string: string) => {
    const connection = await mongoose.connect(connection_string);

    if(!connection){
        throw new DbConnectionError();
    }

    console.log('Database connection is ok');
}