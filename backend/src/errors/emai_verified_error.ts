import { CustomError} from "./error_class/custom_error";

class EmailVerifiedError extends CustomError {
    statusCode = 401;

    constructor(){
        super('E posta adresi doğrulanmadı. Lütfen e posta adresinizi doğrulayın');

        Object.setPrototypeOf(this, EmailVerifiedError.prototype);
    }

    serializeErrors() {
        return [{ message:  this.message}];
    }
}

export { EmailVerifiedError };