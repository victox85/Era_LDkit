import { getIriLabel } from "../utils/countryMap";
import { getCountryName } from "../utils/countryMap";
// Tipo mínimo de un frame JSON-LD
export type JsonLdFrame = Record<string, any>;





export function normalizeSchemaData(obj: any) {
  const normalized: any = {};

  Object.keys(obj).forEach(key => {
    const value = obj[key];

    if (value == null) {
      normalized[key] = "";
      return;
    }

    // Números
    if (!isNaN(Number(value))) {
      normalized[key] = Number(value);
      return;
    }

    // IRIs → último segmento
    if (typeof value === "string" && value.startsWith("http")) {
      const short = getIriLabel(value);

      // Si es país, devuelve el nombre
      if (key.toLowerCase().includes("country")) {
        normalized[key] = getCountryName(short);
      } else {
        normalized[key] = short;
      }

      return;
    }

    // Arrays (lista de IRIs o valores)
    if (Array.isArray(value)) {
      normalized[key] = value.map(v => {
        if (typeof v === "string" && v.startsWith("http")) {
          return getIriLabel(v);
        }
        return v;
      });
      return;
    }

    // Default
    normalized[key] = value;
  });

  return normalized;
}


