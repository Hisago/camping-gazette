"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/sections", label: "⚙️ Sections" },
    { href: "/admin/items", label: "📝 Contenus" },
    { href: "/admin/comments", label: "📝 Commentaires" },
  ];

  return (
    <nav className="flex gap-4 mb-6 border-b pb-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-3 py-1 rounded ${
            pathname === link.href
              ? "bg-green-600 text-white font-semibold"
              : "text-green-700 hover:bg-green-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
