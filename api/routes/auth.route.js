import express from 'express';
import { body, validationResult, } from 'express-validator';
import { changePassword, isValidResetPasswordUrl, loginUser, registerUser, resetPassword, logoutUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser)


router.post('/reset', resetPassword);
router.get('/reset', isValidResetPasswordUrl);
router.post('/change', changePassword);



export default router;