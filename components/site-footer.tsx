import Link from "next/link";
import { footerColumns } from "@/config/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-blue-dark text-white">
      <div className="state-line-horizontal h-1 w-full" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        {footerColumns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-100">
              {column.title}
            </p>
            <ul className="mt-4 space-y-3 text-sm text-blue-50">
              {column.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-yellow-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 bg-blue-dark px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-blue-100 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Ministère de la Jeunesse de la RDC. Tous droits réservés.</p>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-blue-50">
            <span className="state-line-horizontal inline-block h-2 w-10 rounded-sm" aria-hidden />
            <span>Paix - Travail - Progrès</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

