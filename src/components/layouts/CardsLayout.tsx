export default function CardsLayout({ items }: { items: any[] }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-md p-4 md:p-6 flex flex-col justify-between hover:shadow-xl hover:scale-[1.01] transition"
        >
          <div>
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            {item.content && (
              <p className="text-sm text-gray-700 mt-2">{item.content}</p>
            )}
          </div>
          {item.extra && (
            <div className="mt-4 text-right">
              <span className="text-green-700 font-bold text-base md:text-lg">
                {item.extra}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
