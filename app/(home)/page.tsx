"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/hero-carousel";

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
    image: "/images/hero/hero-1.jpg",
  },
  {
    category: "Événement",
    title: "Forum National de l'Éveil Patriotique",
    excerpt:
      "Deux jours d'échanges à Kinshasa avec 500 jeunes ambassadeurs du civisme et de la paix.",
    date: "12 Fév 2025",
    image: "/images/hero/hero-2.jpg",
  },
  {
    category: "Actualité",
    title: "Signature d'un partenariat avec Cisco",
    excerpt:
      "De nouvelles cohortes pour la certification réseau, avec des centres ouverts dans 6 provinces.",
    date: "08 Jan 2025",
    image: "/images/hero/hero-3.jpg",
  },
];

const stats = [
  { value: "2.4M", label: "Jeunes accompagnés", context: "dans tout le pays", icon: "👥", color: "blue" },
  { value: "320", label: "Programmes actifs", context: "insertion & civisme", icon: "🚀", color: "yellow" },
  { value: "48", label: "Espaces provinciaux", context: "Maisons de la jeunesse", icon: "🏛️", color: "red" },
  { value: "92%", label: "Taux de satisfaction", context: "services rendus", icon: "⭐", color: "blue" },
];

const flagshipPrograms = [
  {
    title: "Académie de l'Innovation",
    description:
      "Parcours intensif de 12 semaines pour accélérer les projets technologiques portés par des jeunes.",
    tag: "Innovation",
    icon: "💡",
    gradient: "from-blue-500/10 to-blue-600/5",
    borderColor: "border-blue-200",
  },
  {
    title: "Jeunesse & Paix",
    description:
      "Programme d'éveil patriotique, dialogues communautaires et actions citoyennes dans 8 provinces.",
    tag: "Citoyenneté",
    icon: "🕊️",
    gradient: "from-yellow-400/10 to-yellow-500/5",
    borderColor: "border-yellow-200",
  },
  {
    title: "Pont vers l'Emploi",
    description:
      "Plateforme d'offres, coaching et mentorat en partenariat avec les entreprises publiques et privées.",
    tag: "Insertion",
    icon: "🔗",
    gradient: "from-red-500/10 to-red-600/5",
    borderColor: "border-red-200",
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
                className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-[var(--color-blue-rdc)] hover:shadow-2xl"
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

        <AnimatedSection className="mt-24 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Éveil patriotique"
                title="Mobilisation nationale"
                description="Renforcer l'unité, la mémoire collective et l'engagement citoyen."
              />
              <div className="mt-8 space-y-4">
                {[
                  "200 clubs 'Paix & Civisme' actifs dans les écoles et universités",
                  "Tournées régionales avec témoignages des jeunes ambassadeurs",
                  "Ressources pédagogiques téléchargeables et podcasts thématiques",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-xl">✓</span>
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
              <Link
                href="/ministere-face-jeunesse"
                className="btn btn-primary mt-8 w-fit shadow-lg hover:shadow-xl"
              >
                Participer
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group relative overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-[url('/images/hero/hero-1.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
            <div className="relative z-10">
              <SectionHeader
                eyebrow="Actualités"
                title="À la une"
                description="Les dernières informations officielles."
                inverted
              />
              <div className="mt-8 space-y-6">
                {highlights.map((item, index) => (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group/item cursor-pointer border-b border-white/10 pb-6 last:border-0 transition-all hover:border-white/20"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-16 w-16 overflow-hidden rounded-lg bg-white/10">
                          <div className="h-full w-full bg-gradient-to-br from-blue-400 to-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-200">
                            {item.category}
                          </span>
                          <span className="text-xs text-white/60">{item.date}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover/item:text-yellow-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-white/80">{item.excerpt}</p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <Link
                href="/actualites"
                className="btn btn-primary mt-8 bg-white text-gray-900 shadow-lg hover:bg-yellow-100 hover:shadow-xl"
              >
                Toutes les actualités →
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-24">
          <SectionHeader
            eyebrow="Chiffres clés"
            title="Un impact mesurable"
            description="Des indicateurs consolidés chaque trimestre et partagés en toute transparence."
          />
          <motion.div
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-white p-8 shadow-lg transition-all hover:-translate-y-2 hover:border-[var(--color-blue-rdc)] hover:shadow-2xl"
              >
                <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${
                  stat.color === "blue" ? "from-blue-400/20 to-blue-600/20" :
                  stat.color === "yellow" ? "from-yellow-400/20 to-yellow-500/20" :
                  "from-red-400/20 to-red-600/20"
                } blur-2xl`} />
                <div className="relative z-10">
                  <div className="mb-4 text-4xl">{stat.icon}</div>
                  <motion.p
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-4xl font-bold text-[var(--color-blue-rdc)]"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-3 text-sm font-semibold text-gray-900">{stat.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{stat.context}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatedSection>

        <AnimatedSection className="mt-24 space-y-12">
          <SectionHeader
            eyebrow="Programmes phares"
            title="Accompagner chaque parcours"
            description="Des initiatives structurantes pour l'employabilité, l'entrepreneuriat et le civisme."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {flagshipPrograms.map((program, index) => (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border-2 ${program.borderColor} bg-white p-8 shadow-xl transition-all hover:-translate-y-3 hover:shadow-2xl`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="relative z-10">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-5xl">{program.icon}</span>
                    <span className="badge bg-[var(--color-blue-rdc)]/10 text-[var(--color-blue-rdc)]">
                      {program.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">{program.description}</p>
                  <Link
                    href="/programmes"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-blue-rdc)] transition-transform group-hover:gap-3"
                  >
                    En savoir plus →
                  </Link>
                </div>
                <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-50" />
              </motion.article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-24 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl"
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
                      className="group/link flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white p-4 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-blue-rdc)] hover:bg-blue-50 hover:shadow-lg"
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
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl"
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
                    className="group/partner flex h-24 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-[var(--color-blue-rdc)] hover:bg-blue-50 hover:shadow-lg"
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

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};
