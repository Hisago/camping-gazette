"use client";

type Item = {
  id: number;
  title: string;
  content?: string;
  date?: string; // ex: "2025-07-22T18:00:00Z"
  extra?: string; // lieu
};

type Props = {
  items: Item[];
};

export default function ActivitiesLayout({ items }: Props) {
  // Regrouper par jour
  const grouped = items.reduce((acc: Record<string, Item[]>, item) => {
    if (!item.date) return acc;
    const d = new Date(item.date);
    const key = d.toISOString().split("T")[0]; // yyyy-mm-dd
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Trier les dates (chronologique)
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-10">
      {sortedDates.map((dateStr) => {
        const date = new Date(dateStr);
        const formatted = date.toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        return (
          <div key={dateStr}>
            {/* Date en gros */}
            <h2 className="text-2xl font-bold text-green-800 mb-6 border-b pb-2">
              📅 {formatted}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {grouped[dateStr].map((item) => {
                const d = item.date ? new Date(item.date) : null;
                const timeStr = d
                  ? d.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : null;

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-green-200 rounded-xl p-5 shadow hover:shadow-md transition"
                  >
                    {/* Titre + heure bien visible */}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h3>
                      {timeStr && (
                        <span className="text-green-700 font-bold text-sm">
                          {timeStr}
                        </span>
                      )}
                    </div>

                    {/* Lieu */}
                    {item.extra && (
                      <p className="text-sm text-gray-500 mb-1">📍 {item.extra}</p>
                    )}

                    {/* Description */}
                    {item.content && (
                      <p className="text-sm text-gray-600">{item.content}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
