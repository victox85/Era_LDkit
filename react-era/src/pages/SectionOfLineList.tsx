import { useEffect, useState } from "react";
import { SectionOfLines } from "../ld/lenses";
import {normalizeSchemaData} from "../ld/ldutils"
import DataTable from "../components/DataTable";
import { getCountryName } from "../utils/countryMap";

export default function SectionOfLineList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SectionOfLines.find().then(data => {
      const mapped = data.map(s => {
        const n = normalizeSchemaData(s);

        return {
          name: n.label,
          country: n.inCountry,
          length: n.length,
          track: n.track,

        };
      });

      setRows(mapped);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando Sections of Line...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Secciones de Línea</h1>

      <DataTable
        columns={[
          { key: "name", label: "Nombre" },
          { key: "country", label: "País" },
          { key: "length", label: "Longitud" },
          { key: "track", label: "Track" },
        ]}
        data={rows}
      />
    </div>
  );
}