import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.model.js';

dotenv.config();

async function seed() {
  const { MONGO_URI, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('ADMIN_USERNAME et ADMIN_PASSWORD doivent être définis dans .env');
    process.exit(1);
  }

  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connecté');

  const existing = await User.findOne({ username: ADMIN_USERNAME });

  if (existing) {
    if (process.argv.includes('--reset')) {
      existing.password = await bcrypt.hash(ADMIN_PASSWORD, 10);
      await existing.save();
      console.log('Mot de passe réinitialisé avec succès.');
    } else {
      console.log(`Le compte "${ADMIN_USERNAME}" existe déjà. Aucune action effectuée.`);
      console.log('Pour réinitialiser le mot de passe : npm run seed -- --reset');
    }
  } else {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({ username: ADMIN_USERNAME, password: hashed });
    console.log(`Compte admin "${ADMIN_USERNAME}" créé avec succès.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erreur lors du seed :', err);
  process.exit(1);
});