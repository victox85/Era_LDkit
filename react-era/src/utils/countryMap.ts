
export function getIriLabel(iri?: string) {
  if (!iri) return "";
  if (!iri.includes("/")) return iri;
  return iri.split("/").pop() ?? iri;
}
export const countryMap: Record<string, string> = {
  "SWE": "Suecia",
  "DEU": "Alemania",
  "NLD": "Países Bajos",
  "HRV": "Croacia",
  "ROU": "Romania",
  "PRT": "Portugal",
  "POL": "Polonia",
  "NOR": "Noruega",
  "FRA": "Francia",
};

export function getCountryName(iri: string) {
    const match = iri.match(/\/([^\/]+)$/);
    const value = match ? match[1] : iri;
  return countryMap[value] ?? value; // si no está, devuelve la IRI
}
