import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { login, logout, checkAuth } from '../controllers/auth.controller.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { getStats } from '../controllers/stats.controller.js';
import { getAllMessages, deleteMessage } from '../controllers/message.controller.js';



const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, checkAuth);
router.get('/stats', authMiddleware, getStats);

router.post('/products', authMiddleware, upload.single('image'), createProduct);
router.put('/products/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);

router.get('/messages', authMiddleware, getAllMessages);
router.delete('/messages/:id', authMiddleware, deleteMessage);

export default router;