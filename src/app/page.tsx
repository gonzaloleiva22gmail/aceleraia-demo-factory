import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

const demos = [
  { id: 'sonrisa-lima', name: 'Clínica Sonrisa Lima', color: '#0ea5e9', type: 'Clínica Dental' },
  { id: 'lumina-lima', name: 'Lumina Estética & Spa', color: '#d946ef', type: 'Estética y Bienestar' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full mx-auto text-center">
        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold">AceleraIA</span>
          <span className="text-lg text-gray-500 font-normal">Demo Factory</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Live Demo Previews
        </h1>
        <p className="text-gray-400 text-lg mb-14 max-w-xl mx-auto">
          Each demo is a fully branded, AI-powered landing page customized to a specific client.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {demos.map((demo) => (
            <Link
              key={demo.id}
              href={`/demo/${demo.id}`}
              className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 h-1 w-full rounded-t-2xl"
                style={{ backgroundColor: demo.color }}
              />
              <div
                className="w-11 h-11 rounded-xl mb-4 flex items-center justify-center text-xl font-bold text-white"
                style={{ backgroundColor: demo.color }}
              >
                {demo.name.charAt(0)}
              </div>
              <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: demo.color }}>
                {demo.type}
              </p>
              <h2 className="text-lg font-semibold text-white mb-2">{demo.name}</h2>
              <div
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors group-hover:gap-2"
                style={{ color: demo.color }}
              >
                Ver demo <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-16 text-gray-600 text-sm">
          Powered by <span className="text-gray-400 font-semibold">AceleraIA</span> · Built with Next.js & Gemini 1.5 Flash
        </p>
      </div>
    </div>
  );
}
