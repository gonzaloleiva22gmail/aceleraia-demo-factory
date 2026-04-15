import { notFound } from 'next/navigation';
import { getLeadData } from '@/lib/leads';
import ChatWidget from '@/components/ChatWidget';
import {
  CheckCircle, Shield, Sparkles, Smile, Star, Heart,
  Phone, Mail, MapPin, ArrowRight, ChevronRight,
} from 'lucide-react';

const FALLBACK_COLOR = '#7B52A8';

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
    title: `${lead.name} — Powered by AceleraIA`,
    description: lead.heroSubtitle,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const lead = getLeadData(params.id);
  if (!lead) notFound();

  const primary   = lead.primaryColor  || FALLBACK_COLOR;
  const secondary = lead.secondaryColor || adjustColorServer(primary, -30);
  const ctaHref   = lead.whatsappUrl ?? '#contact';

  return (
    <>
      {/* ─── Global styles ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --p:  ${primary};
          --s:  ${secondary};
          --dk: #0D0D0D;
          --dk2: #111111;
          --cr: #F9F6F1;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lx-serif { font-family: 'Playfair Display', Georgia, serif; }
        .lx-sans  { font-family: 'Inter', system-ui, sans-serif; }

        /* Buttons */
        .lx-btn {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .9rem 2.2rem;
          background: var(--p); color: #fff;
          font-family: 'Inter', sans-serif; font-size: .78rem;
          font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: background .3s, transform .25s;
        }
        .lx-btn:hover { background: var(--s); transform: translateY(-2px); }

        .lx-btn-ghost {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .9rem 2.2rem;
          background: transparent; color: #fff;
          font-family: 'Inter', sans-serif; font-size: .78rem;
          font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
          text-decoration: none; border: 1px solid rgba(255,255,255,.35); cursor: pointer;
          transition: background .3s, border-color .3s;
        }
        .lx-btn-ghost:hover { background: rgba(255,255,255,.08); border-color: #fff; }

        .lx-btn-white {
          display: inline-flex; align-items: center; gap: .5rem;
          padding: .9rem 2.2rem;
          background: #fff; color: var(--p);
          font-family: 'Inter', sans-serif; font-size: .78rem;
          font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
          text-decoration: none; border: none; cursor: pointer;
          transition: opacity .25s, transform .25s;
        }
        .lx-btn-white:hover { opacity: .9; transform: translateY(-2px); }

        /* Nav link */
        .nav-link {
          color: rgba(255,255,255,.55); font-size: .75rem; letter-spacing: .12em;
          text-transform: uppercase; text-decoration: none;
          transition: color .2s;
        }
        .nav-link:hover { color: #fff; }

        /* Service card */
        .svc-card {
          background: #fff; padding: 3rem 2.5rem;
          border: 1px solid #E8E4DF; position: relative; overflow: hidden;
          transition: transform .35s, box-shadow .35s;
        }
        .svc-card::after {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--p), var(--s));
          transform: scaleX(0); transform-origin: left; transition: transform .35s;
        }
        .svc-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,.11); }
        .svc-card:hover::after { transform: scaleX(1); }

        .svc-num {
          position: absolute; top: -.5rem; right: 1.5rem;
          font-family: 'Playfair Display', serif; font-size: 6rem; font-weight: 700;
          color: ${primary}10; line-height: 1; user-select: none; pointer-events: none;
        }

        /* Trust pill */
        .trust-item:not(:last-child) { border-right: 1px solid rgba(255,255,255,.07); }

        /* Fade-up animation */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fu  { animation: fadeUp .8s ease forwards; }
        .d1  { animation-delay: .1s; opacity: 0; }
        .d2  { animation-delay: .25s; opacity: 0; }
        .d3  { animation-delay: .4s;  opacity: 0; }
        .d4  { animation-delay: .55s; opacity: 0; }

        /* Footer link */
        .ft-link { color: var(--p); font-weight: 600; text-decoration: none; }
        .ft-link:hover { opacity: .8; }

        /* Chat widget override — minimal */
        .lx-chat-btn {
          width: 56px; height: 56px; border-radius: 50%;
          box-shadow: 0 8px 32px rgba(0,0,0,.35);
        }
      `}</style>

      <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: 'var(--dk)', color: '#fff', minHeight: '100vh' }}>

        {/* ════════════════════ NAVBAR ════════════════════ */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: 'rgba(13,13,13,.88)', backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', height: 72,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 38, height: 38,
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span className="lx-serif" style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>
                  {lead.name.charAt(0)}
                </span>
              </div>
              <span className="lx-serif" style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '.02em' }}>
                {lead.name}
              </span>
            </div>

            {/* Links + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <a href="#services" className="nav-link">Servicios</a>
              <a href="#contact"  className="nav-link">Contacto</a>
              <a href="#contact"  className="lx-btn" style={{ padding: '.65rem 1.6rem', fontSize: '.72rem' }}>
                Reservar
              </a>
            </div>
          </div>
        </nav>

        {/* ════════════════════ HERO ════════════════════ */}
        <section style={{
          minHeight: '100vh', paddingTop: 72,
          display: 'flex', alignItems: 'center',
          background: `linear-gradient(140deg, #0D0D0D 0%, #1C0D30 55%, #0A1820 100%)`,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow orbs */}
          <div style={{
            position: 'absolute', top: '8%', right: '4%',
            width: 560, height: 560, borderRadius: '50%',
            background: `radial-gradient(circle, ${primary}1A 0%, transparent 68%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '8%', left: '2%',
            width: 340, height: 340, borderRadius: '50%',
            background: `radial-gradient(circle, ${secondary}12 0%, transparent 68%)`,
            pointerEvents: 'none',
          }} />
          {/* Thin vertical accent line */}
          <div style={{
            position: 'absolute', left: '6%', top: '20%',
            width: 1, height: '40%',
            background: `linear-gradient(to bottom, transparent, ${primary}55, transparent)`,
          }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem', width: '100%', position: 'relative', zIndex: 10 }}>

            {/* Eyebrow */}
            <div className="fu d1" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: 40, height: 1, background: primary }} />
              <span style={{ fontSize: '.73rem', letterSpacing: '.2em', textTransform: 'uppercase', color: primary, fontWeight: 500 }}>
                {lead.tagline}
              </span>
            </div>

            {/* Headline */}
            <h1 className="lx-serif fu d2" style={{
              fontSize: 'clamp(2.6rem, 6vw, 5.2rem)', fontWeight: 600,
              lineHeight: 1.08, maxWidth: 780, marginBottom: '2rem',
            }}>
              Donde la Ciencia<br />
              <em style={{ color: primary }}>Encuentra</em> tu<br />
              Belleza Natural
            </h1>

            <p className="fu d3" style={{
              fontSize: '1.05rem', color: 'rgba(255,255,255,.6)',
              maxWidth: 520, lineHeight: 1.85, marginBottom: '3rem', fontWeight: 300,
            }}>
              {lead.heroSubtitle}
            </p>

            {/* CTAs */}
            <div className="fu d4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href={ctaHref} target={lead.whatsappUrl ? '_blank' : undefined} rel={lead.whatsappUrl ? 'noopener noreferrer' : undefined} className="lx-btn">
                {lead.ctaText} <ArrowRight size={15} />
              </a>
              <a href="#services" className="lx-btn-ghost">
                Ver tratamientos
              </a>
            </div>

            {/* Stats row */}
            <div className="fu d4" style={{
              display: 'flex', gap: '3rem', marginTop: '5rem',
              paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,.08)',
              flexWrap: 'wrap',
            }}>
              {[
                { value: '12+', label: 'Años de experiencia' },
                { value: '500+', label: 'Pacientes satisfechos' },
                { value: '4.9★', label: 'Calificación media' },
                { value: '30+', label: 'Tratamientos' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="lx-serif" style={{ fontSize: '2.6rem', fontWeight: 700, color: primary, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.45)', marginTop: '.5rem', letterSpacing: '.07em', textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════ SERVICES ════════════════════ */}
        <section id="services" style={{ padding: '7rem 2rem', background: 'var(--cr)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>

            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: primary, fontWeight: 500 }}>
                Nuestros Tratamientos
              </span>
              <div style={{ width: 40, height: 1, background: primary, margin: '1.25rem auto' }} />
              <h2 className="lx-serif" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#0D0D0D', lineHeight: 1.2 }}>
                Servicios de Alto Estándar
              </h2>
              <p style={{ marginTop: '1rem', color: '#6B7280', fontSize: '.95rem', maxWidth: 480, margin: '1rem auto 0' }}>
                Cada tratamiento es diseñado a medida, con tecnología de punta y un equipo médico certificado.
              </p>
            </div>

            {/* Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}>
              {lead.features.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || Sparkles;
                return (
                  <div key={idx} className="svc-card">
                    <span className="svc-num">{String(idx + 1).padStart(2, '0')}</span>

                    {/* Icon box */}
                    <div style={{
                      width: 54, height: 54,
                      background: `${primary}16`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.75rem',
                    }}>
                      <Icon size={24} style={{ color: primary }} />
                    </div>

                    <h3 className="lx-serif" style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0D0D0D', marginBottom: '1rem', lineHeight: 1.3 }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: '.88rem', color: '#6B7280', lineHeight: 1.85, fontWeight: 300 }}>
                      {feature.description}
                    </p>

                    {/* Inline CTA */}
                    <div style={{
                      marginTop: '2rem', display: 'flex', alignItems: 'center',
                      gap: '.4rem', color: primary, fontSize: '.75rem',
                      letterSpacing: '.09em', textTransform: 'uppercase', fontWeight: 500,
                    }}>
                      <span>Más información</span>
                      <ChevronRight size={13} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ════════════════════ TRUST STRIP ════════════════════ */}
        <section style={{ background: '#111', borderTop: `2px solid ${primary}`, padding: '4.5rem 2rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0 }}>
            {[
              { Icon: Shield,       title: 'Médicos Certificados',    desc: 'Equipo de especialistas avalados' },
              { Icon: Star,         title: 'Tecnología de Punta',     desc: 'Equipos de última generación' },
              { Icon: Sparkles,     title: 'Resultados Naturales',    desc: 'Estética que realza tu belleza' },
              { Icon: CheckCircle,  title: 'Primera Consulta Gratis', desc: 'Sin compromisos, sin costo' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="trust-item" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                <Icon size={28} style={{ color: primary, marginBottom: '1rem' }} />
                <div className="lx-serif" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginBottom: '.45rem' }}>
                  {title}
                </div>
                <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.65 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════ CTA BANNER ════════════════════ */}
        <section style={{
          padding: '8rem 2rem',
          background: `linear-gradient(140deg, ${primary} 0%, #1A0D2E 45%, ${adjustColorServer(secondary, -20)} 100%)`,
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle radial glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,.65)', fontWeight: 500 }}>
              Comienza tu transformación
            </span>
            <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,.35)', margin: '1.25rem auto' }} />
            <h2 className="lx-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, color: '#fff', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              Tu Primera Consulta<br />
              <em>es Completamente Gratis</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', lineHeight: 1.85, marginBottom: '3rem', fontWeight: 300 }}>
              Agenda hoy y descubre un plan personalizado diseñado<br />
              exclusivamente para ti — sin compromisos.
            </p>
            <a href={ctaHref} target={lead.whatsappUrl ? '_blank' : undefined} rel={lead.whatsappUrl ? 'noopener noreferrer' : undefined} className="lx-btn-white">
              {lead.ctaText} <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* ════════════════════ FOOTER / CONTACT ════════════════════ */}
        <footer id="contact" style={{ background: '#0A0A0A', padding: '5rem 2rem 3rem', borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

              {/* Brand */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${primary}, ${secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="lx-serif" style={{ color: '#fff', fontWeight: 600 }}>{lead.name.charAt(0)}</span>
                  </div>
                  <span className="lx-serif" style={{ fontSize: '1.1rem', fontWeight: 600, color: '#fff' }}>{lead.name}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,.38)', fontSize: '.85rem', lineHeight: 1.85, maxWidth: 240 }}>
                  {lead.tagline} — Tu centro de medicina estética de confianza en Lima.
                </p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="lx-serif" style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem', letterSpacing: '.02em' }}>
                  Contacto
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { Icon: Phone,  text: '+51 924 966 312' },
                    { Icon: Mail,   text: 'ventas@pielbella.pe' },
                    { Icon: MapPin, text: 'Jr. Gozzoli Nte. 601, San Borja, Lima' },
                  ].map(({ Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '.75rem', color: 'rgba(255,255,255,.45)', fontSize: '.85rem', lineHeight: 1.55 }}>
                      <Icon size={14} style={{ color: primary, flexShrink: 0, marginTop: 2 }} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4 className="lx-serif" style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1.5rem' }}>
                  Horario de Atención
                </h4>
                <div style={{ color: 'rgba(255,255,255,.45)', fontSize: '.85rem', lineHeight: 2 }}>
                  <div>Lunes – Viernes</div>
                  <div style={{ color: primary, fontWeight: 500 }}>9:00 AM – 7:00 PM</div>
                  <div style={{ marginTop: '.5rem' }}>Sábados y Domingos</div>
                  <div style={{ color: 'rgba(255,255,255,.28)' }}>Consultar disponibilidad</div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div style={{
              paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,.06)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexWrap: 'wrap', gap: '1rem',
            }}>
              <span style={{ color: 'rgba(255,255,255,.22)', fontSize: '.78rem' }}>
                © {new Date().getFullYear()} {lead.name}. Todos los derechos reservados.
              </span>
              <span style={{ color: 'rgba(255,255,255,.22)', fontSize: '.78rem' }}>
                Demo creado por{' '}
                <a href="https://aceleraia.com" target="_blank" rel="noopener noreferrer" className="ft-link">
                  AceleraIA
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* ─── Chat Widget ─── */}
      <ChatWidget
        primaryColor={primary}
        clientName={lead.name}
        knowledgeBase={lead.knowledgeBase}
      />
    </>
  );
}

function adjustColorServer(hex: string, amount: number): string {
  const clamp = (n: number) => Math.min(255, Math.max(0, n));
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.substring(0, 2), 16);
  const g = parseInt(cleaned.substring(2, 4), 16);
  const b = parseInt(cleaned.substring(4, 6), 16);
  const toHex = (n: number) => clamp(n + amount).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
