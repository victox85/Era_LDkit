import { Link } from "react-router-dom";
import { Database, Cable, Route, Zap, Layers } from "lucide-react";

export default function Home() {
  const sections = [
    {
      title: "Túneles",
      description: "Infraestructura de túneles ferroviarios",
      icon: Layers,
      path: "/tunnels",
    },
    {
      title: "Secciones de Línea",
      description: "Elementos de la red ferroviaria",
      icon: Route,
      path: "/SectionOfLine",
    },
    {
      title: "Sistemas de Electrificación",
      description: "Electrificación y elementos de contacto",
      icon: Zap,
      path: "/contact-lines",
    },
    {
      title: "Vías",
      description: "Información detallada de las vías",
      icon: Cable,
      path: "/tracks",
    },
    {
      title: "Sandbox",
      description: "Experimenta con queries y schemas LDkit",
      icon: Database,
      path: "/sandbox",
    },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-10">
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-6">
          ERA Knowledge Graph Explorer
        </h1>

        {/* Grid centrado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {sections.map((s) => (
            <Link
              key={s.title}
              to={s.path}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200 hover:border-blue-300 flex items-center gap-4 max-w-sm mx-auto"
            >
              <s.icon className="w-12 h-12 text-blue-600" />
              <div>
                <h2 className="text-2xl font-semibold">{s.title}</h2>
                <p className="text-gray-500">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

