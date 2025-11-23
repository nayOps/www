"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { primaryNavigation } from "@/config/navigation";

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 text-sm text-gray-700 shadow-sm backdrop-blur-sm">
      <div className="state-line-horizontal h-1 w-full" aria-hidden />
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 lg:py-5">
        <Link
          href="/"
          className="flex flex-1 items-center gap-4 text-gray-900"
          aria-label="Ministère de la Jeunesse - Accueil"
        >
          <div className="relative h-14 w-14 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo Ministère de la Jeunesse"
              fill
              className="object-contain"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
            <div className="state-line-vertical absolute left-0 top-0 h-14 w-1.5 rounded-sm" aria-hidden />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-gray-500">
              République Démocratique du Congo
            </p>
            <p className="font-bold text-lg text-gray-900">
              Ministère de la Jeunesse
            </p>
            <p className="text-sm text-gray-600">Autorité de la Jeunesse et de l'Insertion</p>
          </div>
        </Link>

        <nav className="hidden flex-1 lg:flex lg:items-center lg:justify-center lg:gap-4">
          {primaryNavigation.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                href={item.href}
                className="nav-link"
                aria-haspopup={item.children ? "true" : undefined}
              >
                {item.title}
              </Link>
              {item.children && (
                <div className="nav-dropdown">
                  {item.children.map((child) => (
                    <Link key={child.title} href={child.href} className="nav-dropdown-link">
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Rechercher"
            className="icon-button"
          >
            <SearchIcon />
          </button>
          <Link href="/mon-espace" className="btn btn-primary">
            Mon espace
          </Link>
          <button
            type="button"
            className="icon-button lg:hidden"
            aria-label="Ouvrir le menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-4">
            {primaryNavigation.map((item) => (
              <div key={item.title}>
                <Link href={item.href} className="font-semibold text-gray-900">
                  {item.title}
                </Link>
                {item.children && (
                  <div className="mt-2 flex flex-col gap-1 rounded-md border border-gray-100 bg-gray-50 p-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className="text-sm text-gray-600 hover:text-[var(--color-blue-rdc)]"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" aria-hidden>
      <path d="M1 2h18M1 9h18M1 16h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M3 3l12 12M15 3 3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="m12.5 12.5 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

