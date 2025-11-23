export interface Province {
  id: string;
  name: string;
  slug: string;
  coordinates: { x: number; y: number }; // Position approximative pour le label
  path: string; // SVG path pour la forme de la province
}

// Les 26 provinces de la RDC avec leurs coordonnées approximatives pour une carte simplifiée
export const provinces: Province[] = [
  {
    id: "kinshasa",
    name: "Kinshasa",
    slug: "kinshasa",
    coordinates: { x: 15, y: 85 },
    path: "M 10,80 L 20,80 L 20,90 L 10,90 Z",
  },
  {
    id: "kongo-central",
    name: "Kongo-Central",
    slug: "kongo-central",
    coordinates: { x: 5, y: 75 },
    path: "M 0,70 L 10,70 L 10,80 L 0,80 Z",
  },
  {
    id: "kwango",
    name: "Kwango",
    slug: "kwango",
    coordinates: { x: 15, y: 70 },
    path: "M 10,65 L 20,65 L 20,75 L 10,75 Z",
  },
  {
    id: "kwilu",
    name: "Kwilu",
    slug: "kwilu",
    coordinates: { x: 25, y: 70 },
    path: "M 20,65 L 30,65 L 30,75 L 20,75 Z",
  },
  {
    id: "mai-ndombe",
    name: "Mai-Ndombe",
    slug: "mai-ndombe",
    coordinates: { x: 25, y: 60 },
    path: "M 20,55 L 30,55 L 30,65 L 20,65 Z",
  },
  {
    id: "kasai",
    name: "Kasaï",
    slug: "kasai",
    coordinates: { x: 35, y: 65 },
    path: "M 30,60 L 40,60 L 40,70 L 30,70 Z",
  },
  {
    id: "kasai-central",
    name: "Kasaï-Central",
    slug: "kasai-central",
    coordinates: { x: 35, y: 55 },
    path: "M 30,50 L 40,50 L 40,60 L 30,60 Z",
  },
  {
    id: "kasai-oriental",
    name: "Kasaï-Oriental",
    slug: "kasai-oriental",
    coordinates: { x: 45, y: 55 },
    path: "M 40,50 L 50,50 L 50,60 L 40,60 Z",
  },
  {
    id: "lomami",
    name: "Lomami",
    slug: "lomami",
    coordinates: { x: 45, y: 45 },
    path: "M 40,40 L 50,40 L 50,50 L 40,50 Z",
  },
  {
    id: "sankuru",
    name: "Sankuru",
    slug: "sankuru",
    coordinates: { x: 45, y: 35 },
    path: "M 40,30 L 50,30 L 50,40 L 40,40 Z",
  },
  {
    id: "maniema",
    name: "Maniema",
    slug: "maniema",
    coordinates: { x: 55, y: 45 },
    path: "M 50,40 L 60,40 L 60,50 L 50,50 Z",
  },
  {
    id: "sud-kivu",
    name: "Sud-Kivu",
    slug: "sud-kivu",
    coordinates: { x: 60, y: 50 },
    path: "M 55,45 L 65,45 L 65,55 L 55,55 Z",
  },
  {
    id: "nord-kivu",
    name: "Nord-Kivu",
    slug: "nord-kivu",
    coordinates: { x: 55, y: 40 },
    path: "M 50,35 L 60,35 L 60,45 L 50,45 Z",
  },
  {
    id: "ituri",
    name: "Ituri",
    slug: "ituri",
    coordinates: { x: 60, y: 30 },
    path: "M 55,25 L 65,25 L 65,35 L 55,35 Z",
  },
  {
    id: "haut-uele",
    name: "Haut-Uélé",
    slug: "haut-uele",
    coordinates: { x: 55, y: 20 },
    path: "M 50,15 L 60,15 L 60,25 L 50,25 Z",
  },
  {
    id: "tshopo",
    name: "Tshopo",
    slug: "tshopo",
    coordinates: { x: 45, y: 25 },
    path: "M 40,20 L 50,20 L 50,30 L 40,30 Z",
  },
  {
    id: "bas-uele",
    name: "Bas-Uélé",
    slug: "bas-uele",
    coordinates: { x: 45, y: 15 },
    path: "M 40,10 L 50,10 L 50,20 L 40,20 Z",
  },
  {
    id: "nord-ubangi",
    name: "Nord-Ubangi",
    slug: "nord-ubangi",
    coordinates: { x: 35, y: 20 },
    path: "M 30,15 L 40,15 L 40,25 L 30,25 Z",
  },
  {
    id: "mongala",
    name: "Mongala",
    slug: "mongala",
    coordinates: { x: 35, y: 30 },
    path: "M 30,25 L 40,25 L 40,35 L 30,35 Z",
  },
  {
    id: "sud-ubangi",
    name: "Sud-Ubangi",
    slug: "sud-ubangi",
    coordinates: { x: 25, y: 30 },
    path: "M 20,25 L 30,25 L 30,35 L 20,35 Z",
  },
  {
    id: "equateur",
    name: "Équateur",
    slug: "equateur",
    coordinates: { x: 25, y: 40 },
    path: "M 20,35 L 30,35 L 30,45 L 20,45 Z",
  },
  {
    id: "tshuapa",
    name: "Tshuapa",
    slug: "tshuapa",
    coordinates: { x: 35, y: 40 },
    path: "M 30,35 L 40,35 L 40,45 L 30,45 Z",
  },
  {
    id: "tanganyika",
    name: "Tanganyika",
    slug: "tanganyika",
    coordinates: { x: 50, y: 60 },
    path: "M 45,55 L 55,55 L 55,65 L 45,65 Z",
  },
  {
    id: "haut-lomami",
    name: "Haut-Lomami",
    slug: "haut-lomami",
    coordinates: { x: 50, y: 70 },
    path: "M 45,65 L 55,65 L 55,75 L 45,75 Z",
  },
  {
    id: "lualaba",
    name: "Lualaba",
    slug: "lualaba",
    coordinates: { x: 45, y: 75 },
    path: "M 40,70 L 50,70 L 50,80 L 40,80 Z",
  },
  {
    id: "haut-katanga",
    name: "Haut-Katanga",
    slug: "haut-katanga",
    coordinates: { x: 55, y: 75 },
    path: "M 50,70 L 60,70 L 60,80 L 50,80 Z",
  },
];

// Province courante où se trouve la ministre (à mettre à jour dynamiquement)
export const currentProvinceId = "kinshasa"; // Exemple : Kinshasa

