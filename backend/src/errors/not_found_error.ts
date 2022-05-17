import { CustomError } from "./error_class/custom_error";

class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(){
        super('Dizin bulunamadı');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { NotFoundError };