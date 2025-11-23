"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { currentProvinceId } from "@/lib/provinces";
import { getProvinceSlugFromName } from "@/lib/province-mapping";
import { getAllConsultations } from "@/lib/consultations";
import type { GeoJsonObject } from "geojson";

// Import dynamique complet de la carte pour éviter les erreurs SSR
const MapComponent = dynamic(() => import("./drc-map-leaflet-internal"), { 
  ssr: false,
  loading: () => (
    <div className="flex min-h-[500px] items-center justify-center">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-blue-rdc)] border-r-transparent" />
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
});

interface DRCMapLeafletProps {
  currentProvince?: string;
  className?: string;
}

export function DRCMapLeaflet({ currentProvince = currentProvinceId, className = "" }: DRCMapLeafletProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full overflow-hidden rounded-3xl" style={{ position: 'relative' }}>
        <MapComponent currentProvince={currentProvince} />
      </div>
    </div>
  );
}
