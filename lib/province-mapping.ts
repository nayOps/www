// Mapping entre les noms du GeoJSON et nos slugs de provinces
export const provinceNameToSlug: Record<string, string> = {
  "Bas-Uele": "bas-uele",
  "Équateur": "equateur",
  "Equateur": "equateur",
  "Haut-Katanga": "haut-katanga",
  "Haut-Lomami": "haut-lomami",
  "Haut-Uele": "haut-uele",
  "Ituri": "ituri",
  "Kasaï": "kasai",
  "Kasaï-Central": "kasai-central",
  "Kasaï-Oriental": "kasai-oriental",
  "Kinshasa": "kinshasa",
  "Kongo-Central": "kongo-central",
  "Kwango": "kwango",
  "Kwilu": "kwilu",
  "Lomami": "lomami",
  "Lualaba": "lualaba",
  "Maï-Ndombe": "mai-ndombe",
  "Mai-Ndombe": "mai-ndombe",
  "Maniema": "maniema",
  "Mongala": "mongala",
  "Nord-Kivu": "nord-kivu",
  "Nord-Ubangi": "nord-ubangi",
  "Sankuru": "sankuru",
  "Sud-Kivu": "sud-kivu",
  "Sud-Ubangi": "sud-ubangi",
  "Tanganyika": "tanganyika",
  "Tshopo": "tshopo",
  "Tshuapa": "tshuapa",
};

// Fonction pour obtenir le slug à partir du nom de la province
export function getProvinceSlugFromName(name: string): string | null {
  return provinceNameToSlug[name] || null;
}

// Fonction pour obtenir le nom normalisé à partir du slug
export function getProvinceNameFromSlug(slug: string): string | null {
  const entry = Object.entries(provinceNameToSlug).find(([_, s]) => s === slug);
  return entry ? entry[0] : null;
}

