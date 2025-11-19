import { useEffect, useState } from "react";
import { Tunnels } from "../ld/lenses";
import DataTable from "../components/DataTable";
import { normalizeSchemaData } from "../ld/ldutils";

export default function TunnelList() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchProp, setSearchProp] = useState<"label" | "inCountry" | "length">("label");
  const [searchValue, setSearchValue] = useState("");

  // Función para cargar los túneles
  const loadTunnels = async (prop?: string, value?: string) => {
    setLoading(true);
    let data;
    try {
      if (prop && value) {
        // Filtrado dinámico usando find({ where })
        const filter: any = {};

        if (prop === "length") {

          filter[prop] = { length: { $gte:  value }}; // Si es número
        } else if (prop === "inCountry"){
          filter[prop] = { inCountry: { $contains: value }}; // Si es texto
        }else{

          filter[prop] = { $contains: value }; // Si es texto
        }
        console.log(filter);
        data = await Tunnels.find({ where: filter },);
      } else {
        data = await Tunnels.find();
      }

      const mapped = data.map(t => {
        const n = normalizeSchemaData(t);
        return {
          name: n.label,
          country: n.inCountry,
          length: n.length,
          hasEmergencyPlan: n.hasEmergencyPlan,
          dieselThermalAllowed: n.dieselThermalAllowed,
        };
      });

      setRows(mapped);
    } catch (err) {
      console.error("Error cargando túneles:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTunnels();
  }, []);

  const handleSearch = () => {
    loadTunnels(searchProp, searchValue);
  };

  if (loading) return <p>Cargando túneles...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Túneles</h1>

      {/* Buscador */}
      <div className="mb-4 flex gap-2">
        <select
          value={searchProp}
          onChange={e => setSearchProp(e.target.value as any)}
          className="border p-1 rounded"
        >
          <option value="label">Nombre</option>
          <option value="inCountry">País</option>
          <option value="length">Longitud</option>
        </select>

        <input
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Buscar..."
          className="border p-1 rounded flex-1"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Buscar
        </button>
      </div>

      {/* Tabla */}
      <DataTable
        columns={[
          { key: "name", label: "Nombre" },
          { key: "country", label: "País" },
          { key: "length", label: "Longitud (m)" },
          { key: "hasEmergencyPlan", label: "has Emergency Plan" },
          { key: "dieselThermalAllowed", label: "diesel Thermal Allowed" },
        ]}
        data={rows}
      />
    </div>
  );
}



