"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "OmbrageCamping" && password === "Ombrage84") {
  localStorage.setItem("isLoggedIn", "true");
  window.dispatchEvent(new Event("authChanged")); // 👈 notifie la Navbar
  router.push("/admin/sections");
 // redirige vers l’admin
    } else {
      setError("❌ Identifiant ou mot de passe incorrect");
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-green-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-green-700">
          🔐 Connexion
        </h1>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Identifiant"
          className="border px-3 py-2 rounded w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="border px-3 py-2 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
