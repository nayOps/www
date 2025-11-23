"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getAllConsultations } from "@/lib/consultations";
import { provinces } from "@/lib/provinces";
import { DRCMapLeaflet } from "@/components/drc-map-leaflet";
import { currentProvinceId } from "@/lib/provinces";

export default function ConsultationPage() {
  const consultations = getAllConsultations();

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
            Consultation nationale
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            La ministre à l'écoute de la jeunesse dans les 26 provinces
          </p>
        </motion.div>

        {/* Carte principale */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <DRCMapLeaflet currentProvince={currentProvinceId} className="min-h-[600px]" />
        </motion.section>

        {/* Liste des consultations */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Consultations réalisées</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {consultations.map((consultation, index) => {
              const province = provinces.find((p) => p.id === consultation.provinceId);
              if (!province) return null;

              return (
                <motion.article
                  key={consultation.provinceId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="group overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-lg transition-all hover:-translate-y-2 hover:border-[var(--color-blue-rdc)] hover:shadow-xl"
                >
                  <Link href={`/consultation/${province.slug}`}>
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-900">{province.name}</h3>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[consultation.status]}`}
                        >
                          {statusLabels[consultation.status]}
                        </span>
                      </div>
                      <p className="mb-4 text-sm text-gray-600">
                        {new Date(consultation.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-700">
                        {consultation.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">
                          {consultation.participants.toLocaleString()} participants
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-blue-rdc)] group-hover:underline">
                          Voir les détails →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

