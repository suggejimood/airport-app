import express from 'express';
//Controllers
import { signin, signout, signup } from '../controllers/auth';
//Middlewares
import { validateRequest } from '../middlewares/validate_request';
import { signinValidation, signupValidation } from '../middlewares/validation_middleware.ts';

const router = express.Router();

router.post('/signup', signupValidation(), validateRequest, signup);
router.post('/signin', signinValidation(), validateRequest, signin);
router.get('/signout', signout);

export { router as authRouter }