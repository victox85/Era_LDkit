import { QueryEngine , createLens, type Options } from "ldkit";
import {era, TunnelSchema} from "./Support.ts"
import {  rdfs } from "ldkit/namespaces";
import { CONSTRUCT } from "ldkit/sparql";
import { ldkit } from "ldkit/namespaces";
import { DataFactory } from "ldkit/rdf";








async function sparqlFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input.toString();
  const query = (init?.body || "").toString();

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "text/turtle",
    },
    body: query.startsWith("query=")
      ? query
      : `query=${encodeURIComponent(query)}`,
  });
}

// --- Configuración de LDkit ---
const options: Options = {
  sources: ["https://data-interop.era.europa.eu/api/sparql"],
  fetch: sparqlFetch, 
};

// --- Lens ---
const Tunnels = createLens(TunnelSchema, options);



const dataFactory = new DataFactory();
const n = (value: string) => dataFactory.namedNode(value);


const query = CONSTRUCT`
  ?s a <${ldkit.Resource}>;
     a <${era.Tunnel}>;
     <${rdfs.label}> ?label;
     <${era.inCountry}> ?inCountry;
     <${era.lengthOfTunnel}> ?length
`
.WHERE`
  ?s a <${era.Tunnel}>;
     <${rdfs.label}> ?label;
     <${era.inCountry}> ?inCountry;
     <${era.lengthOfTunnel}> ?length.
  FILTER(?length > 1000)
`
.build();


const results = await Tunnels.query(query);

  console.log(` Resultados (${results.length} filas):`);
for (const t of results) {
  console.log(` Label: ${t.label}, Longitud: ${t.length}`);
}

