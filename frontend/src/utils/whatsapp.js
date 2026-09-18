import { CONTACT } from '../lib/seo.js';

export function getWhatsAppLink(product) {
  const message = `Bonjour AMGE FRIPS&STYLE ! Je souhaite acheter le produit : ${product.name} au prix de ${product.price} FCFA. Taille : ${product.size || 'N/A'}. Couleur : ${product.color || 'N/A'}. Quels sont les frais de livraison ?`;
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}