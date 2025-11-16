import React from "react";

interface Props<T> {
  schema: any;
  entity: T;
}

export function EntityCard<T>({ schema, entity }: Props<T>) {
  const keys = Object.keys(schema).filter(k => !k.startsWith("@"));

  return (
    <article className="card">
      <h3>{(entity as any).label ?? "Sin label"}</h3>
      <dl>
        {keys.map(key => {
          const def = schema[key];
          let value: any;

          if (typeof def === "string") {
            value = (entity as any)[key];
          } else if (def["@id"]) {
            const short = shortIri(def["@id"]);
            value = (entity as any)[key] ?? (entity as any)[short];
          }

          if (value === undefined) return null;

          return (
            <div key={key}>
              <dt><strong>{key}</strong></dt>
              <dd>{String(value)}</dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

function shortIri(iri: string) {
  const m = iri.match(/[#\/]([^#\/]+)$/);
  return m ? m[1] : iri;
}
