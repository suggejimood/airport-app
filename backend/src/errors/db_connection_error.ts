import { CustomError } from "./error_class/custom_error";

class DbConnectionError extends CustomError {
    statusCode = 500;

    constructor(){
        super('Database bağlantısı yapılmadı');

        Object.setPrototypeOf(this, DbConnectionError.prototype);
    }

    serializeErrors(){
        return [
            {message: this.message}
        ]
    }
}

export { DbConnectionError };