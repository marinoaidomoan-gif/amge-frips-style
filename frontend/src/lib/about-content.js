import { DELIVERY_ZONES } from './seo.js';

export const VALUES = [
  {
    title: 'Sélection à la main',
    text: "Chaque pièce est examinée : coupe, matière, coutures, état. Ce qui ne passe pas le contrôle ne rejoint pas le catalogue.",
  },
  {
    title: 'Pièces uniques',
    text: "En friperie, il n'existe qu'un seul exemplaire. Ce que vous portez ne sera porté par personne d'autre en ville.",
  },
  {
    title: 'Conseil direct',
    text: 'Vous écrivez à la gérante, pas à un service client. Taille, tenue, retouches : la réponse vient de la personne qui a choisi la pièce.',
  },
  {
    title: 'Livraison régionale',
    text: `Depuis Porto-Novo vers ${DELIVERY_ZONES.join(', ')}, avec des frais annoncés avant toute commande.`,
  },
];

export const MILESTONES = [
  { year: '2020', text: "Ouverture d'AMGE FRIPS&STYLE à Porto-Novo, avec une valise de pièces choisies." },
  { year: '2022', text: 'Ajout des créations neuves pour les mariages, baptêmes et cérémonies.' },
  { year: '2024', text: 'Livraisons régulières vers le Burkina Faso, le Niger et le Togo.' },
  { year: '2026', text: 'Le catalogue passe en ligne : la sélection de la semaine, visible avant tout le monde.' },
];