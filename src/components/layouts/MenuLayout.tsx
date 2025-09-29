"use client";

function formatPrice(extra?: string | null) {
  if (!extra) return "";
  if (extra.includes("€")) return extra;
  return `${extra} €`;
}

export default function MenuLayout({ items }: { items: any[] }) {
  const grouped = items.reduce((acc: Record<string, any[]>, item) => {
    const cat = item.category?.trim() || "Divers";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto space-y-12 px-4">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 flex items-center justify-center gap-2">
            {/* ✅ L’admin peut mettre l’emoji directement dans category */}
            <span>{category}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md p-4 md:p-6 hover:shadow-xl hover:scale-[1.01] transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-base md:text-lg font-semibold text-gray-900">
                      {item.title}
                    </p>
                    {item.content && (
                      <p className="text-sm text-gray-600 mt-1">
                        {item.content}
                      </p>
                    )}
                  </div>
                  {item.extra && (
                    <span className="text-base md:text-lg font-bold text-green-700 bg-white rounded-full px-2 md:px-3 py-1 shadow">
                      {formatPrice(item.extra)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
