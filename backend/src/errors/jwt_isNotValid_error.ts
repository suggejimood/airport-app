import { CustomError} from "./error_class/custom_error";

class JWTisnotValid extends CustomError {
    statusCode = 121;

    constructor(){
        super('Not Authorized');

        Object.setPrototypeOf(this, JWTisnotValid.prototype);
    }

    serializeErrors() {
        return [{ message: this.message}];
    }
}

export { JWTisnotValid };