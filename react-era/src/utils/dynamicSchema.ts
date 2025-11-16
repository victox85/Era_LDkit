import { rdfs, xsd } from "ldkit/namespaces";
import { era } from "../ld/namespaces";

export function createDynamicSchema(selectedProps: string[]) {
  const schema: any = {
    "@type": era.Tunnel,
    label: rdfs.label,
  };

  selectedProps.forEach((prop) => {
    schema[prop] = { "@id": era[prop] ?? `http://data.europa.eu/949/${prop}` };
  });

  return schema;
}

