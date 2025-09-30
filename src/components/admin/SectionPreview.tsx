"use client";

export default function SectionPreview({ type }: { type: string }) {
  if (type === "activities") {
    return (
      <div className="space-y-6 text-sm">
        <div>
          <h2 className="text-base font-bold text-green-800 mb-3 border-b border-green-200 pb-1 flex items-center gap-2">
            📅 Samedi 5 octobre
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">
                  🎤 Soirée karaoké
                </h3>
                <span className="text-green-700 font-bold text-xs bg-white px-2 py-0.5 rounded shadow">
                  20:00
                </span>
              </div>
              <p className="text-xs text-gray-600">📍 Salle commune</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">
                  🏐 Tournoi volley
                </h3>
                <span className="text-green-700 font-bold text-xs bg-white px-2 py-0.5 rounded shadow">
                  15:00
                </span>
              </div>
              <p className="text-xs text-gray-600">📍 Plage</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "cards") {
    return (
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm">🏕️ Camping</h3>
          <p className="text-xs text-gray-600">Emplacements ombragés</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm">🚲 Location vélo</h3>
          <p className="text-xs text-gray-600">VTT & électriques</p>
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-3 text-sm">
        <article className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
          <h3 className="font-bold text-green-800 text-sm">
            📰 Gazette – Lundi
          </h3>
          <p className="text-xs text-gray-500">📅 30 septembre</p>
        </article>
        <article className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm">
          <h3 className="font-bold text-green-800 text-sm">
            📰 Gazette – Mardi
          </h3>
          <p className="text-xs text-gray-500">📅 1 octobre</p>
        </article>
      </div>
    );
  }

  if (type === "menu") {
    return (
      <div className="space-y-4 text-sm">
        <h2 className="text-base font-bold text-center mb-2">🍕 Snack</h2>
        <div className="grid grid-cols-1 gap-2">
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm flex justify-between">
            <span className="font-medium">Pizza 4 fromages</span>
            <span className="text-green-700 font-bold text-sm">9€</span>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-sm flex justify-between">
            <span className="font-medium">Soda 33cl</span>
            <span className="text-green-700 font-bold text-sm">2€</span>
          </div>
        </div>
      </div>
    );
  }

  return <p className="text-gray-500 text-sm">Choisissez un type de section</p>;
}
