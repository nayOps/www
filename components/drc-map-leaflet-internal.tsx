"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from "react-leaflet";
import { motion } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { provinces, currentProvinceId } from "@/lib/provinces";
import { getProvinceSlugFromName } from "@/lib/province-mapping";
import { getAllConsultations } from "@/lib/consultations";
import type { GeoJsonObject } from "geojson";

// Fix pour les icônes Leaflet avec Next.js (uniquement côté client)
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

interface DRCMapLeafletInternalProps {
  currentProvince?: string;
}

// Composant pour centrer la carte sur la RDC
function MapController({ geoJsonData }: { geoJsonData: GeoJsonObject | null }) {
  const map = useMap();

  useEffect(() => {
    if (geoJsonData && typeof window !== "undefined") {
      // Calculer les bounds exactes de la RDC depuis le GeoJSON
      const bounds = L.geoJSON(geoJsonData as any).getBounds();
      
      // Centrer et ajuster la vue uniquement sur la RDC
      map.fitBounds(bounds, { 
        padding: [20, 20],
        maxZoom: 8
      });
      
      // Définir les maxBounds pour empêcher de sortir de la RDC
      map.setMaxBounds(bounds.pad(0.05));
    }
  }, [map, geoJsonData]);

  return null;
}

// Fonction pour obtenir le centre d'une province (centroïde)
function getProvinceCenter(feature: any): [number, number] | null {
  if (!feature?.geometry || typeof window === "undefined") return null;
  
  try {
    const geoJson = L.geoJSON(feature);
    const bounds = geoJson.getBounds();
    const center = bounds.getCenter();
    return [center.lat, center.lng];
  } catch {
    return null;
  }
}

export default function DRCMapLeafletInternal({ currentProvince = currentProvinceId }: DRCMapLeafletInternalProps) {
  const router = useRouter();
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonObject | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Charger le GeoJSON
    fetch("/geojson/cd.json")
      .then((res) => res.json())
      .then((data) => {
        setGeoJsonData(data);
        setMapReady(true);
      })
      .catch((err) => console.error("Erreur lors du chargement du GeoJSON:", err));
  }, []);

  // Obtenir les provinces consultées
  const consultedProvinces = getAllConsultations()
    .filter(c => c.status === "completed")
    .map(c => c.provinceId);

  // Fonction pour obtenir le style d'une province
  const getProvinceStyle = (feature: any) => {
    const provinceName = feature?.properties?.name;
    const slug = getProvinceSlugFromName(provinceName);
    const province = provinces.find((p) => p.slug === slug);
    const isCurrent = province?.id === currentProvince;
    const isConsulted = province && consultedProvinces.includes(province.id);

    if (isCurrent) {
      return {
        fillColor: "#0095c9",
        fillOpacity: 0.8,
        color: "#0066a0",
        weight: 2,
        opacity: 1,
      };
    } else if (isConsulted) {
      return {
        fillColor: "#10b981",
        fillOpacity: 0.7,
        color: "#059669",
        weight: 1.5,
        opacity: 0.9,
      };
    } else {
      return {
        fillColor: "#e5e7eb",
        fillOpacity: 0.4,
        color: "#9ca3af",
        weight: 1,
        opacity: 0.6,
      };
    }
  };

  // Fonction pour gérer le clic sur une province
  const onEachFeature = (feature: any, layer: L.Layer) => {
    const provinceName = feature?.properties?.name;
    let slug = getProvinceSlugFromName(provinceName);
    
    // Si le slug n'est pas trouvé, essayer de trouver la province par le nom directement
    if (!slug) {
      const provinceByName = provinces.find((p) => 
        p.name.toLowerCase() === provinceName.toLowerCase() ||
        p.name === provinceName
      );
      if (provinceByName) {
        slug = provinceByName.slug;
      }
    }
    
    const province = slug ? provinces.find((p) => p.slug === slug) : null;
    const isConsulted = province && consultedProvinces.includes(province.id);

    // Toujours permettre le clic, même si pas de consultation
    if (slug) {
      // Ajouter un popup
      const popupContent = isConsulted
        ? `<div style="text-align: center;">
            <strong style="font-size: 16px; color: #0066a0;">${provinceName}</strong><br/>
            <span style="color: #10b981; font-size: 12px;">✓ Consultation réalisée</span><br/>
            <a href="/consultation/${slug}" style="color: #0095c9; text-decoration: none; font-weight: 500; margin-top: 8px; display: inline-block;">Voir les détails →</a>
          </div>`
        : `<div style="text-align: center;">
            <strong style="font-size: 16px; color: #0066a0;">${provinceName}</strong><br/>
            <span style="color: #9ca3af; font-size: 12px;">Consultation à venir</span>
          </div>`;
      
      layer.bindPopup(popupContent);

      // Gérer le clic - rediriger vers la page de la province
      layer.on({
        click: () => {
          if (isConsulted) {
            router.push(`/consultation/${slug}`);
          } else {
            // Même si pas de consultation, on peut rediriger vers la page
            router.push(`/consultation/${slug}`);
          }
        },
        mouseover: (e) => {
          const layer = e.target;
          layer.setStyle({
            fillColor: "#0095c9",
            fillOpacity: 0.9,
            color: "#0066a0",
            weight: 2.5,
            opacity: 1,
          });
        },
        mouseout: (e) => {
          const layer = e.target;
          const style = getProvinceStyle(feature);
          layer.setStyle(style);
        },
      });
    }
  };

  // Trouver la feature de la province courante pour le marqueur
  const currentProvinceFeature = geoJsonData
    ? (geoJsonData as any).features?.find((f: any) => {
        const slug = getProvinceSlugFromName(f?.properties?.name);
        const province = provinces.find((p) => p.slug === slug);
        return province?.id === currentProvince;
      })
    : null;

  const currentProvinceCenter = currentProvinceFeature
    ? getProvinceCenter(currentProvinceFeature)
    : null;

  // Calculer le centre approximatif de la RDC
  const rdcCenter: [number, number] = [-4.0383, 21.7587];

  if (!mapReady || !geoJsonData) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-blue-rdc)] border-r-transparent" />
          <p className="text-gray-600">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MapContainer
        center={rdcCenter}
        zoom={6}
        minZoom={5}
        maxZoom={10}
        style={{ height: "100%", width: "100%", minHeight: "500px", borderRadius: "1.5rem" }}
        scrollWheelZoom={true}
        className="z-0"
        worldCopyJump={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        <GeoJSON
          data={geoJsonData}
          style={getProvinceStyle}
          onEachFeature={onEachFeature}
        />
        {currentProvinceCenter && (
          <Marker position={currentProvinceCenter}>
            <Popup>
              <div className="text-center">
                <strong className="text-[var(--color-blue-rdc)]">Ministre présente</strong>
                <br />
                <span className="text-sm text-gray-600">
                  {currentProvinceFeature?.properties?.name}
                </span>
              </div>
            </Popup>
          </Marker>
        )}
        <MapController geoJsonData={geoJsonData} />
      </MapContainer>

      {/* Légende avec effet glassmorphique */}
      <div className="absolute bottom-6 left-6 z-[1000] rounded-2xl bg-white/80 backdrop-blur-xl p-5 border border-white/20">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-[#0095c9]" />
            <span className="text-gray-800 font-medium">Province actuelle</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-[#10b981]" />
            <span className="text-gray-800 font-medium">Province consultée</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-4 rounded bg-gray-200" />
            <span className="text-gray-800 font-medium">À consulter</span>
          </div>
          <div className="flex items-center gap-3">
            <motion.div
              className="h-3 w-3 rounded-full bg-[#ffd700]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-800 font-medium">Position de la ministre</span>
          </div>
        </div>
      </div>
    </>
  );
}

