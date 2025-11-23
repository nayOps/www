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
    images: ["/images/consultation/kinshasa-1.jpg", "/images/consultation/kinshasa-2.jpg"],
    location: "Palais du Peuple, Kinshasa",
    ministerPresence: true,
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
    ],
    participants: 300,
    images: ["/images/consultation/kongo-central-1.jpg"],
    location: "Matadi, Kongo-Central",
    ministerPresence: true,
  },
  "kwilu": {
    provinceId: "kwilu",
    provinceName: "Kwilu",
    date: "2025-02-20",
    status: "completed",
    description: "Consultation dans la province du Kwilu sur l'entrepreneuriat et l'innovation.",
    highlights: ["Rencontre avec 400 jeunes entrepreneurs", "Signature de partenariats"],
    participants: 400,
    images: [],
    location: "Bandundu, Kwilu",
    ministerPresence: true,
  },
  "kasai": {
    provinceId: "kasai",
    provinceName: "Kasaï",
    date: "2025-03-05",
    status: "completed",
    description: "Consultation dans le Kasaï sur la paix et la cohésion sociale.",
    highlights: ["Dialogue avec 350 jeunes", "Programme de réconciliation"],
    participants: 350,
    images: [],
    location: "Luebo, Kasaï",
    ministerPresence: true,
  },
  "kasai-central": {
    provinceId: "kasai-central",
    provinceName: "Kasaï-Central",
    date: "2025-03-15",
    status: "completed",
    description: "Consultation dans le Kasaï-Central sur l'éducation et la formation.",
    highlights: ["Visite des écoles", "Programme de bourses"],
    participants: 450,
    images: [],
    location: "Kananga, Kasaï-Central",
    ministerPresence: true,
  },
  "maniema": {
    provinceId: "maniema",
    provinceName: "Maniema",
    date: "2025-03-25",
    status: "completed",
    description: "Consultation dans le Maniema sur le développement économique.",
    highlights: ["Rencontre avec les coopératives", "Appui aux projets"],
    participants: 280,
    images: [],
    location: "Kindu, Maniema",
    ministerPresence: true,
  },
  "haut-katanga": {
    provinceId: "haut-katanga",
    provinceName: "Haut-Katanga",
    date: "2025-04-10",
    status: "completed",
    description: "Consultation dans le Haut-Katanga sur l'industrie et l'emploi.",
    highlights: ["Partenariats avec les entreprises", "Programme d'insertion"],
    participants: 600,
    images: [],
    location: "Lubumbashi, Haut-Katanga",
    ministerPresence: true,
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

