import { CustomError } from "./error_class/custom_error";

class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(public message: string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(){
        return [{ message: this.message }];
    }
};

export { BadRequestError };