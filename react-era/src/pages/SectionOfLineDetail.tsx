import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SectionOfLines } from "../ld/lenses";
import type { SectionOfLine } from "../ld/lenses";
import { getCountryName } from "../utils/countryMap";
import {normalizeSchemaData} from "../ld/ldutils"

export default function SectionOfLineDetail() {
  const { iri } = useParams<{ iri: string }>();
  const [section, setSection] = useState<SectionOfLine | null>(null);

  useEffect(() => {
    async function load() {
      if (!iri) return;
      const s = await SectionOfLines.findByIri(decodeURIComponent(iri));
      setSection(s ?? null);
    }
    load();
  }, [iri]);

  if (!section) return <p className="p-8">Cargando sección de línea...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{section.label}</h1>
      <p><strong>País:</strong> {getCountryName(section.inCountry ?? "")}</p>
      <p><strong>Longitud:</strong> {section.length ?? "-"} m</p>
      <p><strong>Track:</strong> {section.track ?? "-"}</p>
      <p><strong>IRI:</strong> {section.$id}</p>
      <Link to="/sections" className="text-blue-600 hover:underline mt-4 inline-block">← Volver a la lista</Link>
    </div>
  );
}
