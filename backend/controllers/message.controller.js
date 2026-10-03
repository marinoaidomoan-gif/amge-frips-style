import Message from '../models/Message.model.js';

export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, body } = req.body || {};
    if (!name || !email || !body) {
      return res.status(400).json({ message: 'Nom, email et message sont requis.' });
    }
    const doc = await Message.create({ name, email, phone, body });
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message." });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages.' });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message introuvable.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la suppression du message.' });
  }
};