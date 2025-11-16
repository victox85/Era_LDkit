import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tunnels } from "../ld/lenses";
import type {Tunnel } from "../ld/lenses";

import { getCountryName } from "../utils/countryMap";


export default function TunnelDetail() {
  const { iri } = useParams<{ iri: string }>();
  const [tunnel, setTunnel] = useState<Tunnel | null>(null);

  useEffect(() => {
    async function load() {
      if (!iri) return;
      const t = await Tunnels.findByIri(decodeURIComponent(iri));
      setTunnel(t ?? null);
    }
    load();
  }, [iri]);

  if (!tunnel) return <p className="p-8">Cargando túnel…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{tunnel.label}</h1>
      <p><strong>País:</strong> {getCountryName(tunnel.inCountry ?? "")}</p>
      <p><strong>Longitud:</strong> {tunnel.length ?? "-"} m</p>
      <p><strong>IRI:</strong> {tunnel.$id}</p>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">← Volver a Home</Link>
    </div>
  );
}

