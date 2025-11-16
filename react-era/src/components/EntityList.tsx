import React from "react";
import { EntityCard } from "./EntityCard";

export function EntityList<T>({
  schema,
  entities,
}: {
  schema: any;
  entities: T[];
}) {
  return (
    <div className="grid">
      {entities.map((e, i) => (
        <EntityCard key={i} schema={schema} entity={e} />
      ))}
    </div>
  );
}
