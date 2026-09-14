// TODO : hasher un mot de passe avec bcryptjs et créer le compte admin unique.
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Seed à implémenter');
  process.exit(0);
}

seed();