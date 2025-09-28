export default function ListLayout({ items }: { items: any[] }) {
  // Tri par date décroissante
  const sorted = [...items].sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {sorted.map((item) => (
        <article
          key={item.id}
          className="bg-gradient-to-r from-green-50 to-green-100 shadow-sm rounded-xl p-6 hover:shadow-md transition"
        >
          <h3 className="text-xl font-bold text-green-800">{item.title}</h3>
          {item.date && (
            <p className="text-sm text-gray-500">
              📅{" "}
              {new Date(item.date).toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          )}
          {item.content && (
            <p className="text-gray-700 mt-2 leading-relaxed">{item.content}</p>
          )}
        </article>
      ))}
    </div>
  );
}
