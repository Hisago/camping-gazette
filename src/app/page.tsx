import Link from "next/link";

export default function HomePage() {
  return (
    <main className="p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        🏕️ Gazette du Camping - Les Ombrages
      </h1>
      <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto text-sm md:text-base">
        Bienvenue au camping ! Consultez les activités, le menu du snack et la
        gazette du jour 📖
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Link
          href="/activities"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-green-600 mb-3">
            🎉 Activités
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Découvrez toutes les activités proposées au camping : sport, loisirs,
            animations...
          </p>
        </Link>

        <Link
          href="/snack"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-yellow-600 mb-3">
            🍕 Snack
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Consultez le menu du snack : plats, desserts, boissons fraîches.
          </p>
        </Link>

        <Link
          href="/gazette"
          className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-3">
            📰 Gazette
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Lisez la gazette quotidienne avec toutes les infos du camping.
          </p>
        </Link>
      </div>
    </main>
  );
}
