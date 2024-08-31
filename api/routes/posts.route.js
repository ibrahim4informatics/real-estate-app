import express from 'express';
import { addMedia, createPost, deleteMedia, deletePostById, getPosts, getPostsById, updatePost } from '../controllers/posts.controllers.js';
import {authMiddleware} from '../utils/auth.utils.js'
const router = express.Router();
router.get('/',getPosts);
router.get('/:id', getPostsById);
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware,deletePostById);
router.patch('/:id/media', authMiddleware, addMedia)
router.delete('/:post_id/media/:media_id', authMiddleware, deleteMedia)
export default router;

