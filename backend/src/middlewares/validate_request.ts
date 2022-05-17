import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { RequsetValidationError } from "../errors/request_validation_error";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequsetValidationError(errors.array());
    }

    next();
}

export { validateRequest };