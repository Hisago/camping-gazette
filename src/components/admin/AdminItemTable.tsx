"use client";

export default function AdminItemTable({
  groupedItems,
  currentSection,
  handleDelete,
  setIdEditing,
  setTitle,
  setContent,
  setExtra,
  setDate,
  setCategory,
  setSectionId,
}: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-8">
      <h2 className="text-lg font-semibold text-gray-800">📋 Contenus existants</h2>

      {Object.entries(groupedItems as Record<string, any[]>).map(([cat, group]) => (
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
          {group.map((i: any, idx: number) => (
            <tr key={i.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
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
  );
}
