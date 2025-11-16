export function buildDynamicConstruct(classIri: string, props: string[]) {
  let construct = "";
  let where = "";

  construct += `  ?s a <${classIri}>;\n`;

  props.forEach(p => {
    const iri = `http://data.europa.eu/949/${p}`;
    construct += `     <${iri}> ?${p};\n`;
    where += `  OPTIONAL { ?s <${iri}> ?${p} }\n`;
  });

  construct = construct.trim().replace(/;$/, ".");
  
  return `
CONSTRUCT {
${construct}
}
WHERE {
  ?s a <${classIri}>.
${where}
}
`;
}
