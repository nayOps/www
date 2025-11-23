"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { primaryNavigation } from "@/config/navigation";

const heroSlides = [
  {
    id: 1,
    image: "/caru1.jpg",
    title: "Investir dans la jeunesse",
    subtitle: "C'est garantir la stabilité et l'avenir de la RDC",
    cta: "Découvrir les programmes",
    ctaLink: "/programmes",
  },
  {
    id: 2,
    image: "/caru2.jpg",
    title: "Éveil Patriotique",
    subtitle: "Renforcer l'unité et l'engagement citoyen",
    cta: "Participer aux initiatives",
    ctaLink: "/ministere-face-jeunesse",
  },
  {
    id: 3,
    image: "/caru3.jpg",
    title: "Opportunités pour tous",
    subtitle: "Formations, emplois et accompagnement personnalisé",
    cta: "Voir les opportunités",
    ctaLink: "/opportunites",
  },
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true); // Par défaut, on est sur le carousel (fond sombre)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détecter la couleur du fond sous la navigation pour changer la couleur des liens
  useEffect(() => {
    const detectBackgroundColor = () => {
      if (typeof window === "undefined") return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Si on est encore dans le carousel (première section)
      if (scrollY < windowHeight * 0.1) {
        setIsDarkBackground(true); // Carousel = fond sombre → texte blanc
        return;
      }
      
      // On est dans les sections principales - chercher le fond sous la nav
      const navElement = document.querySelector("nav");
      if (!navElement) {
        setIsDarkBackground(false); // Par défaut, fond clair → texte bleu
        return;
      }
      
      const navRect = navElement.getBoundingClientRect();
      const checkY = navRect.bottom + 50; // Juste sous la navigation
      const checkX = window.innerWidth / 2;
      
      // Trouver l'élément à cette position
      const elementBelow = document.elementFromPoint(checkX, checkY);
      
      if (!elementBelow) {
        setIsDarkBackground(false); // Par défaut, fond clair
        return;
      }
      
      // Remonter dans le DOM pour trouver un élément avec un fond visible
      let currentElement: HTMLElement | null = elementBelow as HTMLElement;
      let attempts = 0;
      const maxAttempts = 50;
      
      while (currentElement && attempts < maxAttempts) {
        const tagName = currentElement.tagName;
        // Ignorer certains éléments
        if (tagName === "NAV" || tagName === "HEADER" || tagName === "BODY" || tagName === "HTML") {
          currentElement = currentElement.parentElement;
          attempts++;
          continue;
        }
        
        const computedStyle = window.getComputedStyle(currentElement);
        const bgColor = computedStyle.backgroundColor;
        
        // Vérifier si le fond est vraiment visible (non transparent)
        if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          // Extraire les valeurs RGB
          const rgbMatch = bgColor.match(/\d+/g);
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0]);
            const g = parseInt(rgbMatch[1]);
            const b = parseInt(rgbMatch[2]);
            
            // Calculer la luminosité (formule standard)
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            
            // Si la luminosité est élevée (>= 0.5), c'est un fond clair → texte bleu (isDarkBackground = false)
            // Si la luminosité est faible (< 0.5), c'est un fond sombre → texte blanc (isDarkBackground = true)
            const shouldBeDark = luminance < 0.5;
            setIsDarkBackground(shouldBeDark);
            return;
          }
        }
        
        // Remonter au parent
        currentElement = currentElement.parentElement;
        attempts++;
      }
      
      // Si on n'a pas trouvé de fond, on est probablement sur un fond clair
      setIsDarkBackground(false);
    };

    const handleScroll = () => {
      requestAnimationFrame(detectBackgroundColor);
    };

    // Détecter au chargement plusieurs fois pour s'assurer
    const timeoutId1 = setTimeout(detectBackgroundColor, 100);
    const timeoutId2 = setTimeout(detectBackgroundColor, 500);
    const timeoutId3 = setTimeout(detectBackgroundColor, 1000);
    
    // Écouter le scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Navigation Glassmorphism - Clean & Simple */}
      <motion.nav
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`${
          isScrolled ? "fixed" : "absolute"
        } top-0 left-0 right-0 z-50 w-full transition-all duration-300`}
      >
        <motion.div
          animate={{
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
          className={`mx-auto w-full max-w-[1920px] px-6 transition-all duration-300 ${
            isScrolled
              ? "pt-1 pb-1 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg"
              : "pt-2 pb-2 backdrop-blur-0 bg-transparent"
          }`}
        >
          <div className={`relative flex items-center justify-between px-6 transition-all duration-300 ${
            isScrolled ? "py-1" : "py-2"
          }`}>
            {/* Logo Section - No container */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/"
                className="group flex items-center transition-all hover:scale-105"
              >
                <div className={`relative flex-shrink-0 transition-all duration-300 ${
                  isScrolled ? "h-20 w-20" : "h-32 w-32"
                }`}>
                  <Image
                    src="/logo.png"
                    alt="Logo Ministère de la Jeunesse"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </Link>
            </motion.div>

              {/* Navigation Links - Enhanced */}
              <div className="hidden lg:flex items-center gap-2">
                {primaryNavigation.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 + 0.4, duration: 0.6 }}
                    className="relative group"
                  >
                    <Link
                      href={item.href}
                      className={`px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] transition-all ${
                        isDarkBackground 
                          ? "!text-white hover:!text-yellow-200" 
                          : "!text-[var(--color-blue-rdc)] hover:!text-[var(--color-blue-sky)]"
                      }`}
                      style={{ 
                        color: isDarkBackground ? '#ffffff' : '#0095c9'
                      }}
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="invisible absolute left-0 top-full mt-3 min-w-[220px] rounded-xl bg-white/10 p-3 opacity-0 backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100"
                      >
                        <div className="space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={`block rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:bg-white/20 ${
                                isDarkBackground 
                                  ? "!text-white" 
                                  : "!text-[var(--color-blue-rdc)]"
                              }`}
                              style={{ 
                                color: isDarkBackground ? '#ffffff' : '#0095c9'
                              }}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Actions Section - Enhanced */}
              <div className="flex items-center gap-3">
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all hover:bg-white/20"
                  aria-label="Rechercher"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="8" cy="8" r="6" />
                    <path d="m12.5 12.5 3 3" strokeLinecap="round" />
                  </svg>
                </motion.button>
                
                <motion.a
                  href="/mon-espace"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`hidden md:flex items-center gap-2 rounded-full backdrop-blur-md px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/20 ${
                    isDarkBackground 
                      ? "bg-white/10 !text-white" 
                      : "bg-[var(--color-blue-rdc)]/10 !text-[var(--color-blue-rdc)]"
                  }`}
                  style={{ 
                    color: isDarkBackground ? '#ffffff' : '#0095c9'
                  }}
                >
                  <span>Mon espace</span>
                </motion.a>

                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNavOpen(!isNavOpen)}
                  className={`lg:hidden rounded-full backdrop-blur-md p-2 transition-all hover:bg-white/20 ${
                    isDarkBackground 
                      ? "bg-white/10 text-white" 
                      : "bg-[var(--color-blue-rdc)]/10 text-[var(--color-blue-rdc)]"
                  }`}
                  style={{ 
                    color: isDarkBackground ? '#ffffff' : '#0095c9'
                  }}
                  aria-label="Menu"
                >
                  <AnimatePresence mode="wait">
                    {isNavOpen ? (
                      <motion.svg
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        width="22" height="22" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path d="M3 3l12 12M15 3 3 15" strokeLinecap="round" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        width="22" height="22" viewBox="0 0 20 18" fill="none" stroke="currentColor" strokeWidth="2.5"
                      >
                        <path d="M1 2h18M1 9h18M1 16h18" strokeLinecap="round" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            {/* Mobile Menu - Enhanced */}
            <AnimatePresence>
              {isNavOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-8"
                >
                  <div className="flex flex-col gap-1 py-4">
                    {primaryNavigation.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className={`block rounded-xl px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-white/20 hover:translate-x-2 ${
                            isDarkBackground 
                              ? "!text-white" 
                              : "!text-[var(--color-blue-rdc)]"
                          }`}
                          style={{ 
                            color: isDarkBackground ? '#ffffff' : '#0095c9'
                          }}
                          onClick={() => setIsNavOpen(false)}
                        >
                          {item.title}
                        </Link>
                        {item.children && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="ml-6 mt-2 flex flex-col gap-1 border-l-2 border-white/30 pl-4"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.title}
                                href={child.href}
                                className={`block rounded-lg px-4 py-2 text-sm transition-all hover:bg-white/10 hover:translate-x-1 ${
                                  isDarkBackground 
                                    ? "!text-white" 
                                    : "!text-[var(--color-blue-rdc)]"
                                }`}
                                style={{ 
                                  color: isDarkBackground ? '#ffffff' : '#0095c9'
                                }}
                                onClick={() => setIsNavOpen(false)}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: primaryNavigation.length * 0.05 }}
                      className="mt-4 pt-4"
                    >
                      <Link
                        href="/mon-espace"
                        className="block rounded-xl bg-white/20 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider !text-white transition-all hover:bg-white/30"
                        style={{ color: '#ffffff' }}
                        onClick={() => setIsNavOpen(false)}
                      >
                        Mon espace
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Slides with smooth crossfade */}
      {heroSlides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={false}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.05,
            zIndex: index === currentIndex ? 1 : 0,
          }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <motion.div
              animate={{
                scale: index === currentIndex ? 1 : 1.1,
              }}
              transition={{
                duration: 8,
                ease: "linear",
              }}
              className="h-full w-full"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%230095c9' width='1920' height='1080'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='48' font-family='sans-serif'%3EImage Hero %3C/text%3E%3C/svg%3E";
                }}
              />
            </motion.div>
            {/* Blue overlay from charte graphique */}
            <div className="absolute inset-0 bg-[#0095c9]/50" />
            {/* Subtle overlay for text readability only */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </motion.div>
      ))}

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={`content-${slide.id}`}
              initial={false}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                y: index === currentIndex ? 0 : 30,
                zIndex: index === currentIndex ? 10 : 0,
                pointerEvents: index === currentIndex ? "auto" : "none",
              }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: index === currentIndex ? 0.2 : 0,
              }}
              className="absolute max-w-2xl text-left text-white"
            >
              <div className="space-y-5">
                <motion.span
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    x: index === currentIndex ? 0 : -30,
                  }}
                  transition={{ duration: 0.8, delay: index === currentIndex ? 0.4 : 0 }}
                  className="inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md"
                >
                  Discours du Ministre
                </motion.span>
                
                <motion.h1
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    y: index === currentIndex ? 0 : 20,
                  }}
                  transition={{ duration: 0.8, delay: index === currentIndex ? 0.5 : 0 }}
                  className="text-3xl font-bold leading-tight lg:text-4xl xl:text-5xl"
                  style={{ textAlign: 'left' }}
                >
                  "{slide.title}"
                </motion.h1>
                
                <motion.p
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    y: index === currentIndex ? 0 : 15,
                  }}
                  transition={{ duration: 0.8, delay: index === currentIndex ? 0.6 : 0 }}
                  className="max-w-xl text-base leading-relaxed text-white/90 lg:text-lg xl:text-xl"
                  style={{ textAlign: 'justify', textJustify: 'inter-word' }}
                >
                  {slide.subtitle}
                </motion.p>
                
                <motion.div
                  animate={{
                    opacity: index === currentIndex ? 1 : 0,
                    y: index === currentIndex ? 0 : 15,
                  }}
                  transition={{ duration: 0.8, delay: index === currentIndex ? 0.7 : 0 }}
                  className="flex flex-wrap items-center gap-4 pt-4"
                >
                  <a
                    href={slide.ctaLink}
                    className="rounded-full bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105"
                    style={{ color: '#ffffff' }}
                  >
                    {slide.cta}
                  </a>
                  <a
                    href="/actualites"
                    className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 hover:scale-105"
                    style={{ color: '#ffffff' }}
                  >
                    Actualités à la une
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={goToPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20"
        aria-label="Slide précédent"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </motion.button>

      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all hover:bg-white/20"
        aria-label="Slide suivant"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </motion.button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Barre tricolore (Ligne d'État) en bas du carousel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 state-line-horizontal" aria-hidden />
    </section>
  );
}

