import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">ERA LDKit Explorer</h1>
      <p>Selecciona un esquema para explorar:</p>
      <ul className="mt-4">
        <li className="mb-2">
          <Link to="/tunnels" className="text-blue-600 hover:underline">Túneles</Link>
        </li>
        <li className="mb-2">
          <Link to="/tracks" className="text-blue-600 hover:underline">Vías</Link>
        </li>
        <li className="mb-2">
          <Link to="/SectionOfLine" className="text-blue-600 hover:underline">SectionOfLine Elements</Link>
        </li>
        <li className="mb-2">
          <Link to="/contact-lines" className="text-blue-600 hover:underline">Contact Line Systems</Link>
        </li>
          <li className="mb-2">
          <Link to="/sandbox" className="text-blue-600 hover:underline">Sandbox</Link>
        </li>
      </ul>
    </div>
  );
}
