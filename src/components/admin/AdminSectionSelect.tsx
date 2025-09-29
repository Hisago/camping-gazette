"use client";

type Section = { id: number; name: string; slug: string; type: string };

export default function AdminSectionSelect({
  sections,
  sectionId,
  setSectionId,
}: {
  sections: Section[];
  sectionId: number | null;
  setSectionId: (id: number | null) => void;
}) {
  return (
    <div className="mb-6">
      <label className="block font-semibold mb-1">📂 Choisir une section</label>
      <select
        className="border px-3 py-2 rounded w-full"
        value={sectionId ?? ""}
        onChange={(e) => setSectionId(Number(e.target.value))}
      >
        <option value="">-- Sélectionner --</option>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.type})
          </option>
        ))}
      </select>
    </div>
  );
}
