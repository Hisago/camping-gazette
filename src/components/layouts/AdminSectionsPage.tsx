"use client";

import { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/admin/EmojiPicker";
import SectionPreview from "@/components/admin/SectionPreview";

type Section = {
  id: number;
  name: string;
  slug: string;
  type: string;
};

// Générer un slug automatiquement à partir du nom (sans emoji)
function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD") // enlever accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-") // espaces -> tirets
    .replace(/(^-|-$)+/g, "");
}

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [idEditing, setIdEditing] = useState<number | null>(null);

  const [name, setName] = useState("");
  const [type, setType] = useState("list");

  // Champ texte actuellement actif
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Charger les sections
  const loadSections = async () => {
    const res = await fetch("/api/sections");
    const data = await res.json();
    setSections(data);
  };

  useEffect(() => {
    loadSections();
  }, []);

  const resetForm = () => {
    setIdEditing(null);
    setName("");
    setType("list");
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    const payload = {
      name, // conserve les emojis
      slug: toSlug(name), // slug sans emoji
      type,
    };

    if (idEditing) {
      await fetch(`/api/sections/${idEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    await loadSections();
    resetForm();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer cette partie ?")) return;
    await fetch(`/api/sections/${id}`, { method: "DELETE" });
    setSections(sections.filter((s) => s.id !== id));
  };

  // Insertion d’emoji au curseur
  const insertEmojiAtCursor = (emoji: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    const newValue =
      name.slice(0, start) + emoji + name.slice(end);

    setName(newValue);

    // repositionner le curseur
    requestAnimationFrame(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length);
      input.focus();
    });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚙️ Gestion des parties du site</h1>

      {/* Formulaire */}
      <div className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
        <h2 className="text-lg font-semibold">
          {idEditing ? "✏️ Modifier une partie" : "➕ Ajouter une nouvelle partie"}
        </h2>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium">Nom</label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Ex: 🍽️ Snack"
              className="border px-3 py-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tu peux ajouter un emoji directement (ex: 🎉 Activités, 📰 Gazette).
            </p>
            <div className="mt-2">
              <EmojiPicker onSelect={insertEmojiAtCursor} />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Type</label>
            <select
              className="border px-3 py-2 rounded w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="menu">Menu</option>
              <option value="list">Liste</option>
              <option value="activities">Activités</option>
              <option value="cards">Cartes</option>
            </select>
              <SectionPreview type={type} />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {idEditing ? "💾 Enregistrer" : "➕ Ajouter"}
          </button>
          {idEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              ❌ Annuler
            </button>
          )}
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">📋 Parties existantes</h2>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-2 text-left w-1/3">Nom</th>
              <th className="p-2 text-left w-1/3">Identifiant</th>
              <th className="p-2 text-left w-1/6">Type</th>
              <th className="p-2 text-right w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((s, idx) => (
              <tr
                key={s.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2">{s.name}</td>
                <td className="p-2 text-gray-500">{s.slug}</td>
                <td className="p-2 capitalize">{s.type}</td>
                <td className="p-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setIdEditing(s.id);
                      setName(s.name);
                      setType(s.type);
                    }}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 border border-green-300 rounded hover:bg-green-200"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 border border-red-300 rounded hover:bg-red-200"
                  >
                    🗑️ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
