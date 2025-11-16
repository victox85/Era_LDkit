import { useState } from "react";

export default function DataTable({
  columns,
  data,
}: {
  columns: { key: string; label: string }[];
  data: any[];
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function sortData(rows: any[]) {
    if (!sortKey) return rows;

    return [...rows].sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];

      // --- Números ---
      if (!isNaN(Number(va)) && !isNaN(Number(vb))) {
        return sortDir === "asc"
          ? Number(va) - Number(vb)
          : Number(vb) - Number(va);
      }

      // --- Texto ---
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }

  function handleSort(key: string) {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = sortData(data);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100 border-b">
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="px-4 py-2 text-left font-semibold text-gray-700 border-r cursor-pointer select-none"
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1">
                    {sortDir === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.map((row: any, i: number) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition">
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
