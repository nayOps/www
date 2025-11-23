import { provinces } from "./provinces";

export interface Consultation {
  provinceId: string;
  provinceName: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming";
  description: string;
  highlights: string[];
  participants: number;
  images: string[];
  location: string;
  ministerPresence: boolean;
  video?: string;
  content?: string; // Contenu article détaillé
}

// Données de consultation par province (mock data)
export const consultations: Record<string, Consultation> = {
  kinshasa: {
    provinceId: "kinshasa",
    provinceName: "Kinshasa",
    date: "2025-01-15",
    status: "completed",
    description:
      "Consultation nationale sur les enjeux de la jeunesse à Kinshasa. Échanges fructueux avec les jeunes leaders, associations et représentants des universités sur les défis de l'emploi, de l'entrepreneuriat et de la participation citoyenne.",
    highlights: [
      "Rencontre avec 500 jeunes leaders de la capitale",
      "Signature de partenariats avec 3 universités",
      "Lancement du programme d'incubation pour startups",
    ],
    participants: 500,
    images: ["/caru1.jpg", "/caru2.jpg", "/caru3.jpg"],
    location: "Palais du Peuple, Kinshasa",
    ministerPresence: true,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
      <p class="lead">La consultation nationale de la jeunesse à Kinshasa a marqué un moment historique dans l'engagement du gouvernement en faveur de la jeunesse congolaise. Cette rencontre, organisée au Palais du Peuple, a rassemblé plus de 500 jeunes leaders, représentants d'associations et étudiants des principales universités de la capitale.</p>
      
      <h2>Un dialogue constructif</h2>
      <p>Les échanges ont porté sur plusieurs enjeux majeurs : l'emploi des jeunes, l'entrepreneuriat, la formation professionnelle et la participation citoyenne. Les participants ont pu exprimer leurs préoccupations et proposer des solutions concrètes pour améliorer leur situation.</p>
      
      <p>La ministre a écouté attentivement les témoignages et a annoncé plusieurs mesures importantes, notamment le lancement d'un programme d'incubation pour les startups et la signature de partenariats stratégiques avec trois universités de la capitale.</p>
      
      <h2>Engagements pris</h2>
      <p>Plusieurs engagements ont été pris lors de cette consultation :</p>
      <ul>
        <li>Création de 1000 emplois directs dans le secteur public</li>
        <li>Mise en place d'un fonds de garantie pour les jeunes entrepreneurs</li>
        <li>Renforcement des programmes de formation professionnelle</li>
        <li>Amélioration de l'accès aux services publics pour les jeunes</li>
      </ul>
      
      <p>Cette consultation s'inscrit dans le cadre d'un processus national de dialogue avec la jeunesse, qui se déroulera dans les 26 provinces de la République Démocratique du Congo.</p>
    `,
  },
  "kongo-central": {
    provinceId: "kongo-central",
    provinceName: "Kongo-Central",
    date: "2025-02-10",
    status: "completed",
    description:
      "Consultation dans la province du Kongo-Central axée sur l'insertion professionnelle des jeunes et le développement des compétences techniques.",
    highlights: [
      "Visite des centres de formation professionnelle",
      "Rencontre avec les jeunes entrepreneurs",
      "Signature de conventions avec les entreprises locales",
    ],
    participants: 300,
    images: ["/caru2.jpg", "/caru3.jpg", "/caru1.jpg"],
    location: "Matadi, Kongo-Central",
    ministerPresence: true,
    content: `
      <p class="lead">La consultation dans la province du Kongo-Central s'est concentrée sur l'insertion professionnelle des jeunes et le développement des compétences techniques, deux enjeux majeurs pour cette province stratégique.</p>
      
      <h2>Visite des centres de formation</h2>
      <p>La ministre a visité plusieurs centres de formation professionnelle à Matadi, rencontrant les formateurs et les apprenants. Ces échanges ont permis d'identifier les besoins en équipements et en renforcement des capacités.</p>
      
      <h2>Partenariats avec le secteur privé</h2>
      <p>Plusieurs conventions ont été signées avec des entreprises locales pour faciliter l'insertion professionnelle des jeunes diplômés. Ces partenariats permettront de créer des opportunités d'emploi et de stage.</p>
    `,
  },
  "kwilu": {
    provinceId: "kwilu",
    provinceName: "Kwilu",
    date: "2025-02-20",
    status: "completed",
    description: "Consultation dans la province du Kwilu sur l'entrepreneuriat et l'innovation.",
    highlights: [
      "Rencontre avec 400 jeunes entrepreneurs",
      "Signature de partenariats",
      "Lancement d'un incubateur provincial",
    ],
    participants: 400,
    images: ["/caru3.jpg", "/caru1.jpg"],
    location: "Bandundu, Kwilu",
    ministerPresence: true,
    content: `
      <p class="lead">La province du Kwilu a accueilli une consultation axée sur l'entrepreneuriat et l'innovation, mettant en avant le potentiel des jeunes entrepreneurs locaux.</p>
      
      <h2>Un écosystème entrepreneurial dynamique</h2>
      <p>Plus de 400 jeunes entrepreneurs ont participé à cette consultation, présentant leurs projets et leurs défis. La ministre a annoncé la création d'un incubateur provincial pour soutenir les startups locales.</p>
      
      <h2>Partenariats stratégiques</h2>
      <p>Plusieurs partenariats ont été signés avec des institutions financières et des organisations internationales pour faciliter l'accès au financement pour les jeunes entrepreneurs.</p>
    `,
  },
  "kasai": {
    provinceId: "kasai",
    provinceName: "Kasaï",
    date: "2025-03-05",
    status: "completed",
    description: "Consultation dans le Kasaï sur la paix et la cohésion sociale.",
    highlights: [
      "Dialogue avec 350 jeunes",
      "Programme de réconciliation",
      "Lancement d'initiatives pour la paix",
    ],
    participants: 350,
    images: ["/caru1.jpg", "/caru2.jpg"],
    location: "Luebo, Kasaï",
    ministerPresence: true,
    content: `
      <p class="lead">La consultation dans le Kasaï a mis l'accent sur la paix et la cohésion sociale, des enjeux cruciaux pour cette province.</p>
      
      <h2>Un dialogue constructif</h2>
      <p>Plus de 350 jeunes ont participé à un dialogue ouvert sur les défis de la paix et de la cohésion sociale. Les échanges ont permis d'identifier des pistes d'action concrètes.</p>
      
      <h2>Programme de réconciliation</h2>
      <p>Un programme de réconciliation a été lancé, visant à renforcer les liens entre les communautés et à promouvoir la paix durable dans la province.</p>
    `,
  },
  "kasai-central": {
    provinceId: "kasai-central",
    provinceName: "Kasaï-Central",
    date: "2025-03-15",
    status: "completed",
    description: "Consultation dans le Kasaï-Central sur l'éducation et la formation.",
    highlights: [
      "Visite des écoles",
      "Programme de bourses",
      "Renforcement des infrastructures éducatives",
    ],
    participants: 450,
    images: ["/caru2.jpg", "/caru3.jpg", "/caru1.jpg"],
    location: "Kananga, Kasaï-Central",
    ministerPresence: true,
    content: `
      <p class="lead">La consultation dans le Kasaï-Central a été consacrée à l'éducation et la formation, deux piliers essentiels pour l'avenir de la jeunesse.</p>
      
      <h2>Visite des établissements scolaires</h2>
      <p>La ministre a visité plusieurs établissements scolaires à Kananga, rencontrant les enseignants, les élèves et les parents. Ces visites ont permis d'identifier les besoins prioritaires en matière d'infrastructures et d'équipements.</p>
      
      <h2>Programme de bourses</h2>
      <p>Un programme de bourses a été annoncé pour soutenir les étudiants méritants de la province. Ce programme permettra à de nombreux jeunes de poursuivre leurs études supérieures.</p>
    `,
  },
  "maniema": {
    provinceId: "maniema",
    provinceName: "Maniema",
    date: "2025-03-25",
    status: "completed",
    description: "Consultation dans le Maniema sur le développement économique.",
    highlights: [
      "Rencontre avec les coopératives",
      "Appui aux projets",
      "Formation en gestion d'entreprise",
    ],
    participants: 280,
    images: ["/caru3.jpg", "/caru1.jpg"],
    location: "Kindu, Maniema",
    ministerPresence: true,
    content: `
      <p class="lead">La consultation dans le Maniema s'est concentrée sur le développement économique et l'appui aux initiatives des jeunes.</p>
      
      <h2>Rencontre avec les coopératives</h2>
      <p>La ministre a rencontré plusieurs coopératives de jeunes à Kindu, écoutant leurs préoccupations et leurs projets. Ces échanges ont permis d'identifier les besoins en formation et en financement.</p>
      
      <h2>Appui aux projets</h2>
      <p>Plusieurs projets de jeunes entrepreneurs ont été identifiés pour bénéficier d'un appui technique et financier. Un programme de formation en gestion d'entreprise a également été annoncé.</p>
    `,
  },
  "haut-katanga": {
    provinceId: "haut-katanga",
    provinceName: "Haut-Katanga",
    date: "2025-04-10",
    status: "completed",
    description: "Consultation dans le Haut-Katanga sur l'industrie et l'emploi.",
    highlights: [
      "Partenariats avec les entreprises",
      "Programme d'insertion",
      "Création de 500 emplois",
    ],
    participants: 600,
    images: ["/caru1.jpg", "/caru2.jpg", "/caru3.jpg"],
    location: "Lubumbashi, Haut-Katanga",
    ministerPresence: true,
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    content: `
      <p class="lead">La consultation dans le Haut-Katanga, province industrielle par excellence, a rassemblé plus de 600 jeunes autour des enjeux de l'emploi et de l'insertion professionnelle.</p>
      
      <h2>Partenariats stratégiques</h2>
      <p>Plusieurs partenariats ont été signés avec les grandes entreprises de la province pour faciliter l'insertion professionnelle des jeunes. Ces accords permettront de créer des opportunités d'emploi et de stage.</p>
      
      <h2>Programme d'insertion</h2>
      <p>Un programme d'insertion professionnelle a été lancé, visant à créer 500 emplois directs dans les secteurs minier, industriel et des services. Ce programme comprend également des formations adaptées aux besoins du marché.</p>
      
      <h2>Engagement des entreprises</h2>
      <p>Les entreprises locales se sont engagées à réserver un quota d'emplois pour les jeunes de la province, contribuant ainsi au développement économique local.</p>
    `,
  },
};

// Obtenir la consultation pour une province
export function getConsultationBySlug(slug: string): Consultation | null {
  const province = provinces.find((p) => p.slug === slug);
  if (!province) return null;
  return consultations[province.id] || null;
}

// Obtenir toutes les consultations
export function getAllConsultations(): Consultation[] {
  return Object.values(consultations);
}

