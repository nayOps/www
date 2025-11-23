import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const cooperHewitt = localFont({
  src: [
    {
      path: "./../public/fonts/CooperHewitt-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../public/fonts/CooperHewitt-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../public/fonts/CooperHewitt-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cooper",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeunesse.gouv.cd"),
  title: {
    default: "Ministère de la Jeunesse - RDC",
    template: "%s | Ministère de la Jeunesse",
  },
  description:
    "Site officiel du Ministère de la Jeunesse de la République Démocratique du Congo.",
  applicationName: "Ministère de la Jeunesse RDC",
  keywords: [
    "Ministère de la Jeunesse",
    "RDC",
    "Programmes Jeunesse",
    "Opportunités",
    "Agenda",
  ],
  openGraph: {
    title: "Ministère de la Jeunesse - RDC",
    description:
      "Découvrez les programmes, opportunités et actualités du Ministère de la Jeunesse de la RDC.",
    locale: "fr_CD",
    siteName: "Ministère de la Jeunesse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cooperHewitt.variable} bg-background text-gray-900 antialiased`}>
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
