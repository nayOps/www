"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/hero-carousel";
import { DRCMapLeaflet } from "@/components/drc-map-leaflet";
import { currentProvinceId } from "@/lib/provinces";

const pillars = [
  {
    icon: "📊",
    number: "01",
    title: "Évaluation & Impact",
    description:
      "Suivi rigoureux des politiques publiques jeunesse avec enquêtes de satisfaction et indicateurs partagés.",
    gradient: "from-blue-500 to-blue-600",
    color: "blue",
  },
  {
    icon: "💼",
    number: "02",
    title: "Insertion professionnelle",
    description:
      "Programmes d'employabilité, passerelles vers l'entrepreneuriat et accompagnement des start-up sociales.",
    gradient: "from-yellow-400 to-yellow-500",
    color: "yellow",
  },
  {
    icon: "🎯",
    number: "03",
    title: "Conception & Pilotage",
    description:
      "Coordination des programmes nationaux et alignement avec la vision gouvernementale pour la jeunesse.",
    gradient: "from-red-500 to-red-600",
    color: "red",
  },
];

const highlights = [
  {
    category: "Programmes",
    title: "Programme Kijana RDC",
    excerpt:
      "Appel à candidatures pour les jeunes innovateurs des provinces de l'Est. Clôture le 30 janvier.",
    date: "15 Jan 2025",
    image: "/caru1.jpg",
  },
  {
    category: "Événement",
    title: "Forum National de l'Éveil Patriotique",
    excerpt:
      "Deux jours d'échanges à Kinshasa avec 500 jeunes ambassadeurs du civisme et de la paix.",
    date: "12 Fév 2025",
    image: "/caru2.jpg",
  },
  {
    category: "Actualité",
    title: "Signature d'un partenariat avec Cisco",
    excerpt:
      "De nouvelles cohortes pour la certification réseau, avec des centres ouverts dans 6 provinces.",
    date: "08 Jan 2025",
    image: "/caru3.jpg",
  },
];

const quickLinks = [
  { title: "Demander une audience", href: "/agenda/demander-audience", icon: "📅" },
  { title: "Soumettre un projet", href: "/programmes/formulaire-candidature", icon: "📝" },
  { title: "Formations Cisco", href: "/formation-cisco", icon: "🎓" },
  { title: "Appels d'offres", href: "/opportunites/appels-offres", icon: "📢" },
  { title: "Podcast Ministériel", href: "/ressources/podcast", icon: "🎙️" },
  { title: "Structures sous tutelle", href: "/le-ministere/structures-sous-tutelle", icon: "🏢" },
];

const partners = [
  { name: "UNESCO", logo: "/logo/partners/unesco.png" },
  { name: "UNICEF", logo: "/logo/partners/unicef.png" },
  { name: "Cisco", logo: "/logo/partners/cisco.png" },
  { name: "BAD", logo: "/logo/partners/bad.png" },
  { name: "PNUD", logo: "/logo/partners/pnud.png" },
  { name: "Union Africaine", logo: "/logo/partners/ua.png" },
];

export default function Home() {
  return (
    <div className="bg-[var(--color-surface)]">
      <HeroCarousel />

      <main className="mx-auto max-w-7xl px-4 py-20">
        <AnimatedSection className="space-y-12">
          <SectionHeader
            eyebrow="Rôle du ministère"
            title="Les trois piliers d'action"
            description="Évaluer, insérer et piloter les politiques publiques au service de la jeunesse congolaise."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 transition-opacity hover:opacity-90"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 transition-opacity group-hover:opacity-5`} />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-end">
                    <span className="text-6xl font-bold text-gray-100">{pillar.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{pillar.description}</p>
                  <div className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${pillar.gradient}`} />
                </div>
                <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${pillar.gradient} opacity-10 blur-2xl`} />
              </motion.article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-24">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-blue-50/60 to-white/80 backdrop-blur-2xl p-8 border border-white/10">
            {/* Effets de lumière en arrière-plan */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-yellow-300/15 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-200/10 blur-3xl" />
            
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Consultation nationale"
                title="La ministre à l'écoute de la jeunesse"
                description="Une tournée dans les 26 provinces pour écouter les préoccupations, les aspirations et les propositions de la jeunesse congolaise."
              />
              <div className="mt-8">
                <DRCMapLeaflet currentProvince={currentProvinceId} className="min-h-[500px]" />
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Province actuelle : <span className="text-[var(--color-blue-rdc)] font-bold">Kinshasa</span>
                  </p>
                  <p className="text-xs text-gray-600">
                    Cliquez sur une province pour voir les détails de la consultation
                  </p>
                </div>
                <Link
                  href="/consultation"
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-blue-rdc)] to-[var(--color-blue-sky)] px-6 py-3 text-sm font-semibold text-white border border-[var(--color-blue-rdc)]/20 transition-opacity hover:opacity-90"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Voir toutes les consultations
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-blue-sky)] to-[var(--color-blue-rdc)] opacity-0 transition-opacity group-hover/btn:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-24">
          <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-blue-50/60 to-white/80 backdrop-blur-2xl p-8 border border-white/10">
            {/* Effets de lumière en arrière-plan */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-yellow-300/15 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-200/10 blur-3xl" />
            
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Actualités"
                title="À la une"
                description="Les dernières informations officielles et les événements marquants."
              />
              
              {/* Carousel principal pour le premier article */}
              <div className="mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group/article relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800/20"
                >
                  <div className="relative h-80 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/article:scale-110"
                      style={{ backgroundImage: `url(${highlights[0].image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded-full bg-yellow-400/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-200 border border-yellow-400/10">
                          {highlights[0].category}
                        </span>
                        <span className="text-sm text-white/70">{highlights[0].date}</span>
                      </div>
                      <h3 className="mb-3 text-2xl font-bold text-white group-hover/article:text-yellow-200 transition-colors">
                        {highlights[0].title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-white/90">
                        {highlights[0].excerpt}
                      </p>
                      <Link
                        href="/actualites"
                        className="group/btn inline-flex w-fit items-center gap-2 rounded-xl bg-white/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/30 hover:gap-3 border border-white/10"
                      >
                        Lire la suite
                        <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Grille d'articles secondaires */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {highlights.slice(1).map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="group/article-card relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/10 transition-opacity hover:opacity-90"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/article-card:scale-110"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white border border-white/10">
                          {item.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs text-white/80">{item.date}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover/article-card:text-[var(--color-blue-rdc)] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-gray-600">
                        {item.excerpt}
                      </p>
                      <Link
                        href="/actualites"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-rdc)] transition-all hover:gap-3"
                      >
                        Lire plus
                        <span className="transition-transform group-hover/article-card:translate-x-1">→</span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Bouton voir toutes les actualités */}
              <div className="mt-8 flex justify-center">
                <Link
                  href="/actualites"
                  className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-[var(--color-blue-rdc)] to-[var(--color-blue-sky)] px-8 py-4 text-sm font-semibold text-white border border-[var(--color-blue-rdc)]/20 transition-opacity hover:opacity-90"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Voir toutes les actualités
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-blue-sky)] to-[var(--color-blue-rdc)] opacity-0 transition-opacity group-hover/btn:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-24 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8"
          >
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl" />
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Liens rapides"
                title="Vos démarches prioritaires"
                description="Accédez immédiatement aux services les plus demandés."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="group/link flex items-center gap-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200/20 p-4 text-sm font-semibold text-gray-700 transition-opacity hover:opacity-90 hover:border-[var(--color-blue-rdc)]/30"
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <span className="flex-1 group-hover/link:text-[var(--color-blue-rdc)] transition-colors">
                        {link.title}
                      </span>
                      <span className="text-gray-400 transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-100/30 blur-3xl" />
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Partenaires"
                title="Un réseau d'alliés"
                description="Organisations nationales et internationales engagées aux côtés du ministère."
              />
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {partners.map((partner, index) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group/partner flex h-24 items-center justify-center rounded-xl bg-white/60 backdrop-blur-sm border border-dashed border-gray-200/30 p-4 transition-opacity hover:opacity-90 hover:border-[var(--color-blue-rdc)]/30"
                  >
                    <span className="text-center text-xs font-semibold text-gray-600 group-hover/partner:text-[var(--color-blue-rdc)] transition-colors">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

      </main>
    </div>
  );
}

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  inverted?: boolean;
};

function SectionHeader({ eyebrow, title, description, inverted = false }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.3em] ${
          inverted ? "text-yellow-200" : "text-[var(--color-blue-rdc)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-3xl font-bold lg:text-4xl ${
          inverted ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-base leading-relaxed ${
          inverted ? "text-white/80" : "text-gray-600"
        }`}
      >
        {description}
      </p>
    </div>
  );
}

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
};

function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
}

