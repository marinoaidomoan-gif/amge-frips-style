import { CONTACT } from './seo.js';

export function formatPrice(price) {
  return `${Number(price).toLocaleString('fr-FR')} FCFA`;
}

export function displayPhone() {
  const country = CONTACT.whatsappNumber.slice(0, 3);
  const rest = CONTACT.whatsappNumber.slice(3).match(/.{1,2}/g)?.join(' ') || '';
  return `+${country} ${rest}`;
}