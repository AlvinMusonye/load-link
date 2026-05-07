import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, Package, MapPin, TrendingUp, Truck, Users } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

// ─── Carousel slides ──────────────────────────────────────────────────────────
const SLIDES = [
  {
    image: '/Herosection.png',
    headline: 'End-to-End Cargo Visibility',
    sub: 'Real-time tracking across every East African corridor',
    objectPos: 'top center',
  },
  {
    image: '/ll.png',
    headline: 'Ground Freight Network',
    sub: '480+ active routes connecting Kenya, Uganda, Tanzania and beyond',
    objectPos: 'center center',
  },
  {
    image: '/ll2.png',
    headline: 'Port & Terminal Operations',
    sub: 'Coordinated logistics at Mombasa, Dar es Salaam and Nairobi ICD',
    objectPos: 'center center',
  },
  {
    image: '/ll3.jpg',
    headline: 'Air Cargo Express',
    sub: 'Fast-lane air shipments with same-day documentation clearance',
    objectPos: 'center center',
  },
]

const STATS = [
  { label: 'Shipments This Month', value: '1,240', Icon: Package },
  { label: 'Countries Served', value: '6', Icon: MapPin },
  { label: 'On-Time Delivery', value: '98.7%', Icon: TrendingUp },
  { label: 'Fleet Vehicles', value: '240+', Icon: Truck },
]

// ─── CSS injected once ────────────────────────────────────────────────────────
const CSS = `
  @keyframes llOrb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(60px,-80px) scale(1.12); }
    66%      { transform: translate(-40px,50px) scale(0.92); }
  }
  @keyframes llOrb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(-70px,50px) scale(1.08); }
    66%      { transform: translate(80px,-30px) scale(0.95); }
  }
  @keyframes llOrb3 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%      { transform: translate(40px,60px) scale(1.15); }
  }
  @keyframes llSpin {
    to { transform: rotate(360deg); }
  }
  @keyframes llCaption {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes llStatIn {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes llShimmer {
    0%   { transform:translateX(-100%); }
    100% { transform:translateX(200%); }
  }
  .ll-input::placeholder { color:rgba(255,255,255,0.3); }
  .ll-input::-webkit-input-placeholder { color:rgba(255,255,255,0.3); }
  .ll-submit:hover { background:linear-gradient(135deg,#1e40af 0%,#2563eb 60%,#3b82f6 100%) !important; transform:translateY(-1px); box-shadow:0 8px 28px rgba(29,78,216,0.65),inset 0 1px 0 rgba(255,255,255,0.2) !important; }
  .ll-submit:active { transform:translateY(0); }
  .ll-dot { transition:all 0.4s cubic-bezier(0.4,0,0.2,1); }
`

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [localError, setLocalError] = useState('')
  const [slide, setSlide]         = useState(0)
  const [captionKey, setCaptionKey] = useState(0)

  // Preload all carousel images immediately so transitions are lag-free
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new window.Image()
      img.src = s.image
    })
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length)
      setCaptionKey((k) => k + 1)
    }, 5200)
    return () => clearInterval(t)
  }, [])

  const goToSlide = useCallback((i) => {
    setSlide(i)
    setCaptionKey((k) => k + 1)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    clearError()
    if (!email.trim())  { setLocalError('Email address is required.'); return }
    if (!password)      { setLocalError('Password is required.'); return }
    try {
      const result = await login(email.trim(), password)
      if (result?.success) navigate('/app')
    } catch (_) {}
  }

  const displayError = localError || error

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', fontFamily: 'Lora, serif' }}>
      <style>{CSS}</style>

      {/* ── Animated colour orbs (behind everything) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '5%',  width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.55) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'llOrb1 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '30%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 70%)', filter: 'blur(90px)', animation: 'llOrb2 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%',  width: '30vw', height: '30vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, transparent 70%)', filter: 'blur(70px)', animation: 'llOrb3 14s ease-in-out infinite' }} />
      </div>

      {/* ── Carousel images (full-screen background) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.image}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: s.objectPos,
              opacity: i === slide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              willChange: 'opacity',
            }}
          />
        ))}
        {/* Overall dark gradient — left stays clear, right gets darker */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to right, rgba(4,12,36,0.55) 0%, rgba(4,12,36,0.75) 58%, rgba(4,12,36,0.82) 100%)' }} />
        {/* Bottom vignette on left side */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: '42%', height: '45%', zIndex: 3, background: 'linear-gradient(to top, rgba(4,12,36,0.95) 0%, transparent 100%)' }} />
      </div>

      {/* ── Split content ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', width: '100%', height: '100%' }}>

        {/* ════════════ LEFT PANEL ════════════ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2.5rem 3rem', height: '100%', overflowY: 'auto' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'rgba(29,78,216,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package style={{ width: '1.125rem', height: '1.125rem', color: '#fff' }} />
            </div>
            <span style={{ fontSize: '1.1875rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Load Link</span>
          </div>

          {/* Slide caption */}
          <div key={captionKey} style={{ animation: 'llCaption 0.7s cubic-bezier(0.4,0,0.2,1) both' }}>
            {/* Glass caption chip */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '9999px', padding: '0.375rem 0.875rem', marginBottom: '1.25rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', display: 'inline-block', boxShadow: '0 0 8px rgba(59,130,246,0.8)' }} />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500, letterSpacing: '0.04em' }}>PLATFORM OVERVIEW</span>
            </div>
            <h2 style={{ fontSize: '2.375rem', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '0.75rem', letterSpacing: '-0.02em', maxWidth: '26rem', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
              {SLIDES[slide].headline}
            </h2>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.68)', maxWidth: '22rem', lineHeight: 1.6 }}>
              {SLIDES[slide].sub}
            </p>

            {/* Dot navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.75rem' }}>
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className="ll-dot"
                  onClick={() => goToSlide(i)}
                  style={{
                    width: i === slide ? '2rem' : '0.5rem',
                    height: '0.5rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    background: i === slide ? '#3B82F6' : 'rgba(255,255,255,0.3)',
                    padding: 0,
                    boxShadow: i === slide ? '0 0 12px rgba(59,130,246,0.7)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating stat chips */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', maxWidth: '22rem' }}>
            {STATS.map(({ label, value, Icon }, i) => (
              <div
                key={label}
                style={{
                  animation: `llStatIn 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s both`,
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: '0.875rem',
                  padding: '0.875rem 1rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top shine */}
                <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)' }} />
                <Icon style={{ width: '0.875rem', height: '0.875rem', color: 'rgba(147,197,253,0.9)', marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', margin: '0.25rem 0 0', fontWeight: 400 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════ RIGHT GLASS PANEL ════════════ */}
        <div
          style={{
            width: '460px',
            flexShrink: 0,
            position: 'relative',
            background: 'rgba(6,14,42,0.28)',
            backdropFilter: 'blur(56px)',
            WebkitBackdropFilter: 'blur(56px)',
            borderLeft: '1px solid rgba(255,255,255,0.09)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            overflowY: 'auto',
            padding: '2.5rem 2.25rem',
          }}
        >
          {/* Panel top inner shine */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)', zIndex: 1 }} />

          {/* Inner form card */}
          <div
            style={{
              width: '100%',
              maxWidth: '360px',
              position: 'relative',
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.11)',
              borderRadius: '1.75rem',
              padding: '2.5rem 2rem',
              boxShadow: '0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.18) inset',
              overflow: 'hidden',
            }}
          >
            {/* Card inner top shine */}
            <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)', zIndex: 2 }} />

            {/* Subtle inner shimmer orb */}
            <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '18rem', height: '18rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '2rem', justifyContent: 'center' }}>
                <div style={{ width: '2.625rem', height: '2.625rem', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(29,78,216,0.5), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
                  <Package style={{ width: '1.25rem', height: '1.25rem', color: '#fff' }} />
                </div>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.015em' }}>Load Link</span>
              </div>

              {/* Headings */}
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '0.375rem', letterSpacing: '-0.02em' }}>
                Welcome back
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.48)', textAlign: 'center', marginBottom: '1.875rem' }}>
                Sign in to your operator account
              </p>

              {/* Error */}
              {displayError && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(185,28,28,0.2)', border: '1px solid rgba(252,165,165,0.3)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                  <AlertCircle style={{ width: '1rem', height: '1rem', color: '#FCA5A5', flexShrink: 0, marginTop: '0.05rem' }} />
                  <p style={{ fontSize: '0.8rem', color: '#FCA5A5', margin: 0 }}>{displayError}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Email */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    Email address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.ke"
                      className="ll-input"
                      style={{
                        width: '100%',
                        paddingLeft: '2.625rem',
                        paddingRight: '0.875rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '0.875rem',
                        fontSize: '0.875rem',
                        color: '#fff',
                        outline: 'none',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.6)'; e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.18)' }}
                      onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.65)', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }} />
                    <input
                      id="password"
                      type={showPw ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="ll-input"
                      style={{
                        width: '100%',
                        paddingLeft: '2.625rem',
                        paddingRight: '2.75rem',
                        paddingTop: '0.75rem',
                        paddingBottom: '0.75rem',
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '0.875rem',
                        fontSize: '0.875rem',
                        color: '#fff',
                        outline: 'none',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(59,130,246,0.6)'; e.target.style.background = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.18)' }}
                      onBlur={(e)  => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.boxShadow = 'none' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center' }}
                    >
                      {showPw ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ll-submit"
                  style={{
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.8125rem 1.25rem',
                    background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 60%, #3B82F6 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.875rem',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 4px 20px rgba(29,78,216,0.5), inset 0 1px 0 rgba(255,255,255,0.18)',
                    opacity: isLoading ? 0.75 : 1,
                    letterSpacing: '0.01em',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Glossy shimmer overlay */}
                  {!isLoading && (
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '0.875rem 0.875rem 0 0' }} />
                  )}
                  {isLoading ? (
                    <>
                      <Loader2 style={{ width: '1rem', height: '1rem', animation: 'llSpin 0.75s linear infinite' }} />
                      Signing in...
                    </>
                  ) : 'Sign in'}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>East Africa's Logistics OS</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              </div>

              {/* Register */}
              <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: '#93C5FD', fontWeight: 600, textDecoration: 'none' }}>
                  Request access
                </Link>
              </p>

              {/* Demo hint */}
              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.22)', marginTop: '1rem' }}>
                POC demo — use any credentials to sign in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
