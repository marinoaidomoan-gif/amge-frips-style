import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Nom d'utilisateur et mot de passe requis." });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Identifiants incorrects.' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: 'Identifiants incorrects.' });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: 'Connexion réussie.', username: user.username, token });
};

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Déconnecté.' });
};

export const checkAuth = (req, res) => {
  res.json({ username: req.user.username });
};