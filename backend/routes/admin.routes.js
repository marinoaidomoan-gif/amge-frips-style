import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

router.post('/login', (req, res) => res.status(501).json({ message: 'À implémenter' }));

router.post('/products', authMiddleware, upload.single('image'), createProduct);
router.put('/products/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/products/:id', authMiddleware, deleteProduct);

export default router;