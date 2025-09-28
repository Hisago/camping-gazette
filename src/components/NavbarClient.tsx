"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type Section = {
  id: number;
  name: string;
  slug: string;
  type: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Charger les sections
  useEffect(() => {
    fetch("/api/sections")
      .then((res) => res.json())
      .then(setSections)
      .catch((err) => console.error("Erreur fetch sections:", err));
  }, []);

  // Gestion login/logout
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("authChanged", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("authChanged", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("authChanged"));
    setOpen(false);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 shadow bg-green-700">
      {/* Barre principale */}
      <div className="flex items-center justify-between h-14 px-4 w-full">
        {/* Gauche : Logo */}
        <Link href="/" className="text-white font-bold text-xl">
          Gazette du Camping
        </Link>

        {/* Centre : Sections */}
        <div className="hidden md:flex flex-1 justify-center gap-4 overflow-x-auto whitespace-nowrap">
  {sections.map(({ slug, name }) => {
    const active = pathname.startsWith(`/${slug}`);
    return (
      <Link
        key={slug}
        href={`/${slug}`}
        className={`px-3 py-1.5 rounded-md text-base font-medium transition ${
          active
            ? "bg-white text-green-700 shadow-sm"
            : "text-white hover:bg-green-800"
        }`}
      >
        {name}
      </Link>
    );
  })}
</div>

        {/* Droite : Connexion / Déconnexion + Admin */}
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-white text-green-700 font-semibold px-3 py-1.5 rounded-md hover:bg-green-100 transition"
            >
              Connexion
            </Link>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
              >
                Déconnexion
              </button>
              <Link
                href="/admin/sections"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  pathname.startsWith("/admin")
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-white hover:bg-green-800"
                }`}
              >
                Admin
              </Link>
            </>
          )}

          {/* Burger mobile */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-green-700 border-t border-green-800">
          <div className="px-4 py-3 space-y-2">
            {sections.map(({ slug, name }) => {
              const active = pathname.startsWith(`/${slug}`);
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className={`block px-3 py-2 rounded-md ${
                    active
                      ? "bg-white text-green-700 font-semibold"
                      : "text-white hover:bg-green-800"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {name}
                </Link>
              );
            })}

            <div className="pt-2 border-t border-green-600">
              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="block text-center bg-white text-green-700 font-semibold px-3 py-2 rounded-md"
                  onClick={() => setOpen(false)}
                >
                  Connexion
                </Link>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
                  >
                    Déconnexion
                  </button>
                  <Link
                    href="/admin/sections"
                    className={`block text-center px-3 py-2 rounded-md ${
                      pathname.startsWith("/admin")
                        ? "bg-white text-green-700 font-semibold"
                        : "text-white hover:bg-green-800"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    Admin
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
