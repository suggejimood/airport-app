import { CustomError} from "./error_class/custom_error";

class UnauthorizedError extends CustomError {
    statusCode = 401;

    constructor(){
        super('Giriş yapılmadı');

        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

export { UnauthorizedError };