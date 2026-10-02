import Product from '../models/Product.model.js';
import Message from '../models/Message.model.js';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + diff);
  return d;
}

export const getStats = async (req, res) => {
  try {
    const products = await Product.find().select('category createdAt');
    const totalMessages = await Message.countDocuments();

    const categoryBreakdown = { Neuf: 0, Friperie: 0 };
    products.forEach((p) => {
      if (categoryBreakdown[p.category] !== undefined) categoryBreakdown[p.category] += 1;
    });

    const weeks = [];
    const now = new Date();
    for (let i = 7; i >= 0; i--) {
      const weekStart = startOfWeek(new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000));
      weeks.push({
        start: weekStart,
        label: weekStart.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        count: 0,
      });
    }

    products.forEach((p) => {
      const productWeekStart = startOfWeek(p.createdAt).getTime();
      const match = weeks.find((w) => w.start.getTime() === productWeekStart);
      if (match) match.count += 1;
    });

    res.json({
      totalProducts: products.length,
      categoryBreakdown,
      productsOverTime: weeks.map(({ label, count }) => ({ label, count })),
      totalMessages,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors du calcul des statistiques.' });
  }
};