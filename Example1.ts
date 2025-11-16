import { QueryEngine , createLens, type Options } from "ldkit";

import {TunnelSchema} from "./Support.ts"





// --- Configuración del engine ---
async function sparqlFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const url = typeof input === "string" ? input : input.toString();
  const query = (init?.body || "").toString();

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "quads",
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

// --- Consulta ---
const tunnels = await Tunnels.find();

for (const t of tunnels) {
  console.log(t.label, t.inCountry, t.length);
}


const iri = "http://data.europa.eu/949/functionalInfrastructure/tunnels/06bf378dee8663d57de02e872e543a68d88baed8"; 

const tunnel = await Tunnels.findByIri(iri);
if (tunnel) {
  console.log("Nombre:", tunnel.label);
  console.log("País:", tunnel.inCountry);
  console.log("Longitud:", tunnel.length);
} else {
  console.log("Túnel no encontrado");
}
