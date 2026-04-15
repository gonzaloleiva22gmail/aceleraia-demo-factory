import { notFound } from 'next/navigation';
import { getLeadData } from '@/lib/leads';
import ChatWidget from '@/components/ChatWidget';
import { CheckCircle, Shield, Sparkles, Smile, Star, Heart, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

const FALLBACK_COLOR = '#333b50';

// Map string icon names from JSON to actual Lucide components
const iconMap: Record<string, React.ElementType> = {
  CheckCircle,
  Shield,
  Sparkles,
  Smile,
  Star,
  Heart,
  Phone,
  Mail,
  MapPin,
};

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const lead = getLeadData(params.id);
  if (!lead) return { title: 'Demo Not Found' };
  return {
    title: `${lead.name} — Powered by AceleraIA`,
    description: lead.heroSubtitle,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const lead = getLeadData(params.id);

  if (!lead) {
    notFound();
  }

  const primary = lead.primaryColor || FALLBACK_COLOR;
  const secondary = lead.secondaryColor || adjustColorServer(primary, -30);

  return (
    <>
      <style>{`
        :root {
          --brand-primary: ${primary};
          --brand-secondary: ${secondary};
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
          color: white;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .hero-gradient {
          background: linear-gradient(135deg, ${primary}18 0%, ${secondary}10 50%, transparent 100%);
        }
        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-delay-100 { animation-delay: 0.1s; opacity: 0; }
        .animate-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-delay-300 { animation-delay: 0.3s; opacity: 0; }
        .animate-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animate-delay-500 { animation-delay: 0.5s; opacity: 0; }
      `}</style>

      <div className="min-h-screen bg-white font-sans">
        {/* ─── Navbar ─── */}
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: primary }}
              >
                <span className="text-white font-bold text-sm">{lead.name.charAt(0)}</span>
              </div>
              <span className="font-semibold text-gray-800 text-sm">{lead.name}</span>
            </div>
            <a
              href="#contact"
              className="btn-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5"
            >
              Contáctanos <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

        {/* ─── Hero Section ─── */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden hero-gradient">
          {/* Decorative blobs */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: primary }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: secondary }}
          />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium mb-8 animate-fade-in-up animate-delay-100"
              style={{ borderColor: primary + '40', color: primary, backgroundColor: primary + '10' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {lead.tagline}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 animate-fade-in-up animate-delay-200"
            >
              {lead.heroTitle.split(lead.name).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span style={{ color: primary }}>
                      {lead.name}
                    </span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-300">
              {lead.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-400">
              <a
                href="#contact"
                className="btn-primary px-8 py-3.5 rounded-full text-base font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                {lead.ctaText}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-full text-base font-semibold border-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                style={{ borderColor: primary + '60' }}
              >
                Ver más información
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in-up animate-delay-500">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 de nuestros pacientes</span>
              </div>
              <div className="w-px h-4 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: primary }} />
                <span>+500 clientes satisfechos</span>
              </div>
              <div className="w-px h-4 bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: primary }} />
                <span>Garantía de calidad</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="services" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Ofrecemos soluciones de alto estándar, diseñadas para brindarte los mejores resultados.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {lead.features.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || Sparkles;
                return (
                  <div
                    key={idx}
                    className="feature-card bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div
                      className="feature-icon w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                      style={{ backgroundColor: primary + '15' }}
                    >
                      <Icon className="w-7 h-7" style={{ color: primary }} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CTA Banner ─── */}
        <section className="py-20 px-6" style={{ background: `linear-gradient(135deg, ${primary}, ${secondary})` }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">¿Listo para empezar?</h2>
            <p className="text-white/80 text-lg mb-8">
              Tu primera consulta es completamente gratuita. Sin compromisos.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white px-8 py-3.5 rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              style={{ color: primary }}
            >
              {lead.ctaText}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer id="contact" className="bg-gray-900 text-gray-400 py-14 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: primary }}
                  >
                    <span className="text-white font-bold text-sm">{lead.name.charAt(0)}</span>
                  </div>
                  <span className="font-semibold text-white">{lead.name}</span>
                </div>
                <p className="text-sm max-w-xs leading-relaxed">{lead.tagline}</p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: primary }} />
                  Lima, Perú
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: primary }} />
                  Contáctanos por el chat
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: primary }} />
                  Lima, Perú
                </span>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
              <span>© {new Date().getFullYear()} {lead.name}. Todos los derechos reservados.</span>
              <span>
                Demo creado por{' '}
                <a
                  href="https://aceleraia.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-white transition-colors"
                  style={{ color: primary }}
                >
                  AceleraIA
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Chat Widget */}
      <ChatWidget
        primaryColor={primary}
        clientName={lead.name}
        knowledgeBase={lead.knowledgeBase}
      />
    </>
  );
}

/** Server-side color helper to darken hex */
function adjustColorServer(hex: string, amount: number): string {
  const clamp = (n: number) => Math.min(255, Math.max(0, n));
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  const toHex = (n: number) => clamp(n + amount).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
