import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactLineSystems } from "../ld/lenses";
import {normalizeSchemaData} from "../ld/ldutils"
import DataTable from "../components/DataTable";


export default function ContactLineList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ContactLineSystems.find().then(data => {
      const mapped = data.map(c => {
        const n = normalizeSchemaData(c);

        return {
          name: n.label,
          type: n.contactLineSystemType,
          energy: n.energySupplySystem,
        };
      });

      setRows(mapped);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando Contact Line Systems...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Line Systems</h1>

      <DataTable
        columns={[
          { key: "name", label: "Nombre" },
          { key: "type", label: "Tipo" },
          { key: "energy", label: "Energía" },
        ]}
        data={rows}
      />
    </div>
  );
}