"use client";

import { useEffect, useRef, useState } from "react";
import EmojiPicker from "@/components/admin/EmojiPicker";

type Section = {
  id: number;
  name: string;
  slug: string;
  type: string;
};

type Item = {
  id: number;
  sectionId: number;
  title: string;
  content?: string;
  extra?: string;
  date?: string;
  category?: string; // contient directement le nom avec emoji
};

type Category = {
  id: number;
  name: string; // peut contenir emoji (🍕 Pizzas)
  slug: string;
};

export default function AdminItemsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sectionId, setSectionId] = useState<number | null>(null);

  // état du formulaire
  const [idEditing, setIdEditing] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [extra, setExtra] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");

  // refs pour gérer le curseur
  const activeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null
  );

  // Charger sections + catégories
  useEffect(() => {
    fetch("/api/sections").then((res) => res.json().then(setSections));
    fetch("/api/categories").then((res) => res.json().then(setCategories));
  }, []);

  // Charger contenus
  useEffect(() => {
    if (sectionId) {
      fetch(`/api/items?sectionId=${sectionId}`).then((res) =>
        res.json().then(setItems)
      );
    }
  }, [sectionId]);

  const resetForm = () => {
    setIdEditing(null);
    setTitle("");
    setContent("");
    setExtra("");
    setDate("");
    setCategory("");
    setNewCategory("");
  };

  const handleSave = async () => {
    if (!sectionId || !title) return;

    const payload = { sectionId, title, content, extra, date, category };

    if (idEditing) {
      await fetch(`/api/items/${idEditing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Optimistic update
      setItems((prev) =>
        prev.map((it) =>
          it.id === idEditing ? { ...it, ...payload, id: idEditing } : it
        )
      );
    } else {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
    }

    resetForm();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce contenu ?")) return;
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((i) => i.id !== id));
  };

  const currentSection = sections.find((s) => s.id === sectionId);

  // Groupement par catégorie (si menu)
  const groupedItems =
    currentSection?.type === "menu"
      ? items.reduce((acc: Record<string, Item[]>, item) => {
          const cat = item.category || "Autres";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {})
      : { Tous: items };

  // Fonction d’insertion d’emoji qui met à jour le state
  const insertEmojiAtCursor = (emoji: string) => {
    const input = activeInputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;

    let newValue = "";

    if (input.name === "title") {
      newValue = title.slice(0, start) + emoji + title.slice(end);
      setTitle(newValue);
    } else if (input.name === "category") {
      newValue = category.slice(0, start) + emoji + category.slice(end);
      setCategory(newValue);
    } else if (input.name === "newCategory") {
      newValue = newCategory.slice(0, start) + emoji + newCategory.slice(end);
      setNewCategory(newValue);
    } else if (input.name === "content") {
      newValue = content.slice(0, start) + emoji + content.slice(end);
      setContent(newValue);
    } else if (input.name === "extra") {
      newValue = extra.slice(0, start) + emoji + extra.slice(end);
      setExtra(newValue);
    }

    // repositionner le curseur
    requestAnimationFrame(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length);
      input.focus();
    });
  };

  // Attache le ref et garde la trace du champ actif
  const registerField = (
    el: HTMLInputElement | HTMLTextAreaElement | null,
    name: string
  ) => {
    if (!el) return;
    el.name = name; // permet d’identifier le champ
    el.addEventListener("focus", () => {
      activeInputRef.current = el;
    });
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 Gestion des contenus</h1>

      {/* Choix de la section */}
      <div className="mb-6">
        <label className="block font-semibold mb-1">📂 Choisir une section</label>
        <select
          className="border px-3 py-2 rounded w-full"
          value={sectionId ?? ""}
          onChange={(e) => setSectionId(Number(e.target.value))}
        >
          <option value="">-- Sélectionner --</option>
          {sections.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.type})
            </option>
          ))}
        </select>
      </div>

      {currentSection && (
        <>
          {/* Formulaire ajout / modification */}
          <div className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
            <h2 className="text-lg font-semibold mb-2">
              {idEditing ? "✏️ Modifier un contenu" : "➕ Ajouter un nouveau contenu"}
            </h2>

            <div>
              <label className="block text-sm font-medium">Nom</label>
              <input
                ref={(el) => registerField(el, "title")}
                type="text"
                className="border px-3 py-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {currentSection.type === "menu" && (
              <>
                <div>
                  <label className="block text-sm font-medium">Catégorie</label>
                  <select
                    className="border px-3 py-2 rounded w-full"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Choisir --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Création nouvelle catégorie */}
                <div className="mt-4 p-3 border rounded bg-gray-50">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    ➕ Créer une nouvelle catégorie
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      ref={(el) => registerField(el, "newCategory")}
                      type="text"
                      placeholder="Ex: 🥗 Entrées"
                      className="border px-3 py-2 rounded w-full"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <p className="text-xs text-gray-500">
                      Tu peux ajouter un emoji directement dans le nom (ex: 🍕 Pizzas, 🍰 Desserts).
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!newCategory.trim()) return;
                        const payload = {
                          name: newCategory,
                          slug: newCategory
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]/g, ""),
                        };
                        await fetch("/api/categories", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(payload),
                        });
                        const updated = await fetch("/api/categories").then((res) =>
                          res.json()
                        );
                        setCategories(updated);
                        setCategory(payload.name);
                        setNewCategory("");
                      }}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                    >
                      ➕ Ajouter
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium">Prix (€)</label>
                  <input
                    ref={(el) => registerField(el, "extra")}
                    type="text"
                    className="border px-3 py-2 rounded w-full"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                  />
                </div>
              </>
            )}

            {currentSection.type === "activities" && (
              <>
                <div>
                  <label className="block text-sm font-medium">Date & heure</label>
                  <input
                    type="datetime-local"
                    className="border px-3 py-2 rounded w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Lieu</label>
                  <input
                    ref={(el) => registerField(el, "extra")}
                    type="text"
                    className="border px-3 py-2 rounded w-full"
                    value={extra}
                    onChange={(e) => setExtra(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                ref={(el) => registerField(el, "content")}
                className="border px-3 py-2 rounded w-full"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            {/* Sélecteur emoji */}
            <div>
              <label className="block text-sm font-medium">😀 Ajouter un emoji</label>
              <EmojiPicker onSelect={insertEmojiAtCursor} />
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

          {/* Liste groupée */}
          <div className="bg-white p-6 rounded-lg shadow space-y-8">
            <h2 className="text-lg font-semibold text-gray-800">📋 Contenus existants</h2>

            {Object.entries(groupedItems).map(([cat, group]) => (
              <div key={cat}>
                {currentSection.type === "menu" && (
                  <div className="inline-block px-3 py-1 mb-3 rounded-full bg-green-50 text-green-700 font-medium border border-green-200">
                    {cat}
                  </div>
                )}
                {group.length === 0 ? (
                  <p className="text-gray-500">Aucun contenu</p>
                ) : (
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="p-2 text-left w-2/5">Nom</th>
                        {currentSection.type === "menu" && (
                          <th className="p-2 text-center w-1/5">Prix</th>
                        )}
                        {currentSection.type === "activities" && (
                          <th className="p-2 text-left w-1/5">Date</th>
                        )}
                        <th className="p-2 text-right w-2/5">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.map((i, idx) => (
                        <tr
                          key={i.id}
                          className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="p-2">{i.title}</td>
                          {currentSection.type === "menu" && (
                            <td className="p-2 text-center font-medium text-gray-800">
                              {i.extra ? `${i.extra} €` : ""}
                            </td>
                          )}
                          {currentSection.type === "activities" && (
                            <td className="p-2 text-gray-600">
                              {i.date &&
                                new Date(i.date).toLocaleString("fr-FR", {
                                  dateStyle: "short",
                                  timeStyle: "short",
                                })}
                            </td>
                          )}
                          <td className="p-2 flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setIdEditing(i.id);
                                setTitle(i.title);
                                setContent(i.content ?? "");
                                setExtra(i.extra ?? "");
                                setDate(i.date ?? "");
                                setCategory(i.category ?? "");
                                setSectionId(i.sectionId);
                              }}
                              className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
                            >
                              ✏️ Modifier
                            </button>
                            <button
                              onClick={() => handleDelete(i.id)}
                              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              🗑️ Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
