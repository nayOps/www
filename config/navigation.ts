export type NavChild = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  href: string;
  children?: NavChild[];
};

export const primaryNavigation: NavItem[] = [
  {
    title: "ACCUEIL",
    href: "/",
  },
  {
    title: "LE MINISTÈRE",
    href: "/le-ministere",
    children: [
      { title: "Mission & Vision", href: "/le-ministere/mission-vision" },
      { title: "Le Ministre", href: "/le-ministere/le-ministre" },
      { title: "Organisation", href: "/le-ministere/organisation" },
      {
        title: "Directions & Services",
        href: "/le-ministere/directions-services",
      },
      {
        title: "Structures sous Tutelle",
        href: "/le-ministere/structures-sous-tutelle",
      },
      { title: "Histoire", href: "/le-ministere/histoire" },
    ],
  },
  {
    title: "ACTUALITÉS",
    href: "/actualites",
    children: [
      { title: "Toutes les actualités", href: "/actualites" },
      {
        title: "Communiqués de Presse",
        href: "/actualites/communiques-presse",
      },
      { title: "Accord de Paix", href: "/actualites/accord-de-paix" },
    ],
  },
  {
    title: "PROGRAMMES",
    href: "/programmes",
    children: [
      { title: "Nos Programmes", href: "/programmes" },
      { title: "Formulaire de candidature", href: "/programmes/formulaire-candidature" },
    ],
  },
  {
    title: "OPPORTUNITÉS",
    href: "/opportunites",
    children: [
      { title: "Emploi & Stages", href: "/opportunites" },
      { title: "Appels d'Offres", href: "/opportunites/appels-offres" },
    ],
  },
  {
    title: "AGENDA",
    href: "/agenda",
    children: [
      { title: "Agenda", href: "/agenda" },
      { title: "Demander une audience", href: "/agenda/demander-audience" },
    ],
  },
  {
    title: "RESSOURCES",
    href: "/ressources",
    children: [
      { title: "Rapports", href: "/ressources/rapports" },
      {
        title: "Arrêtés Ministériels",
        href: "/ressources/arretes-ministeriels",
      },
      { title: "Podcast", href: "/ressources/podcast" },
      { title: "Formation Cisco", href: "/formation-cisco" },
    ],
  },
  {
    title: "CONTACT",
    href: "/contact",
  },
];

export const footerColumns = [
  {
    title: "Accès rapides",
    links: [
      { title: "Programmes phares", href: "/programmes" },
      { title: "Opportunités", href: "/opportunites" },
      { title: "Agenda", href: "/agenda" },
      { title: "Demander une audience", href: "/agenda/demander-audience" },
    ],
  },
  {
    title: "Sites institutionnels",
    links: [
      { title: "Présidence de la RDC", href: "https://presidence.cd" },
      { title: "Primature", href: "https://primature.cd" },
      { title: "Portail du Gouvernement", href: "https://www.gouv.cd" },
      { title: "Ministère des Finances", href: "https://finances.gouv.cd" },
    ],
  },
  {
    title: "Contact",
    links: [
      { title: "+243 000 000 000", href: "tel:+243000000000" },
      { title: "contact@jeunesse.gouv.cd", href: "mailto:contact@jeunesse.gouv.cd" },
      { title: "12, Boulevard du 30 Juin, Kinshasa", href: "/contact" },
    ],
  },
  {
    title: "Suivez-nous",
    links: [
      { title: "Facebook", href: "https://facebook.com" },
      { title: "Twitter", href: "https://twitter.com" },
      { title: "YouTube", href: "https://youtube.com" },
      { title: "LinkedIn", href: "https://linkedin.com" },
    ],
  },
];

