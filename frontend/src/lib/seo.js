export const SITE = {
  name: 'AMGE FRIPS&STYLE',
  tagline: 'Friperie de luxe & Créations neuves',
  description:
    "Découvrez notre collection de robes pour femmes. Friperie de qualité et habits neufs. Livraison partout au Bénin, Togo, Niger et Burkina. Achat facile via WhatsApp.",
  keywords:
    'robes tendance Bénin, friperie en ligne Porto-Novo, vêtement femme Bénin, livraison vêtement Burkina, AMGE FRIPS&STYLE',
  url: 'https://amge-frips-style.com', // TODO: remplacer par le vrai domaine une fois déployé
};

export const CONTACT = {
  whatsappNumber: '229XXXXXXXX', // TODO: remplacer par le vrai numéro de la gérante
  address: 'Porto-Novo, Bénin',
  facebookUrl: '#', // TODO
  snapchatUrl: '#', // TODO
};

export const DELIVERY_ZONES = ['Bénin', 'Burkina Faso', 'Niger', 'Togo'];

export const about = [
  {
    title: "Sélection à la main",
    text: "Chaque pièce est examinée : coupe, matière, coutures, état. Ce qui ne passe pas le contrôle ne rejoint pas le catalogue.",
  },
  {
    title: "Pièces uniques",
    text: "En friperie, il n'existe qu'un seul exemplaire. Ce que vous portez ne sera porté par personne d'autre en ville.",
  },
  {
    title: "Conseil direct",
    text: "Vous écrivez à la gérante, pas à un service client. Taille, tenue, retouches : la réponse vient de la personne qui a choisi la pièce.",
  },
  {
    title: "Livraison régionale",
    text: `Depuis Porto-Novo vers ${siteConfig.deliveryCountries.join(", ")}, avec des frais annoncés avant toute commande.`,
  },
];