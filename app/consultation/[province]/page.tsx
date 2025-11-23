"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, use } from "react";
import { getConsultationBySlug, getAllConsultations } from "@/lib/consultations";
import { provinces } from "@/lib/provinces";
import { DRCMapLeaflet } from "@/components/drc-map-leaflet";
import { currentProvinceId } from "@/lib/provinces";
import { HeroCarousel } from "@/components/hero-carousel";

interface PageProps {
  params: Promise<{
    province: string;
  }>;
}

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.section>
);

export default function ConsultationProvincePage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const consultation = getConsultationBySlug(resolvedParams.province);
  const province = provinces.find((p) => p.slug === resolvedParams.province);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  
  // Si pas de consultation, on affiche quand même la page avec un message
  const hasConsultation = !!consultation;
  
  // Créer une galerie avec plusieurs images (répéter les images disponibles)
  const galleryImages = hasConsultation && consultation && consultation.images && consultation.images.length > 0
    ? [...consultation.images, ...consultation.images, ...consultation.images] // Répéter 3 fois
    : [];

  useEffect(() => {
    // Rediriger seulement si la province n'existe pas du tout
    if (!province) {
      router.push("/consultation");
    }
    // Si la province existe mais pas de consultation, on affiche quand même la page
  }, [province, router]);

  // Navigation au clavier dans le modal
  useEffect(() => {
    if (!selectedImage || !hasConsultation || !consultation || !consultation.images || consultation.images.length <= 1) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!consultation || !consultation.images) return;
      if (e.key === "ArrowLeft" && selectedImageIndex > 0) {
        const newIndex = selectedImageIndex - 1;
        setSelectedImageIndex(newIndex);
        setSelectedImage(consultation.images[newIndex]);
      } else if (e.key === "ArrowRight" && selectedImageIndex < consultation.images.length - 1) {
        const newIndex = selectedImageIndex + 1;
        setSelectedImageIndex(newIndex);
        setSelectedImage(consultation.images[newIndex]);
      } else if (e.key === "Escape") {
        setSelectedImage(null);
        setSelectedImageIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedImageIndex, consultation, hasConsultation]);

  if (!province) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface)]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Province non trouvée</h1>
          <Link href="/consultation" className="mt-4 text-[var(--color-blue-rdc)] hover:underline">
            Retour aux consultations
          </Link>
        </div>
      </div>
    );
  }

  const statusLabels = {
    completed: "Terminée",
    "in-progress": "En cours",
    upcoming: "À venir",
  };

  const statusColors = {
    completed: "bg-green-100/80 text-green-800",
    "in-progress": "bg-blue-100/80 text-blue-800",
    upcoming: "bg-yellow-100/80 text-yellow-800",
  };

  return (
    <div className="bg-[var(--color-surface)]">
      <HeroCarousel />
      <main className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Breadcrumb */}
        <AnimatedSection delay={0}>
          <nav className="mb-8 text-sm">
            <ol className="flex items-center gap-2 text-gray-600">
              <li>
                <Link href="/" className="hover:text-[var(--color-blue-rdc)] transition-colors">
                  Accueil
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/consultation" className="hover:text-[var(--color-blue-rdc)] transition-colors">
                  Consultation nationale
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-semibold">{province.name}</li>
            </ol>
          </nav>
        </AnimatedSection>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contenu principal - Style Article */}
          <article className="lg:col-span-2 space-y-8">
            {/* Header de l'article */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                {hasConsultation && (
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-sm ${statusColors[consultation.status]}`}>
                      {statusLabels[consultation.status]}
                    </span>
                    {consultation.ministerPresence && (
                      <span className="flex items-center gap-2 rounded-full bg-[var(--color-blue-rdc)]/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-[var(--color-blue-rdc)] border border-[var(--color-blue-rdc)]/20">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-blue-rdc)] animate-pulse" />
                        Ministre présente
                      </span>
                    )}
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{province.name}</h1>
                <p className="text-xl text-gray-600 mb-6">Consultation nationale de la jeunesse</p>
                {hasConsultation && consultation && (
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div>
                      <span className="font-semibold text-gray-500">Date :</span>{" "}
                      {new Date(consultation.date).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">Lieu :</span> {consultation.location}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-500">Participants :</span> {consultation.participants.toLocaleString()} jeunes
                    </div>
                  </div>
                )}
                {!hasConsultation && (
                  <div className="rounded-lg bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/20 p-4">
                    <p className="text-yellow-800">
                      <strong>Consultation à venir</strong> - La consultation dans cette province sera organisée prochainement.
                    </p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Image principale */}
            {hasConsultation && consultation && consultation.images.length > 0 && (
              <AnimatedSection delay={0.2}>
                <div 
                  className="relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 cursor-pointer group"
                  onClick={() => {
                    if (consultation.images.length > 0) {
                      setSelectedImage(consultation.images[0]);
                      setSelectedImageIndex(0);
                    }
                  }}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={consultation.images[0]}
                      alt={`Consultation ${province.name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
                    {consultation.images.length > 1 && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="rounded-full bg-white/90 backdrop-blur-sm p-3">
                          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Contenu de l'article */}
            {hasConsultation && consultation && consultation.content ? (
              <AnimatedSection delay={0.3}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: consultation.content }}
                  />
                </div>
              </AnimatedSection>
            ) : hasConsultation && consultation ? (
              <AnimatedSection delay={0.3}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">{consultation.description}</p>
                </div>
              </AnimatedSection>
            ) : null}

            {/* Message si pas de consultation */}
            {!hasConsultation && (
              <AnimatedSection delay={0.3}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <p className="text-lg leading-relaxed text-gray-700">
                    La consultation nationale de la jeunesse dans la province de <strong>{province.name}</strong> sera organisée prochainement. 
                    Cette page sera mise à jour avec les détails de la consultation une fois celle-ci réalisée.
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Points saillants */}
            {hasConsultation && consultation && consultation.highlights.length > 0 && (
              <AnimatedSection delay={0.4}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Points saillants</h2>
                  <ul className="space-y-4">
                    {consultation.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-1 flex-shrink-0 text-xl text-[var(--color-blue-rdc)]">✓</span>
                        <p className="text-gray-700 leading-relaxed">{highlight}</p>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            )}

            {/* Bloc Vidéo */}
            {hasConsultation && consultation && consultation.video && (
              <AnimatedSection delay={0.5}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Vidéo de la consultation</h2>
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
                    <iframe
                      src={consultation.video}
                      title={`Vidéo consultation ${province.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* Galerie d'images avec slider */}
            {galleryImages.length > 0 && (
              <AnimatedSection delay={0.6}>
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-8 md:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Galerie photos</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        {galleryIndex + 1} / {galleryImages.length}
                      </span>
                    </div>
                  </div>
                  
                  {/* Carousel principal */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-100">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${galleryIndex * 100}%)` }}
                    >
                      {galleryImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative w-full flex-shrink-0 aspect-video cursor-pointer group"
                          onClick={() => {
                            // Trouver l'index dans les images originales
                            if (hasConsultation && consultation && consultation.images.length > 0) {
                              const originalIndex = index % consultation.images.length;
                              setSelectedImage(consultation.images[originalIndex]);
                              setSelectedImageIndex(originalIndex);
                            } else {
                              setSelectedImage(image);
                              setSelectedImageIndex(0);
                            }
                          }}
                        >
                          <Image
                            src={image}
                            alt={`Photo ${index + 1} - Consultation ${province.name}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="rounded-full bg-white/90 backdrop-blur-sm p-3">
                              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Boutons de navigation */}
                    {galleryImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm p-3 text-gray-900 hover:bg-white transition-colors shadow-lg"
                          aria-label="Image précédente"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm p-3 text-gray-900 hover:bg-white transition-colors shadow-lg"
                          aria-label="Image suivante"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Miniatures en bas */}
                  {galleryImages.length > 1 && (
                    <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                      {galleryImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setGalleryIndex(index)}
                          className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                            index === galleryIndex
                              ? "border-[var(--color-blue-rdc)] scale-105"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Miniature ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Carte */}
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Carte de la RDC</h3>
                <DRCMapLeaflet currentProvince={province.id} className="min-h-[300px]" />
              </div>
            </AnimatedSection>

            {/* Navigation vers autres provinces */}
            <AnimatedSection delay={0.3}>
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl border border-gray-200/20 p-6">
                <h3 className="mb-4 text-lg font-bold text-gray-900">Autres consultations</h3>
                <div className="space-y-2">
                  {getAllConsultations()
                    .filter((c) => hasConsultation && consultation ? c.provinceId !== consultation.provinceId : true)
                    .slice(0, 5)
                    .map((c) => {
                      const p = provinces.find((prov) => prov.id === c.provinceId);
                      if (!p) return null;
                      return (
                        <Link
                          key={c.provinceId}
                          href={`/consultation/${p.slug}`}
                          className="block rounded-lg border border-gray-200/20 bg-white/60 backdrop-blur-sm p-3 transition-all hover:border-[var(--color-blue-rdc)]/30 hover:bg-white/80"
                        >
                          <p className="font-semibold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(c.date).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </Link>
                      );
                    })}
                </div>
                <Link
                  href="/consultation"
                  className="mt-4 block text-center text-sm font-semibold text-[var(--color-blue-rdc)] hover:underline"
                >
                  Voir toutes les consultations →
                </Link>
              </div>
            </AnimatedSection>
          </aside>
        </div>
      </main>

      {/* Modal pour agrandir les images */}
      {selectedImage && hasConsultation && consultation && consultation.images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => {
            setSelectedImage(null);
            setSelectedImageIndex(0);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => {
                setSelectedImage(null);
                setSelectedImageIndex(0);
              }}
              className="absolute -top-12 right-0 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>

            {/* Navigation précédente */}
            {consultation.images.length > 1 && selectedImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = selectedImageIndex - 1;
                  setSelectedImageIndex(newIndex);
                  setSelectedImage(consultation.images[newIndex]);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </button>
            )}

            {/* Navigation suivante */}
            {consultation.images.length > 1 && selectedImageIndex < consultation.images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newIndex = selectedImageIndex + 1;
                  setSelectedImageIndex(newIndex);
                  setSelectedImage(consultation.images[newIndex]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 hover:bg-white/30">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            )}

            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-900">
              <Image
                src={selectedImage}
                alt={`Photo ${selectedImageIndex + 1} - Consultation ${province.name}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Compteur d'images */}
            {consultation.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                <div className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm text-white">
                  {selectedImageIndex + 1} / {consultation.images.length}
                </div>
              </div>
            )}

            {/* Miniatures en bas */}
            {consultation.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-full overflow-x-auto px-4">
                {consultation.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                      setSelectedImage(img);
                    }}
                    className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      index === selectedImageIndex
                        ? "border-white scale-110"
                        : "border-white/30 hover:border-white/60"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Miniature ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
