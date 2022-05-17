import express from 'express';
//Controllers
import { seeProfile, updateProfile } from '../controllers/user';
import { validateRequest } from '../middlewares/validate_request';
import { updatePasswordValidation, userUpdateValidation } from '../middlewares/validation_middleware.ts';

const router = express.Router();

router.get('/see_profile', seeProfile);
router.put('/update_profile', userUpdateValidation(), validateRequest, updateProfile);
router.put('/change_password', updatePasswordValidation(), validateRequest, updatePasswordValidation);

export { router as userRouter };