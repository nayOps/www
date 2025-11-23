"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { provinces, currentProvinceId, type Province } from "@/lib/provinces";

interface DRCMapProps {
  currentProvince?: string;
  className?: string;
}

export function DRCMap({ currentProvince = currentProvinceId, className = "" }: DRCMapProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-full overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {provinces.map((province) => {
            const isCurrent = province.id === currentProvince;
            return (
              <Link key={province.id} href={`/consultation/${province.slug}`}>
                <motion.g
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer"
                >
                  <motion.path
                    d={province.path}
                    fill={isCurrent ? "#0095c9" : "#e5e7eb"}
                    stroke={isCurrent ? "#0066a0" : "#9ca3af"}
                    strokeWidth={isCurrent ? 2 : 1}
                    initial={{ opacity: isCurrent ? 1 : 0.7 }}
                    whileHover={{
                      fill: "#0095c9",
                      stroke: "#0066a0",
                      strokeWidth: 2,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {isCurrent && (
                    <motion.circle
                      cx={province.coordinates.x}
                      cy={province.coordinates.y}
                      r="2"
                      fill="#ffd700"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <text
                    x={province.coordinates.x}
                    y={province.coordinates.y - 2}
                    fontSize="2"
                    fill={isCurrent ? "#0066a0" : "#6b7280"}
                    textAnchor="middle"
                    className="pointer-events-none font-semibold"
                  >
                    {province.name.split(" ")[0]}
                  </text>
                </motion.g>
              </Link>
            );
          })}
        </svg>

        {/* Légende */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-[#0095c9]" />
            <span className="text-gray-700">Province actuelle</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-gray-200" />
            <span className="text-gray-700">Autres provinces</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="h-3 w-3 rounded-full bg-[#ffd700]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-gray-700">Position de la ministre</span>
          </div>
        </div>
      </div>
    </div>
  );
}

