import express from 'express';
import { addSavedPost, changeAvatar, changeEmail, changePassword, deleteAvatar, deleteSavedPost, deleteUser, getSavedPost, getUser, updateUser } from '../controllers/users.controllers.js';

const router = express.Router();


router.get('/', getUser);
router.patch('/', updateUser);
router.delete('/', deleteUser);
router.patch('/change-email', changeEmail);
router.patch('/change-password', changePassword);
router.patch('/avatar', changeAvatar);
router.delete('/avatar', deleteAvatar);



router.get('/save', getSavedPost);
router.post('/save/:post_id', addSavedPost);
router.delete('/save/:post_id', deleteSavedPost);

export default router