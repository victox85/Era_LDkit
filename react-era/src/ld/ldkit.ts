import type { Options } from "ldkit";

// SPARQL fetch forzado compatible con LDKit
export async function sparqlFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  const url = typeof input === "string" ? input : input.toString();
  const query = (init?.body || "").toString();

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "quads", // endpoint acepta quads
    },
    body: query.startsWith("query=")
      ? query
      : `query=${encodeURIComponent(query)}`,
  });
}

// Opciones LDKit
export const ldOptions: Options = {
  sources: ["https://data-interop.era.europa.eu/api/sparql"],
  fetch: sparqlFetch,
};
