"use client";

import { Item } from "@/types";

type Props = {
  items: Item[];
};

// utilitaire pour mettre une majuscule au début
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function ActivitiesLayout({ items }: Props) {
  const grouped = items.reduce((acc: Record<string, Item[]>, item) => {
    if (!item.date) return acc;
    const d = new Date(item.date);
    const key = d.toISOString().split("T")[0];
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-10">
      {sortedDates.map((dateStr) => {
        const date = new Date(dateStr);
        const formatted = capitalize(
          date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        );

        return (
          <div key={dateStr}>
            {/* Titre jour */}
            <h2 className="text-xl md:text-2xl font-bold text-green-800 mb-6 border-b border-green-200 pb-2 flex items-center gap-2">
              <span role="img" aria-label="calendar">
                📅
              </span>
              {formatted}
            </h2>

            {/* Liste activités */}
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
                    className="bg-gradient-to-r from-green-50 to-green-100 shadow-sm rounded-xl p-6 hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h3>
                      {timeStr && (
                        <span className="text-green-700 font-bold text-sm bg-white px-2 py-0.5 rounded-lg shadow-sm">
                          {timeStr}
                        </span>
                      )}
                    </div>

                    {item.extra && (
                      <p className="text-sm text-gray-700 mb-1">📍 {item.extra}</p>
                    )}
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
