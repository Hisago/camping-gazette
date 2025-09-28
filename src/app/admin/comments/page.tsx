"use client";

import { useEffect, useState } from "react";

type Comment = {
  id: number;
  author: string;
  message: string;
  date: string;
};

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const loadComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleAdd = async () => {
    if (!author.trim() || !message.trim()) return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, message }),
    });
    setAuthor("");
    setMessage("");
    await loadComments();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce commentaire ?")) return;
    await fetch(`/api/comments/${id}`, { method: "DELETE" });
    await loadComments();
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">💬 Commentaires pour des améliorations</h1>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">➕ Ajouter un commentaire</h2>
        <input
          type="text"
          placeholder="Votre nom"
          className="border px-3 py-2 rounded w-full mb-2"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Votre message"
          className="border px-3 py-2 rounded w-full mb-2"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Ajouter
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">📋 Liste des commentaires</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">Aucun commentaire</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c.id}
                className="border p-3 rounded flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{c.author}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(c.date).toLocaleString("fr-FR")}
                  </p>
                  <p className="mt-1">{c.message}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
