import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import productRoutes from './routes/product.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connecté');
    app.listen(PORT, () => console.log(`Serveur sur le port ${PORT}`));
  })
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Gestion des erreurs (upload invalide, etc.)
app.use((err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message || 'Une erreur est survenue.' });
  }
  next();
});