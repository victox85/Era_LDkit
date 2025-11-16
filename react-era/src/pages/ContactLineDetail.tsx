import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ContactLineSystems } from "../ld/lenses";
import type { ContactLineSystem } from "../ld/lenses";


export default function ContactLineDetail() {
  const { iri } = useParams<{ iri: string }>();
  const [system, setSystem] = useState<ContactLineSystem | null>(null);

  useEffect(() => {
    async function load() {
      if (!iri) return;
      const s = await ContactLineSystems.findByIri(decodeURIComponent(iri));
      setSystem(s ?? null);
    }
    load();
  }, [iri]);

  if (!system) return <p className="p-8">Cargando sistema de catenaria...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{system.label}</h1>
      <p><strong>Tipo:</strong> {system.contactLineSystemType ?? "-"}</p>
      <p><strong>Sistema de energía:</strong> {system.energySupplySystem ?? "-"}</p>
      <p><strong>IRI:</strong> {system.$id}</p>
      <Link to="/contact-lines" className="text-blue-600 hover:underline mt-4 inline-block">← Volver a la lista</Link>
    </div>
  );
}
