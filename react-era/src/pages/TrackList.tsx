import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tracks } from "../ld/lenses";
import {normalizeSchemaData} from "../ld/ldutils"
import DataTable from "../components/DataTable";


export default function TrackList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(Tracks.find());
    Tracks.find().then(data => {
      const mapped = data.map(t => {
        const n = normalizeSchemaData(t);
        
        return {
          name: n.label,
          gauge: n.wheelSetGauge,
          profile: n.gaugingProfile,
          speed: n.maximumPermittedSpeed,
          country: n.trackOfSection?.inCountry || "N/A",
        };
      });

      setRows(mapped);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Cargando vías...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tracks</h1>

      <DataTable
        columns={[
          { key: "name", label: "Nombre" },
          { key: "gauge", label: "Gauge" },
          { key: "Country", label: "Pais" },
          { key: "profile", label: "Gauging" },
          { key: "speed", label: "Velocidad máx." },
          
        ]}
        data={rows}
      />
    </div>
  );
}

