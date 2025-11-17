# Web React con Schemas de ERA y Sandbox dinámico

Este proyecto es una **página web simple desarrollada en React** que interactúa con los datos de ERA usando LDkit.  

### Funcionalidades:

- Implementación de varios **schemas** (Tunnel, Track, SectionOfLine, ContactLineSystem, etc.) para obtener información específica desde el endpoint SPARQL de ERA.
- Visualización de datos en listas y detalles de cada elemento, incluyendo normalización de nombres de país y otros atributos.
- **Mini Sandbox dinámico**:
  - Permite seleccionar propiedades de la clase `Tunnel` de manera interactiva.
  - Genera consultas `CONSTRUCT` dinámicas sobre los atributos seleccionados.
  - Ejecuta consultas manuales para obtener exactamente la información que se desea mostrar.

Este proyecto sirve como demostración de cómo combinar **React**, **LDkit** y **datos abiertos europeos** para explorar y consultar knowledge graphs de manera interactiva.

