"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { getConsultationBySlug, getAllConsultations } from "@/lib/consultations";
import { provinces } from "@/lib/provinces";
import { DRCMapLeaflet } from "@/components/drc-map-leaflet";
import { currentProvinceId } from "@/lib/provinces";

interface PageProps {
  params: {
    province: string;
  };
}

export default function ConsultationProvincePage({ params }: PageProps) {
  const router = useRouter();
  const consultation = getConsultationBySlug(params.province);
  const province = provinces.find((p) => p.slug === params.province);

  useEffect(() => {
    if (!province || !consultation) {
      router.push("/consultation");
    }
  }, [province, consultation, router]);

  if (!province || !consultation) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
    completed: "bg-green-100 text-green-800",
    "in-progress": "bg-blue-100 text-blue-800",
    upcoming: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="bg-[var(--color-surface)]">
      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Breadcrumb */}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{province.name}</h1>
              <p className="mt-2 text-lg text-gray-600">Consultation nationale de la jeunesse</p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColors[consultation.status]}`}
              >
                {statusLabels[consultation.status]}
              </span>
              {consultation.ministerPresence && (
                <span className="flex items-center gap-2 rounded-full bg-[var(--color-blue-rdc)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-blue-rdc)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-blue-rdc)] animate-pulse" />
                  Ministre présente
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contenu principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations principales */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg"
            >
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Détails de la consultation</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(consultation.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Lieu</p>
                  <p className="mt-1 text-lg text-gray-900">{consultation.location}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Participants</p>
                  <p className="mt-1 text-lg text-gray-900">{consultation.participants.toLocaleString()} jeunes</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Description</p>
                  <p className="mt-2 leading-relaxed text-gray-700">{consultation.description}</p>
                </div>
              </div>
            </motion.section>

            {/* Points saillants */}
            {consultation.highlights.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Points saillants</h2>
                <ul className="space-y-4">
                  {consultation.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-1 flex-shrink-0 text-xl text-[var(--color-blue-rdc)]">✓</span>
                      <p className="text-gray-700">{highlight}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Galerie */}
            {consultation.images.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl border-2 border-gray-100 bg-white p-8 shadow-lg"
              >
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Galerie</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {consultation.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                          <span className="text-4xl text-gray-400">📷</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Carte */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-lg font-bold text-gray-900">Carte de la RDC</h3>
              <DRCMapLeaflet currentProvince={province.id} className="min-h-[300px]" />
            </motion.aside>

            {/* Navigation vers autres provinces */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-lg font-bold text-gray-900">Autres consultations</h3>
              <div className="space-y-2">
                {getAllConsultations()
                  .filter((c) => c.provinceId !== consultation.provinceId)
                  .slice(0, 5)
                  .map((c) => {
                    const p = provinces.find((prov) => prov.id === c.provinceId);
                    if (!p) return null;
                    return (
                      <Link
                        key={c.provinceId}
                        href={`/consultation/${p.slug}`}
                        className="block rounded-lg border-2 border-gray-100 p-3 transition-all hover:border-[var(--color-blue-rdc)] hover:bg-blue-50"
                      >
                        <p className="font-semibold text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-600">
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
            </motion.aside>
          </div>
        </div>
      </main>
    </div>
  );
}

