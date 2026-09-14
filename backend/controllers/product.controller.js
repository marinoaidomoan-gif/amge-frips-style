import Product from '../models/Product.model.js';
import fs from 'fs';
import path from 'path';

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit introuvable.' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: 'Identifiant invalide.' });
  }
};

export const createProduct = async (req, res) => {
  console.log('Content-Type reçu :', req.headers['content-type']);
  console.log('req.body reçu :', req.body);
  console.log('req.file reçu :', req.file);
  try {
    const { name, price, category, size, color, description } = req.body || {};

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Nom, prix et catégorie sont requis.' });
    }

    const product = await Product.create({
      name,
      price,
      category,
      size,
      color,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err); // ← temporaire, pour voir la vraie erreur
    res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Produit introuvable.' });

    const updates = { ...req.body };

    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
      if (existing.imageUrl) {
        fs.unlink(path.join('.', existing.imageUrl), () => {}); // silencieux si déjà absent
      }
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la modification du produit.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit introuvable.' });

    if (product.imageUrl) {
      fs.unlink(path.join('.', product.imageUrl), () => {});
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit.' });
  }
};