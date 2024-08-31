import express from 'express';
import { changePassword, isValidResetPasswordUrl, loginUser, registerUser, resetPassword, logoutUser } from '../controllers/auth.controllers.js'

const router = express.Router();
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser)
router.post('/reset', resetPassword);
router.get('/reset', isValidResetPasswordUrl);
router.post('/change', changePassword);




export default router;