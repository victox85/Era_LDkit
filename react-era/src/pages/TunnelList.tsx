import { useEffect, useState } from "react";

import { Tunnels } from "../ld/lenses";
import DataTable from "../components/DataTable";
import { normalizeSchemaData } from "../ld/ldutils";



export default function TunnelList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Tunnels.find().then(data => {
      const mapped = data.map(t => {
        const n = normalizeSchemaData(t);

        return {
          name: n.label,
          country: n.inCountry,
          length: n.length,
        };
      });

      setRows(mapped);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando túneles...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Túneles</h1>

      <DataTable
        columns={[
          { key: "name", label: "Nombre" },
          { key: "country", label: "País" },
          { key: "length", label: "Longitud (m)" },
        ]}
        data={rows}
      />
    </div>
  );
}


