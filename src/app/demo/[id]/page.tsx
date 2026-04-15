import { notFound } from 'next/navigation';
import { getLeadData } from '@/lib/leads';
import ChatWidget from '@/components/ChatWidget';
import RetroGrid from '@/components/magicui/retro-grid';
import ShinyButton from '@/components/magicui/shiny-button';
import { BorderBeam } from '@/components/magicui/border-beam';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle, Shield, Sparkles, Smile, Star, Heart,
  Phone, Mail, MapPin, ArrowRight, ChevronRight,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  CheckCircle, Shield, Sparkles, Smile, Star, Heart, Phone, Mail, MapPin,
};

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const lead = getLeadData(params.id);
  if (!lead) return { title: 'Demo Not Found' };
  return {
    title: `${lead.name} — Premium AI Experience`,
    description: lead.heroSubtitle,
  };
}

/** 
 * Helper to parse the knowledgeBase text block into FAQ items.
 * Splits by sections that look like "UPPERCASE TITLE:" and cleans up lines.
 */
function parseKnowledgeBase(kb: string) {
  const sections: { title: string; content: string[] }[] = [];
  const lines = kb.split('\n');
  
  let currentSection: { title: string; content: string[] } | null = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check if line is a heading (e.g. "SERVICIOS PRINCIPALES:")
    if (trimmed.match(/^[A-Z\sÑÁÉÍÓÚ]+:$/)) {
      currentSection = { 
        title: trimmed.replace(':', ''), 
        content: [] 
      };
      sections.push(currentSection);
    } else if (currentSection) {
      // Clean up bullet points or extra markers
      const cleanedLine = trimmed.replace(/^[-*]\s*/, '');
      currentSection.content.push(cleanedLine);
    } else {
      // Create a default first section if none found yet
      currentSection = { title: "Información General", content: [trimmed] };
      sections.push(currentSection);
    }
  });

  return sections;
}

export default async function DemoPage({ params }: PageProps) {
  const lead = getLeadData(params.id);
  if (!lead) notFound();

  const primary = lead.primaryColor || '#7B52A8';
  const secondary = lead.secondaryColor || primary;
  const ctaHref = lead.whatsappUrl ?? '#contact';
  
  const faqItems = parseKnowledgeBase(lead.knowledgeBase);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* ─── DYNAMIC COLOR BINDING ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${primary};
          --secondary: ${secondary};
          --accent: ${secondary};
          --primary-foreground: #ffffff;
          --secondary-foreground: #ffffff;
          --ring: ${primary};
          --border: ${secondary}33;
        }
        .dark {
          --primary: ${primary};
          --secondary: ${secondary};
          --border: ${secondary}44;
        }
      `}} />

      {/* ════════════════════ NAVBAR ════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-primary">
              <span className="font-serif text-white font-bold text-xl relative z-10">
                {lead.name.charAt(0)}
              </span>
              <BorderBeam size={40} duration={4} borderWidth={2} />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {lead.name}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Servicios</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href={ctaHref}>
              <ShinyButton className="h-10 px-6">Reservar Ahora</ShinyButton>
            </a>
          </div>
        </div>
      </nav>

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <RetroGrid className="opacity-20" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles size={14} />
            {lead.tagline}
          </div>

          <h1 className="font-serif text-5xl md:text-8xl font-bold leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 italic">
            {lead.heroTitle.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 2 ? "text-primary not-italic" : ""}>{word} </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
            {lead.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
            <a href={ctaHref}>
              <ShinyButton className="h-14 px-10 text-lg">
                {lead.ctaText}
              </ShinyButton>
            </a>
            <a href="#services" className="h-14 px-10 inline-flex items-center justify-center font-medium hover:text-primary transition-colors">
              Explorar Tratamientos <ChevronRight className="ml-1" size={18} />
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 blur-[120px] pointer-events-none" />
      </section>

      {/* ════════════════════ SERVICES ════════════════════ */}
      <section id="services" className="py-32 relative bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">Experiencia de Lujo</h2>
              <p className="text-muted-foreground">Tecnología de vanguardia y resultados excepcionales diseñados para realzar tu esencia natural.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lead.features.map((feature, idx) => {
              const Icon = iconMap[feature.icon] || Sparkles;
              return (
                <Card key={idx} className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-border/40 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/10 group-hover:border-primary/20">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <CardTitle className="font-serif text-2xl mb-2">{feature.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={ctaHref} className="inline-flex items-center text-sm font-bold text-primary group-hover:gap-2 transition-all">
                      Saber más <ArrowRight size={14} className="ml-1" />
                    </a>
                  </CardContent>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════ SMART FAQ ════════════════════ */}
      <section id="faq" className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-4">Preguntas Frecuentes</h2>
            <p className="text-muted-foreground">Todo lo que necesitas saber sobre {lead.name}</p>
          </div>

          <Accordion className="w-full space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border border-border/40 rounded-2xl px-6 bg-secondary/5 overflow-hidden">
                <AccordionTrigger className="text-lg font-serif font-semibold hover:no-underline hover:text-primary transition-colors py-6">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <ul className="space-y-3">
                    {item.content.map((line, lidx) => (
                      <li key={lidx} className="flex gap-3 text-muted-foreground leading-relaxed">
                        <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                        <span className={line.includes('S/.') || line.includes(':') ? "text-foreground font-medium" : ""}>
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[3rem] overflow-hidden bg-primary px-8 py-20 md:py-32 text-center text-white">
            <RetroGrid className="opacity-10 dark:opacity-20" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-serif text-4xl md:text-7xl font-bold mb-8 italic">
                La Mejor Versión De Ti <br/>
                <span className="not-italic">Empieza Aquí</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-12 max-w-xl mx-auto font-light">
                Únete a los cientos de pacientes que han transformado su bienestar en nuestras manos expertas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href={ctaHref}>
                  <button className="h-16 px-12 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                    Agendar Mi Consulta Gratis
                  </button>
                </a>
                <div className="flex -space-x-3 items-center">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-primary bg-secondary/20 flex items-center justify-center overflow-hidden">
                      <Smile size={24} className="text-white/60" />
                    </div>
                  ))}
                  <span className="ml-4 text-sm font-medium text-white/80">+500 pacientes felices</span>
                </div>
              </div>
            </div>
            <BorderBeam size={800} duration={8} borderWidth={4} colorFrom="#fff" colorTo="rgba(255,255,255,0.3)" />
          </div>
        </div>
      </section>

      {/* ════════════════════ FOOTER ════════════════════ */}
      <footer className="py-20 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-serif text-white font-bold">
                {lead.name.charAt(0)}
              </div>
              <span className="font-serif text-xl font-bold">{lead.name}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cuidado estético integral con estándares internacionales. Innovación y elegancia en cada tratamiento.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-foreground/80 uppercase tracking-widest text-xs">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+51 924 966 312</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>contacto@{lead.name.toLowerCase().replace(/\s+/g, '')}.pe</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground/80 uppercase tracking-widest text-xs">Ubicación</h4>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
              <span>Jr. Gozzoli Nte. 601, San Borja, Lima, Perú</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground/80 uppercase tracking-widest text-xs">Legal</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} {lead.name}</p>
              <p>Políticas de Privacidad</p>
              <p className="text-[10px] pt-4 opacity-50">Powered by AceleraIA Demo Factory</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Chat Widget with BorderBeam ─── */}
      <div className="fixed bottom-6 right-6 z-50 overflow-hidden rounded-full shadow-2xl">
        <ChatWidget
          primaryColor={primary}
          clientName={lead.name}
          knowledgeBase={lead.knowledgeBase}
        />
        <BorderBeam size={60} duration={6} />
      </div>
    </div>
  );
}
