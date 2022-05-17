import { CustomError } from "./error_class/custom_error";

class AlreadyExistError extends CustomError {
    statusCode = 409;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, AlreadyExistError.prototype);
    }

    serializeErrors(){
        return [{ message: this.message }];
    }
};

export { AlreadyExistError };