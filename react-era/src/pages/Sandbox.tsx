import { useState, useEffect } from "react";
import { createDynamicSchema } from "../utils/dynamicSchema";
import { createLens  } from "ldkit";
import {  CONSTRUCT } from "ldkit/sparql";
import { ldOptions } from "../ld/ldkit";
import {  rdfs } from "ldkit/namespaces";
import { era } from "../ld/namespaces";
import { ldkit } from "ldkit/namespaces";
function splitIntoColumns<T>(array: T[], columns: number): T[][] {
  const result: T[][] = Array.from({ length: columns }, () => []);
  array.forEach((item, index) => {
    result[index % columns].push(item);
  });
  return result;
}
export default function Sandbox() {
  const [loadingProps, setLoadingProps] = useState(true);
  const [props, setProps] = useState<string[]>([]);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);
  const [queryText, setQueryText] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [running, setRunning] = useState(false);


  useEffect(() => {
    async function fetchProps() {
      const endpoint = "https://data-interop.era.europa.eu/api/sparql";
      const query = `
        SELECT DISTINCT ?p WHERE {
          ?s a <${era.Tunnel}>; ?p ?o.
        } LIMIT 200
      `;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/sparql-results+json",
        },
        body: "query=" + encodeURIComponent(query),
      });
      const json = await res.json();
      const properties = json.results.bindings.map((b: any) =>
        b.p.value.replace("http://data.europa.eu/949/", "")
      );
      setProps(properties.sort());
      setLoadingProps(false);
    }

    fetchProps();
  }, []);


  const dynSchema = createDynamicSchema(selectedProps);
  const DynamicTunnel = createLens(dynSchema, ldOptions);


  function evalConstruct(code: string) {
  const func = new Function("CONSTRUCT", "era", "rdfs", "ldkit", `return ${code}`);
  return func(CONSTRUCT, era, rdfs, ldkit);
  }


  async function runQuery() {
    setRunning(true);
    setResults([]);

    try {
      let r;
      if (queryText && queryText.trim() !== "") {

        const query = evalConstruct(queryText);
        r = await DynamicTunnel.query(query);
      } else {

        r = await DynamicTunnel.find();
      }
      setResults(r);
    } catch (err) {
      console.error(err);
      alert("Error ejecutando query: " + err);
    }

    setRunning(false);
  }

  const columns = splitIntoColumns(props, 2);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Sandbox dinámico de Tunnel</h1>

      {loadingProps && <p>Cargando propiedades...</p>}

      {!loadingProps && (
        <div className="grid grid-cols-3 gap-4">
          {/* Columna de selección de propiedades en varias columnas visuales */}
          <div className="col-span-1 border p-4 h-[85vh] overflow-auto">
            <h2 className="text-xl mb-4 font-bold">Propiedades disponibles</h2>
            <div className="flex gap-4">
              {columns.map((colProps, colIndex) => (
                <div key={colIndex} className="flex-1 space-y-1">
                  {colProps.map((p) => (
                    <label key={p} className="block">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedProps.includes(p)}
                        onChange={() =>
                          setSelectedProps((s) =>
                            s.includes(p) ? s.filter((x) => x !== p) : [...s, p]
                          )
                        }
                      />
                      {p}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2 border p-4">
            <h2 className="text-xl mb-2 font-bold">
              SPARQL CONSTRUCT (opcional)
            </h2>
            <textarea
              className="w-full h-64 border p-2 font-mono"
              value={queryText || ""}
              onChange={(e) =>
                setQueryText(e.target.value.trim() || null)
              }
              placeholder="Pega aquí tu CONSTRUCT (opcional)..."
            />

            <button
              disabled={running}
              onClick={runQuery}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Ejecutar
            </button>

            <h2 className="text-xl mt-6 font-bold">Resultados</h2>
            <pre className="bg-gray-100 p-3 h-80 overflow-auto mt-2">
              {JSON.stringify(results, null, 2)}
            </pre>

            <h2 className="text-xl mt-6 font-bold">Schema dinámico</h2>
            <pre className="bg-gray-100 p-3 h-80 overflow-auto mt-2">
              {JSON.stringify(dynSchema, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
