"use client";

import { useEffect, useRef, useState } from "react";
import AdminSectionSelect from "@/components/admin/AdminSectionSelect";
import AdminItemForm from "@/components/admin/AdminItemForm";
import AdminItemTable from "@/components/admin/AdminItemTable";

type Section = { id: number; name: string; slug: string; type: string };
type Item = {
  id: number;
  sectionId: number;
  title: string;
  content?: string;
  extra?: string;
  date?: string;
  category?: string;
};
type Category = { id: number; name: string; slug: string; order: number };

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

  // refs pour savoir où insérer un emoji
  const activeInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null
  );

  // charger sections + catégories
  useEffect(() => {
    fetch("/api/sections").then((res) => res.json().then(setSections));
    fetch("/api/categories").then((res) => res.json().then(setCategories));
  }, []);

  // charger items quand section change
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

  // groupement par catégorie si menu
  const groupedItems =
    currentSection?.type === "menu"
      ? items.reduce((acc: Record<string, Item[]>, item) => {
          const cat = item.category || "Autres";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {})
      : { Tous: items };

  // gestion emoji
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

    requestAnimationFrame(() => {
      input.setSelectionRange(start + emoji.length, start + emoji.length);
      input.focus();
    });
  };

  const registerField = (
    el: HTMLInputElement | HTMLTextAreaElement | null,
    name: string
  ) => {
    if (!el) return;
    el.name = name;
    el.addEventListener("focus", () => {
      activeInputRef.current = el;
    });
  };

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 Gestion des contenus</h1>

      <AdminSectionSelect
        sections={sections}
        sectionId={sectionId}
        setSectionId={setSectionId}
      />

      {currentSection && (
        <>
          <AdminItemForm
            idEditing={idEditing}
            title={title}
            content={content}
            extra={extra}
            date={date}
            category={category}
            newCategory={newCategory}
            setTitle={setTitle}
            setContent={setContent}
            setExtra={setExtra}
            setDate={setDate}
            setCategory={setCategory}
            setCategories={setCategories}
            setNewCategory={setNewCategory}
            handleSave={handleSave}
            resetForm={resetForm}
            currentSection={currentSection}
            categories={categories}
            registerField={registerField}
            insertEmojiAtCursor={insertEmojiAtCursor}
          />

          <AdminItemTable
            groupedItems={groupedItems}
            currentSection={currentSection}
            handleDelete={handleDelete}
            setIdEditing={setIdEditing}
            setTitle={setTitle}
            setContent={setContent}
            setExtra={setExtra}
            setDate={setDate}
            setCategory={setCategory}
            setSectionId={setSectionId}
          />
        </>
      )}
    </main>
  );
}
