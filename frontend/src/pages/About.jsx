export default function About() {
  const values = [
    { title: 'Qualité', text: "Chaque pièce est sélectionnée avec soin, qu'elle soit neuve ou de seconde main." },
    { title: 'Accessibilité', text: 'Une élégance pensée pour être abordable, sans compromis sur le style.' },
    { title: 'Originalité', text: 'Des pièces uniques, loin des collections produites en masse.' },
    { title: 'Livraison rapide', text: 'Partout au Bénin, au Burkina Faso, au Niger et au Togo.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <div className="rounded-2xl overflow-hidden border-4 border-gold aspect-[3/4] bg-blush-soft dark:bg-charcoal-light">
          {/* TODO: remplacer par une vraie photo de la gérante :
              <img src="/gerante.jpg" alt="Fondatrice AMGE Frips&Style" className="w-full h-full object-cover" /> */}
        </div>

        <div>
          <p className="font-display italic text-3xl mb-4">Notre histoire</p>
          <p className="text-charcoal/75 dark:text-offwhite/75 leading-relaxed mb-4">
            Depuis 2020, AMGE Frips&Style habille les femmes de Porto-Novo et d'ailleurs avec une
            collection pensée comme une garde-robe de créateur : pièces de friperie sélectionnées
            avec exigence, et créations neuves choisies pour leur élégance intemporelle.
          </p>
          <p className="text-charcoal/75 dark:text-offwhite/75 leading-relaxed">
            Une passion pour la mode devenue un métier, portée par l'envie de rendre le beau
            accessible — sans jamais sacrifier la qualité.
          </p>
        </div>
      </div>

      <p className="font-display italic text-2xl text-center mb-10">Nos valeurs</p>
      <div className="grid sm:grid-cols-2 gap-6">
        {values.map((v) => (
          <div key={v.title} className="p-6 rounded-2xl border border-charcoal/10 dark:border-offwhite/10">
            <p className="font-display text-lg text-gold-deep dark:text-gold mb-2">{v.title}</p>
            <p className="text-sm text-charcoal/70 dark:text-offwhite/70">{v.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}