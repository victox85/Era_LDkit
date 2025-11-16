import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Tracks } from "../ld/lenses";
import type{Track } from "../ld/lenses";

export default function TunnelDetail() {
  const { iri } = useParams<{ iri: string }>();
  const [track, setTunnel] = useState<Track | null>(null);

  useEffect(() => {
    async function load() {
      if (!iri) return;
      const t = await Tracks.findByIri(decodeURIComponent(iri));
      setTunnel(t ?? null);
    }
    load();
  }, [iri]);

  if (!track) return <p className="p-8">Cargando túnel…</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">{track.label}</h1>
        <p><strong>WheelSet Gauge:</strong> {track.wheelSetGauge ?? "-"}</p>
        <p><strong>Gauging Profile:</strong> {track.gaugingProfile ?? "-"}</p>
        <p><strong>Rail Inclination:</strong> {track.railInclination ?? "-"}</p>
        <p><strong>Max Permitted Speed:</strong> {track.maximumPermittedSpeed ?? "-"}</p>

      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">← Volver a Home</Link>
    </div>
  );
}
