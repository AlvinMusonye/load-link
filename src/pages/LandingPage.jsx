import { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Truck, MapPin, DollarSign, Users, BarChart3,
  Building2, Globe, Zap, CheckCircle, ArrowRight,
  Clock, RefreshCw, Eye, Wifi,
  ChevronDown, Menu, X, TrendingUp, Navigation,
  FileText, Award, Activity, Lock, Smartphone,
  Settings, Bell, Boxes, Ship, Plane,
  ChevronRight, Play, Anchor
} from 'lucide-react';

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCounter(target, inView, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return count;
}

// ─── Particles ────────────────────────────────────────────────────────────────

const Particle = memo(({ style }) => (
  <div style={{ position: 'absolute', borderRadius: '50%', background: '#93C5FD', pointerEvents: 'none', ...style }} />
));

function CosmicParticles() {
  const particles = useRef(
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 5 + 4}s`,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  );
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.current.map(p => (
        <Particle key={p.id} style={{
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          opacity: p.opacity,
          animation: `particleFloat ${p.duration} ${p.delay} ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

// ─── Glassmorphism tokens ─────────────────────────────────────────────────────

const glass = {
  light: {
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(191,219,254,0.45)',
    borderRadius: '1rem',
  },
  medium: {
    background: 'rgba(255,255,255,0.45)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(147,197,253,0.4)',
    borderRadius: '1rem',
  },
  dark: {
    background: 'rgba(15,42,74,0.75)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(59,130,246,0.35)',
    borderRadius: '1rem',
  },
  blue: {
    background: 'rgba(29,78,216,0.12)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(147,197,253,0.5)',
    borderRadius: '1rem',
  },
};

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  const links = ['Features', 'Fleet', 'Warehouse', 'Compliance', 'Billing', 'Analytics'];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.4s ease',
      ...(scrolled ? {
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(191,219,254,0.5)',
        boxShadow: '0 4px 32px rgba(59,130,246,0.07)',
      } : { background: 'transparent' }),
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(59,130,246,0.5)',
              animation: 'glowPulse 3s ease-in-out infinite',
            }}>
              <Truck size={20} color="#fff" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#0F2A4A', fontFamily: 'Lora,serif' }}>
              Load<span style={{ color: '#1D4ED8' }}>Link</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                fontSize: 14, fontWeight: 500, color: '#374151',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#1D4ED8'}
                onMouseLeave={e => e.target.style.color = '#374151'}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link to="/app" style={{
              padding: '8px 22px', borderRadius: 8,
              background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
              color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 14,
              boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
            }}>Get Started</Link>
            <button onClick={() => setOpen(!open)} className="menu-btn" style={{
              background: 'none', border: 'none', cursor: 'pointer', display: 'none',
            }}>
              {open ? <X size={24} color="#0F2A4A" /> : <Menu size={24} color="#0F2A4A" />}
            </button>
          </div>
        </div>

        {open && (
          <div style={{ ...glass.light, marginBottom: 12, padding: '1rem' }}>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '10px 0', color: '#374151', textDecoration: 'none', fontWeight: 500 }}
              >{l}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const floatingStats = [
    { label: 'LL-2025-0042', sub: 'IN TRANSIT  •  Nairobi to Mombasa', color: '#1D4ED8', icon: Package, prog: 65 },
    { label: 'KES 24,500 received', sub: 'M-Pesa STK  •  2s ago', color: '#15803D', icon: Smartphone, prog: 100 },
    { label: '18 vehicles live', sub: 'GPS updated  •  now', color: '#D97706', icon: Navigation, prog: 80 },
    { label: '6 active entries', sub: 'KPA clearance pending', color: '#7C3AED', icon: Ship, prog: 40 },
  ];

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      background: '#fff', display: 'flex', alignItems: 'center', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 650, height: 650, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(191,219,254,0.45) 0%, transparent 70%)',
          top: '-200px', right: '-180px', animation: 'blobMove 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 420, height: 420, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(147,197,253,0.25) 0%, transparent 70%)',
          bottom: '-80px', left: '-120px', animation: 'blobMove 18s ease-in-out infinite reverse',
        }} />
      </div>
      <CosmicParticles />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 1.5rem 80px', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="hero-grid">

          {/* Left */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 16px', borderRadius: 999, ...glass.blue, marginBottom: 24,
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'dotPulse 1.5s infinite' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1D4ED8' }}>East African Logistics Platform</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1,
              color: '#0F2A4A', marginBottom: 24,
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.1s',
            }}>
              Move cargo across{' '}
              <span style={{
                background: 'linear-gradient(135deg,#1D4ED8,#3B82F6,#BFDBFE)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>East Africa</span>{' '}
              with total clarity
            </h1>

            <p style={{
              fontSize: 18, lineHeight: 1.7, color: '#4B5563', marginBottom: 40, maxWidth: 520,
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.2s',
            }}>
              LoadLink unifies shipment management, fleet tracking, warehouse operations, customs clearance, and M-Pesa billing into one platform built for Kenya, Uganda, Tanzania, Rwanda and beyond.
            </p>

            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.7s ease 0.35s',
            }}>
              <Link to="/app" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 10,
                background: 'linear-gradient(135deg,#0F2A4A,#1D4ED8)',
                color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 16,
                boxShadow: '0 8px 32px rgba(29,78,216,0.4)', transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(29,78,216,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(29,78,216,0.4)'; }}
              >
                <Play size={16} fill="#fff" /> Launch Platform
              </Link>
              <a href="#features" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 32px', borderRadius: 10, ...glass.medium,
                color: '#1D4ED8', textDecoration: 'none', fontWeight: 600, fontSize: 16, transition: 'all 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                Explore Features <ChevronDown size={16} />
              </a>
            </div>

            <div style={{
              display: 'flex', gap: 36, marginTop: 48,
              opacity: visible ? 1 : 0, transition: 'all 0.7s ease 0.5s',
            }}>
              {[['5 countries', 'Coverage'], ['< 2s', 'GPS update'], ['99.9%', 'Uptime SLA']].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#1D4ED8' }}>{v}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero image + floating stat cards */}
          <div style={{
            position: 'relative',
            opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
          }}>
            {/* Hero image — overflow hidden clips the Gemini watermark at bottom */}
            <div style={{
              borderRadius: '1.25rem', overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(15,42,74,0.18)',
              border: '1px solid rgba(191,219,254,0.4)',
              height: 440,
            }}>
              <img
                src="/Herosection.png"
                alt="LoadLink global logistics network"
                style={{
                  width: '100%', height: '115%',
                  objectFit: 'cover', objectPosition: 'top center',
                  display: 'block',
                }}
              />
            </div>

            {/* Fade edge at bottom of image */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)',
              borderRadius: '0 0 1.25rem 1.25rem', pointerEvents: 'none',
            }} />

            {/* Floating stat cards */}
            {floatingStats.map((s, i) => {
              const Icon = s.icon;
              const pos = [
                { top: -20, left: -28 }, { top: -20, right: -28 },
                { bottom: 36, left: -28 }, { bottom: 36, right: -28 },
              ][i];
              const delay = `${i * 0.9}s`;
              return (
                <div key={s.label} style={{
                  position: 'absolute', ...pos,
                  ...glass.light, padding: '14px 18px', minWidth: 190,
                  boxShadow: '0 8px 32px rgba(59,130,246,0.14)',
                  animation: `floatY 4s ${delay} ease-in-out infinite`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 7, background: `${s.color}18`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={15} color={s.color} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0F2A4A' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 8 }}>{s.sub}</div>
                  <div style={{ height: 3, borderRadius: 2, background: 'rgba(191,219,254,0.4)' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background: `linear-gradient(90deg,${s.color},${s.color}88)`,
                      width: `${s.prog}%`,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'floatY 2s ease-in-out infinite', opacity: 0.45,
        }}>
          <span style={{ fontSize: 11, color: '#6B7280', letterSpacing: 2, textTransform: 'uppercase' }}>scroll</span>
          <ChevronDown size={18} color="#6B7280" />
        </div>
      </div>
    </section>
  );
}

// ─── Stats Marquee ────────────────────────────────────────────────────────────

function StatsTicker() {
  const items = [
    '12 shipments created today', '18 vehicles on road', 'KES 2.4M revenue MTD',
    '2.1s avg GPS refresh', '3 warehouses active', 'KRA eTIMS synced',
    '5 countries covered', '99.9% uptime this month', 'M-Pesa STK enabled',
    'KPA port clearance live', 'JKIA freight tracking', 'SGR corridor active',
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)', padding: '14px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marqueeScroll 38s linear infinite' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '0 36px', fontSize: 13, fontWeight: 600, color: '#fff',
          }}>
            {item}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', display: 'inline-block', flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Service Image Cards ───────────────────────────────────────────────────────

function ServiceCards() {
  const [ref, inView] = useInView(0.1);
  const cards = [
    {
      image: '/ll.png',
      tag: 'Ground Freight',
      title: 'Road and container logistics across East Africa',
      desc: 'Full truckload, LTL, and container haulage with real-time GPS on every vehicle from Nairobi to Dar es Salaam.',
      color: '#1D4ED8',
    },
    {
      image: '/ll2.png',
      tag: 'Port Operations',
      title: 'KPA-integrated container handling and clearance',
      desc: 'Container tracking at Mombasa port, KPA manifest sync, berth allocation and customs dwell monitoring.',
      color: '#0891B2',
    },
    {
      image: '/ll3.jpg',
      tag: 'Air Freight',
      title: 'JKIA cargo tracking and airfreight management',
      desc: 'Flight manifest integration, air waybill management, and door-to-ramp tracing for time-critical cargo.',
      color: '#7C3AED',
    },
  ];

  return (
    <section ref={ref} style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Freight Modes</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Road. Sea. Air. All in one platform.
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 540, margin: '0 auto' }}>
            Whether moving containers through Mombasa port or urgent cargo through JKIA, LoadLink tracks every movement end to end.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 28 }}>
          {cards.map((c, i) => (
            <div key={c.tag} style={{
              borderRadius: '1.25rem', overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(15,42,74,0.09)',
              border: '1px solid rgba(191,219,254,0.3)',
              background: '#fff',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(36px)',
              transition: `all 0.6s ease ${i * 0.12}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 60px ${c.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(15,42,74,0.09)'; }}
            >
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={c.image}
                  alt={c.tag}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    display: 'block', transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(15,42,74,0.5) 0%, transparent 55%)',
                }} />
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(10px)',
                  padding: '4px 12px', borderRadius: 999,
                  fontSize: 12, fontWeight: 700, color: c.color,
                }}>{c.tag}</div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F2A4A', marginBottom: 10, lineHeight: 1.35 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, marginBottom: 20 }}>{c.desc}</p>
                <Link to="/app" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, fontWeight: 700, color: c.color, textDecoration: 'none', transition: 'gap 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                >
                  View module <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem / Solution ───────────────────────────────────────────────────────

function ProblemSolution() {
  const [ref, inView] = useInView();
  const problems = [
    { num: '01', p: 'Fragmented tools — WhatsApp, spreadsheets, phone calls', s: 'Unified platform — one login for every operation' },
    { num: '02', p: 'No real-time GPS visibility for the fleet', s: 'Live GPS pings every 2 seconds on an interactive map' },
    { num: '03', p: 'Manual invoicing and delayed M-Pesa reconciliation', s: 'Auto-invoicing with instant M-Pesa STK Push reconciliation' },
    { num: '04', p: 'Paper-based customs clearance causes delays', s: 'KRA eTIMS and KPA digital workflows, same-day clearance' },
    { num: '05', p: 'No warehouse bin-level inventory tracking', s: 'Barcode scanning, bin maps, and FIFO stock logic' },
    { num: '06', p: 'Cannot scale across East African borders easily', s: 'Multi-currency, multi-org, five-country expansion roadmap' },
  ];
  return (
    <section ref={ref} id="features" style={{ padding: '100px 1.5rem', background: 'linear-gradient(180deg,#EFF6FF 0%,#fff 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Why LoadLink</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            From operational chaos to full clarity
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>
            Logistics in East Africa runs on improvisation. We replace every workaround with a purpose-built tool.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 24 }}>
          {problems.map((item, i) => (
            <div key={item.num} style={{
              ...glass.light, padding: 28,
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.5s ease ${i * 0.08}s`,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, marginBottom: 16,
                background: 'rgba(29,78,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: '#1D4ED8',
              }}>{item.num}</div>
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  display: 'inline-block', padding: '2px 10px', borderRadius: 4,
                  background: '#FEF2F2', color: '#B91C1C', fontSize: 11, fontWeight: 600, marginBottom: 8,
                }}>BEFORE</div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{item.p}</p>
              </div>
              <div style={{ height: 1, background: 'rgba(191,219,254,0.5)', margin: '16px 0' }} />
              <div>
                <div style={{
                  display: 'inline-block', padding: '2px 10px', borderRadius: 4,
                  background: '#F0FDF4', color: '#15803D', fontSize: 11, fontWeight: 600, marginBottom: 8,
                }}>LOADLINK</div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6 }}>{item.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 12 Modules ───────────────────────────────────────────────────────────────

function ModulesGrid() {
  const [ref, inView] = useInView();
  const modules = [
    { icon: Package, title: 'Shipment Management', desc: 'Full lifecycle FSM from DRAFT to DELIVERED. Multi-modal road, rail, air, and sea.', color: '#1D4ED8' },
    { icon: Truck, title: 'Fleet and GPS', desc: 'Real-time vehicle tracking, driver KPIs, fuel logs, and maintenance schedules.', color: '#0891B2' },
    { icon: Boxes, title: 'Warehouse', desc: 'Bin-level inventory, inbound queues, outbound dispatch, and barcode scanning.', color: '#7C3AED' },
    { icon: FileText, title: 'Customs and Compliance', desc: 'KRA eTIMS integration, KPA clearance, KEBS certification, and NTSA compliance.', color: '#D97706' },
    { icon: DollarSign, title: 'Billing and Invoicing', desc: 'Auto-invoice generation, M-Pesa STK Push, multi-currency, and credit notes.', color: '#15803D' },
    { icon: MapPin, title: 'Live Tracking', desc: 'Public tracking link per shipment. No login required for customers.', color: '#DC2626' },
    { icon: Users, title: 'CRM', desc: 'Customer profiles, contact history, SLA agreements, and credit limits.', color: '#0F2A4A' },
    { icon: Building2, title: 'Vendor Management', desc: 'Carrier onboarding, rate cards, performance scoring, and documents.', color: '#6366F1' },
    { icon: BarChart3, title: 'Analytics and Reports', desc: 'Revenue, delivery KPIs, fleet utilisation, and customs dwell time — live.', color: '#1D4ED8' },
    { icon: Bell, title: 'Notifications', desc: "SMS via Africa's Talking, push, and email — configurable per event and role.", color: '#EA580C' },
    { icon: Wifi, title: 'Integrations', desc: "KRA, KPA, M-Pesa Daraja, SGR, JKIA, Africa's Talking, and open API.", color: '#0891B2' },
    { icon: Settings, title: 'Org and Settings', desc: 'Multi-branch, role-based access, audit logs, and SLA configuration.', color: '#374151' },
  ];
  return (
    <section style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Platform Modules</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            12 modules. One platform.
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>
            Every operation a logistics company needs — integrated, not bolted together.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 20 }}>
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} style={{
                ...glass.light, padding: 28,
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.5s ease ${i * 0.05}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${m.color}22`; e.currentTarget.style.borderColor = `${m.color}55`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(191,219,254,0.45)'; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: `${m.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <Icon size={22} color={m.color} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F2A4A', marginBottom: 8 }}>{m.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Shipment Lifecycle ───────────────────────────────────────────────────────

function ShipmentLifecycle() {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(3);
  const states = [
    { label: 'DRAFT', color: '#6B7280', desc: 'Booking created. Details entered by ops or the customer portal.' },
    { label: 'CONFIRMED', color: '#1D4ED8', desc: 'Rates agreed, carrier assigned, reference number issued.' },
    { label: 'PICKUP SCHEDULED', color: '#0891B2', desc: 'Driver notified via SMS. ETA calculated from live GPS.' },
    { label: 'PICKED UP', color: '#7C3AED', desc: 'Cargo scanned at origin. Proof of collection uploaded.' },
    { label: 'IN TRANSIT', color: '#1D4ED8', desc: 'Live GPS tracking. Customer receives public tracking link.' },
    { label: 'AT CUSTOMS', color: '#D97706', desc: 'KRA eTIMS declaration triggered. KPA portal synced.' },
    { label: 'OUT FOR DELIVERY', color: '#EA580C', desc: 'Last-mile driver assigned. 1-hour delivery window SMS sent.' },
    { label: 'DELIVERED', color: '#15803D', desc: 'ePOD captured. Invoice auto-generated. M-Pesa STK sent.' },
  ];
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % states.length; setActive(i); }, 1800);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="features" style={{ padding: '100px 1.5rem', background: 'linear-gradient(180deg,#EFF6FF 0%,#fff 100%)' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Shipment Lifecycle</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            8-state FSM — every cargo movement tracked
          </h2>
        </div>

        <div style={{ position: 'relative', marginBottom: 48 }}>
          <div style={{
            position: 'absolute', top: 20, left: '6%', right: '6%', height: 4,
            background: 'rgba(191,219,254,0.5)', borderRadius: 2,
          }}>
            <div style={{
              height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg,#1D4ED8,#3B82F6)',
              width: `${(active / (states.length - 1)) * 100}%`,
              transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            {states.map((s, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 4px',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: i <= active ? `${s.color}18` : '#fff',
                  border: `2px solid ${i <= active ? s.color : 'rgba(191,219,254,0.6)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.4s ease',
                  boxShadow: i === active ? `0 0 20px ${s.color}55` : 'none',
                  animation: i === active ? 'glowPulse 2s ease-in-out infinite' : 'none',
                }}>
                  {i <= active
                    ? <CheckCircle size={18} color={s.color} />
                    : <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(191,219,254,0.5)' }} />
                  }
                </div>
                <span style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: 0.5,
                  color: i === active ? s.color : '#9CA3AF',
                  maxWidth: 72, textAlign: 'center', lineHeight: 1.3, transition: 'color 0.3s',
                }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          ...glass.light, padding: 36, maxWidth: 640, margin: '0 auto',
          boxShadow: `0 12px 48px ${states[active].color}22`,
          borderColor: `${states[active].color}44`,
          transition: 'all 0.4s ease', textAlign: 'center',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px',
            background: `${states[active].color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <CheckCircle size={28} color={states[active].color} />
          </div>
          <div style={{
            display: 'inline-block', padding: '4px 14px', borderRadius: 6,
            background: `${states[active].color}15`, color: states[active].color,
            fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 12,
          }}>{states[active].label}</div>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.7 }}>{states[active].desc}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Fleet GPS ────────────────────────────────────────────────────────────────

function FleetSection() {
  const [ref, inView] = useInView();
  const vehicles = [
    { id: 'KBZ 012A', lat: 28, lng: 35, status: 'moving', route: 'NBI to MSA', speed: '94 km/h', fuel: 78 },
    { id: 'KDG 445B', lat: 62, lng: 20, status: 'moving', route: 'KLA to DAR', speed: '87 km/h', fuel: 55 },
    { id: 'UAM 098C', lat: 42, lng: 58, status: 'idle', route: 'KGL to NBI', speed: '0 km/h', fuel: 91 },
    { id: 'TZD 331D', lat: 72, lng: 45, status: 'moving', route: 'DAR to KGL', speed: '78 km/h', fuel: 33 },
    { id: 'KAC 210E', lat: 18, lng: 68, status: 'maintenance', route: 'Depot', speed: '—', fuel: 20 },
    { id: 'UBX 567F', lat: 55, lng: 80, status: 'moving', route: 'MSA to MOM', speed: '101 km/h', fuel: 66 },
  ];
  const statusColor = { moving: '#15803D', idle: '#D97706', maintenance: '#B91C1C' };

  return (
    <section id="fleet" style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-40px)', transition: 'all 0.7s ease' }}>
            <div style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 20,
            }}>Fleet Intelligence</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 20 }}>
              Every truck. Every moment. On your screen.
            </h2>
            <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.8, marginBottom: 32 }}>
              Sub-2-second GPS pings. Driver behaviour scoring. Fuel monitoring. Automatic geofence alerts when vehicles leave approved corridors.
            </p>
            {[
              ['Live GPS tracking', 'Sub-2s refresh on interactive map'],
              ['Driver scoring', 'Harsh braking, speeding, idle time KPIs'],
              ['Fuel management', 'Consumption per km, anomaly alerts'],
              ['Maintenance alerts', 'Service schedule, mileage-based reminders'],
              ['Geofencing', 'Corridor violations trigger instant SMS'],
            ].map(([t, d]) => (
              <div key={t} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                  background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle size={14} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0F2A4A' }}>{t}</div>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s ease 0.2s' }}>
            <div style={{ ...glass.light, overflow: 'hidden', padding: 0, boxShadow: '0 16px 64px rgba(29,78,216,0.14)' }}>
              <div style={{
                padding: '16px 20px', borderBottom: '1px solid rgba(191,219,254,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'dotPulse 1.5s infinite' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F2A4A' }}>Fleet Map — Live</span>
                </div>
                <span style={{ fontSize: 12, color: '#6B7280' }}>6 vehicles tracked</span>
              </div>

              <div style={{ position: 'relative', height: 300, background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)' }}>
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={`${(i + 1) * 16}%`} x2="100%" y2={`${(i + 1) * 16}%`} stroke="rgba(147,197,253,0.3)" strokeWidth="1" />
                  ))}
                  {Array.from({ length: 7 }, (_, i) => (
                    <line key={`v${i}`} x1={`${(i + 1) * 12}%`} y1="0" x2={`${(i + 1) * 12}%`} y2="100%" stroke="rgba(147,197,253,0.3)" strokeWidth="1" />
                  ))}
                  <polyline points="35,95 55,160 70,255" fill="none" stroke="rgba(29,78,216,0.3)" strokeWidth="2" strokeDasharray="6,4" />
                  <polyline points="200,65 150,145 120,255" fill="none" stroke="rgba(29,78,216,0.2)" strokeWidth="2" strokeDasharray="6,4" />
                </svg>
                {vehicles.map((v) => (
                  <div key={v.id} style={{ position: 'absolute', left: `${v.lng}%`, top: `${v.lat}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                      width: 28, height: 28, borderRadius: '50%',
                      border: `2px solid ${statusColor[v.status]}`,
                      animation: v.status === 'moving' ? 'ringPing 2s ease-out infinite' : 'none', opacity: 0.5,
                    }} />
                    <div style={{
                      width: 14, height: 14, borderRadius: '50%',
                      background: statusColor[v.status], border: '2px solid #fff',
                      boxShadow: `0 2px 8px ${statusColor[v.status]}55`, position: 'relative', zIndex: 2,
                    }} title={`${v.id}  ${v.route}  ${v.speed}`} />
                  </div>
                ))}
                {[['Nairobi', 32, 22], ['Mombasa', 72, 38], ['Kampala', 16, 58], ['Dar es Salaam', 62, 65], ['Kigali', 50, 82]].map(([c, t, l]) => (
                  <div key={c} style={{
                    position: 'absolute', top: `${t}%`, left: `${l}%`,
                    fontSize: 10, fontWeight: 600, color: '#1D4ED8',
                    background: 'rgba(255,255,255,0.8)', padding: '2px 6px', borderRadius: 4,
                    transform: 'translate(-50%,-50%)', backdropFilter: 'blur(4px)',
                  }}>{c}</div>
                ))}
              </div>

              <div style={{ padding: 16, maxHeight: 155, overflowY: 'auto' }}>
                {vehicles.map((v) => (
                  <div key={v.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid rgba(191,219,254,0.3)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor[v.status] }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0F2A4A' }}>{v.id}</div>
                        <div style={{ fontSize: 11, color: '#6B7280' }}>{v.route}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{v.speed}</div>
                      <div style={{ fontSize: 11, color: v.fuel < 30 ? '#B91C1C' : '#6B7280' }}>Fuel {v.fuel}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Warehouse ────────────────────────────────────────────────────────────────

function WarehouseSection() {
  const [ref, inView] = useInView();
  const bins = useRef(Array.from({ length: 48 }, (_, i) => ({
    id: i,
    status: Math.random() < 0.6 ? 'occupied' : Math.random() < 0.5 ? 'reserved' : 'empty',
  }))).current;
  const binColor = { occupied: '#1D4ED8', reserved: '#D97706', empty: 'rgba(191,219,254,0.3)' };
  const occupied = bins.filter(b => b.status === 'occupied').length;

  return (
    <section id="warehouse" style={{ padding: '100px 1.5rem', background: 'linear-gradient(180deg,#EFF6FF 0%,#fff 100%)' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Warehouse Module</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Bin-level visibility, zero guesswork
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="hero-grid">
          <div style={{
            ...glass.light, padding: 28,
            opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0F2A4A' }}>Nairobi ICD — Bay A</span>
              <span style={{ fontSize: 12, color: '#6B7280' }}>{occupied}/{bins.length} occupied</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 4, marginBottom: 20 }}>
              {bins.map(b => (
                <div key={b.id} style={{
                  height: 28, borderRadius: 4, background: binColor[b.status],
                  border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', transition: 'transform 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
              {[['occupied', '#1D4ED8'], ['reserved', '#D97706'], ['empty', 'rgba(191,219,254,0.4)']].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: c, border: '1px solid rgba(0,0,0,0.08)' }} />
                  <span style={{ fontSize: 11, color: '#6B7280', textTransform: 'capitalize' }}>{l}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F2A4A' }}>Capacity utilisation</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1D4ED8' }}>{Math.round((occupied / bins.length) * 100)}%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(191,219,254,0.35)' }}>
                <div style={{
                  height: '100%', borderRadius: 4,
                  background: 'linear-gradient(90deg,#1D4ED8,#3B82F6)',
                  width: inView ? `${(occupied / bins.length) * 100}%` : '0%',
                  transition: 'width 1.5s ease 0.5s',
                }} />
              </div>
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s ease 0.2s' }}>
            {[
              { icon: Boxes, title: 'Bin-level inventory', desc: 'Every item tracked to an exact bin. Scan in, scan out. No more manual stock-takes.' },
              { icon: RefreshCw, title: 'Inbound queuing', desc: 'Inbound shipments queue automatically. Dock assignment and vehicle unloading sequencing.' },
              { icon: Activity, title: 'FIFO and LIFO logic', desc: 'Configurable per SKU. Perishable goods auto-rotate on expiry date.' },
              { icon: Smartphone, title: 'Mobile scanning', desc: 'Warehouse staff scan barcodes via mobile PWA. Works fully offline.' },
              { icon: TrendingUp, title: 'Outbound dispatch', desc: 'Pick lists auto-generated from orders. Staged in dock bays, manifest created.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={title} style={{
                display: 'flex', gap: 16, marginBottom: 28,
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${0.3 + i * 0.1}s`,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(29,78,216,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={20} color="#1D4ED8" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0F2A4A', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Customs ──────────────────────────────────────────────────────────────────

function CustomsSection() {
  const [ref, inView] = useInView();
  const steps = [
    { label: 'Shipment confirmed', icon: CheckCircle, color: '#1D4ED8' },
    { label: 'KRA eTIMS declaration', icon: FileText, color: '#0891B2' },
    { label: 'KPA port manifest', icon: Anchor, color: '#7C3AED' },
    { label: 'KEBS inspection', icon: Eye, color: '#D97706' },
    { label: 'Clearance issued', icon: Award, color: '#15803D' },
  ];
  const [flow, setFlow] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % steps.length; setFlow(i); }, 1500);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section id="compliance" style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Customs and Compliance</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Kenya-first regulatory integrations
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>
            LoadLink speaks KRA, KPA, KEBS, and NTSA natively. No manual portal switching.
          </p>
        </div>

        <div style={{
          ...glass.light, padding: 40, maxWidth: 860, margin: '0 auto 64px',
          opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === flow;
              const isDone = i < flow;
              return (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: isDone || isActive ? `${s.color}15` : 'rgb(243,244,246)',
                      border: `2px solid ${isDone || isActive ? s.color : 'rgba(209,213,219,0.8)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.4s ease',
                      boxShadow: isActive ? `0 0 24px ${s.color}44` : 'none',
                      animation: isActive ? 'glowPulse 1.5s ease-in-out infinite' : 'none',
                    }}>
                      <Icon size={22} color={isDone || isActive ? s.color : '#D1D5DB'} />
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: isDone || isActive ? s.color : '#9CA3AF',
                      textAlign: 'center', maxWidth: 90, lineHeight: 1.4, transition: 'color 0.3s',
                    }}>{s.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{
                      width: 50, height: 2, margin: '0 4px', marginBottom: 24,
                      background: i < flow ? 'linear-gradient(90deg,#1D4ED8,#3B82F6)' : 'rgba(209,213,219,0.5)',
                      transition: 'background 0.4s ease',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
          {[
            { abbr: 'KRA', name: 'Kenya Revenue Authority', desc: 'VAT invoice submission, tax PIN verification', color: '#DC2626' },
            { abbr: 'KPA', name: 'Kenya Ports Authority', desc: 'Container tracking, clearance status, berth allocation', color: '#1D4ED8' },
            { abbr: 'KEBS', name: 'Kenya Bureau of Standards', desc: 'Certificate of conformity, pre-export inspection', color: '#15803D' },
            { abbr: 'NTSA', name: 'National Transport Authority', desc: 'Vehicle registration, fleet compliance checks', color: '#D97706' },
            { abbr: 'JKIA', name: 'JKIA Cargo Terminal', desc: 'Airfreight tracking, flight manifest sync', color: '#7C3AED' },
            { abbr: 'SGR', name: 'Standard Gauge Railway', desc: 'Nairobi to Mombasa SGR corridor tracking', color: '#0891B2' },
          ].map((item, i) => (
            <div key={item.abbr} style={{
              ...glass.medium, padding: 24,
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `all 0.5s ease ${i * 0.08}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10, marginBottom: 14,
                background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: item.color, letterSpacing: 0.5,
              }}>{item.abbr}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F2A4A', marginBottom: 6 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Billing ──────────────────────────────────────────────────────────────────

function BillingSection() {
  const [ref, inView] = useInView();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => { i = (i + 1) % 5; setStep(i); }, 1600);
    return () => clearInterval(t);
  }, [inView]);
  const mpesaSteps = [
    { icon: Package, label: 'Shipment delivered', desc: 'ePOD captured on driver app' },
    { icon: FileText, label: 'Invoice auto-generated', desc: 'KES 24,500  •  INV-2025-0892' },
    { icon: Smartphone, label: 'STK Push sent', desc: "Customer's phone receives prompt" },
    { icon: CheckCircle, label: 'Payment confirmed', desc: 'KES 24,500 received in 2 seconds' },
    { icon: RefreshCw, label: 'Reconciled', desc: 'Ledger updated, receipt emailed' },
  ];

  return (
    <section id="billing" style={{ padding: '100px 1.5rem', background: 'linear-gradient(180deg,#EFF6FF 0%,#fff 100%)' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transition: 'all 0.7s ease' }}>
            <div style={{
              display: 'inline-block', padding: '6px 18px', borderRadius: 999,
              background: 'rgba(21,128,61,0.1)', color: '#15803D', fontSize: 13, fontWeight: 600, marginBottom: 20,
            }}>M-Pesa Daraja 2.0</div>
            <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 20 }}>
              Delivery to payment in under 10 seconds
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {mpesaSteps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                    {i < mpesaSteps.length - 1 && (
                      <div style={{
                        position: 'absolute', left: 20, top: 48, width: 2, height: 32,
                        background: i < step ? '#15803D' : 'rgba(209,213,219,0.6)', transition: 'background 0.4s ease',
                      }} />
                    )}
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: i <= step ? 'rgba(21,128,61,0.1)' : 'rgb(243,244,246)',
                      border: `2px solid ${i <= step ? '#15803D' : 'rgba(209,213,219,0.6)'}`,
                      transition: 'all 0.4s ease',
                      boxShadow: i === step ? '0 0 20px rgba(21,128,61,0.4)' : 'none',
                    }}>
                      <Icon size={17} color={i <= step ? '#15803D' : '#D1D5DB'} />
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: i <= step ? '#0F2A4A' : '#9CA3AF', transition: 'color 0.3s' }}>{s.label}</div>
                      <div style={{ fontSize: 13, color: '#6B7280' }}>{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(40px)', transition: 'all 0.7s ease 0.2s' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { icon: FileText, title: 'Auto-invoicing', desc: 'On delivery trigger, invoice PDF and email', color: '#1D4ED8' },
                { icon: Smartphone, title: 'STK Push', desc: 'M-Pesa prompt sent to customer phone', color: '#15803D' },
                { icon: Globe, title: 'Multi-currency', desc: 'KES, UGX, TZS, RWF, and USD supported', color: '#7C3AED' },
                { icon: RefreshCw, title: 'Reconciliation', desc: 'Auto-match M-Pesa callbacks to invoices', color: '#0891B2' },
                { icon: FileText, title: 'Credit notes', desc: 'Partial refunds with full audit trail', color: '#D97706' },
                { icon: BarChart3, title: 'Revenue reports', desc: 'Daily, weekly, monthly P&L by customer', color: '#DC2626' },
              ].map(({ icon: Icon, title, desc, color }, i) => (
                <div key={title} style={{
                  ...glass.light, padding: 20,
                  opacity: inView ? 1 : 0, transition: `all 0.5s ease ${0.3 + i * 0.08}s`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${color}55`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(191,219,254,0.45)'; }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, background: `${color}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
                  }}>
                    <Icon size={17} color={color} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F2A4A', marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────────

function AnalyticsSection() {
  const [ref, inView] = useInView();
  const kpis = [
    { label: 'Shipments / month', value: 1240, suffix: '', color: '#1D4ED8', icon: Package },
    { label: 'On-time delivery', value: 94, suffix: '%', color: '#15803D', icon: CheckCircle },
    { label: 'Revenue MTD', value: 2400, suffix: 'K KES', color: '#7C3AED', icon: TrendingUp },
    { label: 'Avg transit', value: 18, suffix: 'h', color: '#D97706', icon: Clock },
    { label: 'Fleet utilisation', value: 82, suffix: '%', color: '#0891B2', icon: Truck },
    { label: 'Customs dwell', value: 1, suffix: 'd avg', color: '#DC2626', icon: FileText },
  ];
  const c0 = useCounter(kpis[0].value, inView);
  const c1 = useCounter(kpis[1].value, inView);
  const c2 = useCounter(kpis[2].value, inView);
  const c3 = useCounter(kpis[3].value, inView);
  const c4 = useCounter(kpis[4].value, inView);
  const c5 = useCounter(kpis[5].value, inView);
  const counts = [c0, c1, c2, c3, c4, c5];

  return (
    <section id="analytics" style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Live Analytics</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Every metric, live, no delays
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>
            From revenue to customs dwell time — decisions backed by real data, not end-of-month spreadsheets.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24, marginBottom: 56 }}>
          {kpis.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={k.label} style={{
                ...glass.light, padding: 28, textAlign: 'center',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px',
                  background: `${k.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color={k.color} />
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: k.color, marginBottom: 6 }}>
                  {counts[i].toLocaleString()}<span style={{ fontSize: 18 }}>{k.suffix}</span>
                </div>
                <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>{k.label}</div>
              </div>
            );
          })}
        </div>

        <div style={{ ...glass.light, padding: 32, opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.5s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F2A4A' }}>Revenue — last 7 months</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>KES thousands</div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              {['Revenue', 'Target'].map((l, i) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 3, background: i === 0 ? '#1D4ED8' : 'rgba(191,219,254,0.6)' }} />
                  <span style={{ fontSize: 12, color: '#6B7280' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
            {[1820, 2100, 1950, 2300, 2150, 2400, 2650].map((v, i) => {
              const target = [2000, 2000, 2000, 2200, 2200, 2400, 2400][i];
              const months = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 90 }}>
                    <div style={{
                      flex: 1, background: 'linear-gradient(180deg,#3B82F6,#1D4ED8)', borderRadius: '4px 4px 0 0',
                      height: inView ? `${(v / 2800) * 100}%` : '0%', transition: `height 1s ease ${i * 0.12}s`,
                    }} />
                    <div style={{
                      flex: 1, background: 'rgba(191,219,254,0.5)', borderRadius: '4px 4px 0 0',
                      height: inView ? `${(target / 2800) * 100}%` : '0%', transition: `height 1s ease ${i * 0.12 + 0.1}s`,
                    }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#9CA3AF' }}>{months[i]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Performance ──────────────────────────────────────────────────────────────

function PerformanceSection() {
  const [ref, inView] = useInView();
  const metrics = [
    { label: 'API response time', value: '< 180ms', sub: 'p99 across all endpoints', icon: Zap, color: '#1D4ED8' },
    { label: 'GPS update latency', value: '< 2s', sub: 'vehicle position refresh rate', icon: Navigation, color: '#0891B2' },
    { label: 'Uptime SLA', value: '99.9%', sub: 'monitored across all regions', icon: Activity, color: '#15803D' },
    { label: 'M-Pesa callback', value: '< 4s', sub: 'STK push to payment confirmation', icon: Smartphone, color: '#D97706' },
    { label: 'PWA offline mode', value: 'Full', sub: 'scan, create, sync when online', icon: Wifi, color: '#7C3AED' },
    { label: 'Access control', value: 'RBAC', sub: 'per-field, per-module granularity', icon: Lock, color: '#DC2626' },
  ];
  return (
    <section style={{ padding: '100px 1.5rem', background: 'linear-gradient(180deg,#EFF6FF 0%,#fff 100%)' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Built for speed, reliability, and scale
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 24 }}>
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={m.label} style={{
                ...glass.light, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start',
                opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)',
                transition: `all 0.5s ease ${i * 0.09}s`,
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                  background: `${m.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color={m.color} />
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0F2A4A', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{m.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Roadmap ──────────────────────────────────────────────────────────────────

function RoadmapSection() {
  const [ref, inView] = useInView();
  const phases = [
    { phase: 'Phase 1', title: 'Kenya POC', period: 'Q2 2025', items: ['Core shipment FSM', 'Fleet GPS', 'M-Pesa billing', 'KRA eTIMS'], color: '#1D4ED8', done: true },
    { phase: 'Phase 2', title: 'EA Rollout', period: 'Q3 2025', items: ['Uganda and Tanzania', 'Multi-currency', 'Cross-border customs', 'SGR corridor'], color: '#0891B2', done: false },
    { phase: 'Phase 3', title: 'Platform Scale', period: 'Q4 2025', items: ['Rwanda and Ethiopia', 'Carrier marketplace', 'Customer portal', 'Open API v1'], color: '#7C3AED', done: false },
    { phase: 'Phase 4', title: 'African Corridor', period: 'Q1 2026', items: ['DRC and Zambia', 'Air freight module', 'ERP integrations', 'AI route optimisation'], color: '#D97706', done: false },
    { phase: 'Phase 5', title: 'GCC Expansion', period: 'Q3 2026', items: ['UAE corridor', 'Multimodal sea', 'Global customs', 'White-label SaaS'], color: '#DC2626', done: false },
  ];
  return (
    <section style={{ padding: '100px 1.5rem', background: '#fff' }}>
      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{
            display: 'inline-block', padding: '6px 18px', borderRadius: 999,
            background: 'rgba(29,78,216,0.08)', color: '#1D4ED8', fontSize: 13, fontWeight: 600, marginBottom: 16,
          }}>Expansion Roadmap</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700, color: '#0F2A4A', marginBottom: 16 }}>
            Kenya first. Africa next. GCC by 2026.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 20 }}>
          {phases.map((p, i) => (
            <div key={p.phase} style={{
              ...glass.light, padding: 28, borderTop: `3px solid ${p.color}`,
              opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
              transition: `all 0.5s ease ${i * 0.1}s`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 1, marginBottom: 4 }}>{p.phase}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0F2A4A' }}>{p.title}</div>
                </div>
                {p.done && (
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%', background: '#15803D',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle size={14} color="#fff" />
                  </div>
                )}
              </div>
              <div style={{
                fontSize: 12, color: p.color, marginBottom: 16,
                background: `${p.color}10`, padding: '3px 8px', borderRadius: 4, display: 'inline-block',
              }}>{p.period}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {p.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#374151' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────

function CTA() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} style={{
      padding: '100px 1.5rem',
      background: 'linear-gradient(135deg,#0F2A4A 0%,#1D4ED8 50%,#3B82F6 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%)',
          top: '-200px', right: '-100px', animation: 'blobMove 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,255,255,0.05) 0%,transparent 70%)',
          bottom: '-150px', left: '-100px', animation: 'blobMove 16s ease-in-out infinite reverse',
        }} />
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          ...glass.dark, padding: '56px 48px',
          opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)',
          transition: 'all 0.7s ease',
        }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
            Ready to run logistics with total clarity?
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 40, maxWidth: 540, margin: '0 auto 40px' }}>
            See LoadLink handle a live shipment from Nairobi to Mombasa — every truck ping, every M-Pesa receipt, every customs step in real time.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/app" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 10,
              background: '#fff', color: '#1D4ED8',
              textDecoration: 'none', fontWeight: 700, fontSize: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 48px rgba(0,0,0,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)'; }}
            >
              <Play size={16} fill="#1D4ED8" /> Launch Platform
            </Link>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 10,
              border: '1.5px solid rgba(255,255,255,0.4)',
              color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: 16,
              background: 'rgba(255,255,255,0.08)', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            >
              View Features <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#0F2A4A', color: 'rgba(255,255,255,0.7)', padding: '64px 1.5rem 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1D4ED8,#3B82F6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Truck size={18} color="#fff" />
              </div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>LoadLink</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
              East African Logistics Platform. Built for speed, reliability, and scale.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia'].map(c => (
                <span key={c} style={{
                  fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                  background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: 4,
                }}>{c}</span>
              ))}
            </div>
          </div>
          {[
            ['Platform', ['Shipments', 'Fleet GPS', 'Warehouse', 'Customs', 'Billing', 'Analytics']],
            ['Integrations', ['KRA eTIMS', 'M-Pesa Daraja', 'KPA Portal', 'NTSA', "Africa's Talking", 'JKIA Cargo']],
            ['Company', ['About', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service']],
          ].map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>{title}</div>
              {links.map(l => (
                <div key={l} style={{ marginBottom: 10 }}>
                  <a href="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#BFDBFE'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
                  >{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>2025 LoadLink. East African Logistics Platform.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['wahome@nisria.co', 'Nairobi, Kenya'].map(item => (
              <span key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'Lora,serif', background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .nav-links  { display: none !important; }
          .menu-btn   { display: flex !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { font-family: Lora, serif; }
      `}</style>
      <Navbar />
      <Hero />
      <StatsTicker />
      <ServiceCards />
      <ProblemSolution />
      <ModulesGrid />
      <ShipmentLifecycle />
      <FleetSection />
      <WarehouseSection />
      <CustomsSection />
      <BillingSection />
      <AnalyticsSection />
      <PerformanceSection />
      <RoadmapSection />
      <CTA />
      <Footer />
    </div>
  );
}
