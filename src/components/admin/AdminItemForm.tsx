"use client";

import EmojiPicker from "./EmojiPicker";

export default function AdminItemForm({
  idEditing,
  title,
  content,
  extra,
  date,
  category,
  newCategory,
  setTitle,
  setContent,
  setExtra,
  setDate,
  setCategory,
  setCategories,
  setNewCategory,
  handleSave,
  resetForm,
  currentSection,
  categories,
  registerField,
  insertEmojiAtCursor,
}: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8 space-y-4">
      <h2 className="text-lg font-semibold mb-2">
        {idEditing ? "✏️ Modifier un contenu" : "➕ Ajouter un nouveau contenu"}
      </h2>

      {/* Nom */}
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

      {/* Menu : catégories + prix */}
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
              {categories
                .sort((a: any, b: any) => a.order - b.order) // ✅ tri par order
                .map((c: any) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mt-6">
  <h3 className="font-semibold mb-2">📂 Ordre des catégories du menu</h3>
  <ul className="space-y-2">
    {categories
      .sort((a, b) => a.order - b.order)
      .map((c, idx) => (
        <li key={c.id} className="flex items-center gap-2">
          <span className="flex-1">{c.name}</span>
          <button
            onClick={async () => {
              const newOrder = c.order - 1;
              await fetch(`/api/categories/${c.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: newOrder }),
              });
              const updated = await fetch("/api/categories").then((r) => r.json());
              setCategories(updated);
            }}
            disabled={idx === 0}
            className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            ⬆️
          </button>
          <button
            onClick={async () => {
              const newOrder = c.order + 1;
              await fetch(`/api/categories/${c.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ order: newOrder }),
              });
              const updated = await fetch("/api/categories").then((r) => r.json());
              setCategories(updated);
            }}
            disabled={idx === categories.length - 1}
            className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            ⬇️
          </button>
        </li>
      ))}
  </ul>
</div>


          {/* Création catégorie */}
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
                    order: categories.length + 1, // ✅ ordre automatique
                  };
                  await fetch("/api/categories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  const updated = await fetch("/api/categories").then((res) =>
                    res.json()
                  );
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

      {/* Activités */}
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

      {/* Description */}
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

      {/* Emoji */}
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
  );
}
