"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/sections", label: "⚙️ Sections" },
    { href: "/admin/items", label: "📦 Contenus" },
    { href: "/admin/comments", label: "💬 Commentaires" },
  ];

  return (
    <nav className="flex gap-2 mb-6 border-b border-gray-200 pb-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              isActive
                ? "bg-green-600 text-white font-semibold shadow-sm"
                : "text-green-700 hover:bg-green-50"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
