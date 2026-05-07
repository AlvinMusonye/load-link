import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle, Loader2, Eye, EyeOff, Package, MapPin, TrendingUp, Truck } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const SLIDES = [
  { image: '/Herosection.png', headline: 'End-to-End Cargo Visibility',    sub: 'Real-time tracking across every East African corridor',              objectPos: 'top center' },
  { image: '/ll.png',          headline: 'Ground Freight Network',          sub: '480+ active routes connecting Kenya, Uganda, Tanzania and beyond',   objectPos: 'center center' },
  { image: '/ll2.png',         headline: 'Port & Terminal Operations',      sub: 'Coordinated logistics at Mombasa, Dar es Salaam and Nairobi ICD',    objectPos: 'center center' },
  { image: '/ll3.jpg',         headline: 'Air Cargo Express',               sub: 'Fast-lane air shipments with same-day documentation clearance',      objectPos: 'center center' },
]

const STATS = [
  { label: 'Shipments / Month', value: '1,240', Icon: Package },
  { label: 'Countries',         value: '6',     Icon: MapPin },
  { label: 'On-Time Rate',      value: '98.7%', Icon: TrendingUp },
  { label: 'Fleet Size',        value: '240+',  Icon: Truck },
]

const CSS = `
  @keyframes llOrb1 {
    0%,100% { transform:translate(0,0) scale(1); }
    33%      { transform:translate(60px,-80px) scale(1.12); }
    66%      { transform:translate(-40px,50px) scale(0.92); }
  }
  @keyframes llOrb2 {
    0%,100% { transform:translate(0,0) scale(1); }
    33%      { transform:translate(-70px,50px) scale(1.08); }
    66%      { transform:translate(80px,-30px) scale(0.95); }
  }
  @keyframes llOrb3 {
    0%,100% { transform:translate(0,0) scale(1); }
    50%      { transform:translate(40px,60px) scale(1.15); }
  }
  @keyframes llSpin    { to { transform:rotate(360deg); } }
  @keyframes llCaption { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
  @keyframes llCardIn  { from { opacity:0; transform:translateY(24px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
  .ll-input::placeholder            { color:rgba(255,255,255,0.28); }
  .ll-input::-webkit-input-placeholder { color:rgba(255,255,255,0.28); }
  .ll-submit:hover  { filter:brightness(1.12); transform:translateY(-1px); box-shadow:0 10px 32px rgba(29,78,216,0.7),inset 0 1px 0 rgba(255,255,255,0.2) !important; }
  .ll-submit:active { transform:translateY(0); }
  .ll-dot { transition:all 0.4s cubic-bezier(0.4,0,0.2,1); cursor:pointer; border:none; padding:0; }
`

export default function LoginPage() {
  const navigate  = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [showPw,     setShowPw]     = useState(false)
  const [localError, setLocalError] = useState('')
  const [slide,      setSlide]      = useState(0)
  const [captionKey, setCaptionKey] = useState(0)

  // Preload so slide transitions are instant
  useEffect(() => {
    SLIDES.forEach(({ image }) => { const i = new window.Image(); i.src = image })
  }, [])

  // Auto-advance
  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % SLIDES.length)
      setCaptionKey((k) => k + 1)
    }, 5200)
    return () => clearInterval(t)
  }, [])

  const goToSlide = useCallback((i) => { setSlide(i); setCaptionKey((k) => k + 1) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError('')
    clearError()
    if (!email.trim()) { setLocalError('Email address is required.'); return }
    if (!password)     { setLocalError('Password is required.');       return }
    try {
      const result = await login(email.trim(), password)
      if (result?.success) navigate('/app')
    } catch (_) {}
  }

  const displayError = localError || error

  /* ─── shared input style ─── */
  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    paddingTop: '0.75rem', paddingBottom: '0.75rem',
    paddingRight: '0.875rem',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.13)',
    borderRadius: '0.875rem',
    fontSize: '0.875rem', color: '#fff',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
  }
  const onFocus = (e) => { e.target.style.borderColor = 'rgba(59,130,246,0.65)'; e.target.style.background = 'rgba(255,255,255,0.13)'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.18)' }
  const onBlur  = (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.13)'; e.target.style.background = 'rgba(255,255,255,0.08)';  e.target.style.boxShadow = 'none' }

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', fontFamily: 'Lora, serif' }}>
      <style>{CSS}</style>

      {/* ── Background orbs ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '0%',   width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(29,78,216,0.5) 0%, transparent 70%)',  filter: 'blur(80px)', animation: 'llOrb1 18s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '5%', width: '55vw', height: '55vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)', filter: 'blur(90px)', animation: 'llOrb2 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '35%', left: '35%',  width: '32vw', height: '32vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%)',  filter: 'blur(70px)', animation: 'llOrb3 14s ease-in-out infinite' }} />
      </div>

      {/* ── Carousel images ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {SLIDES.map((s, i) => (
          <img key={i} src={s.image} alt="" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: s.objectPos,
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            willChange: 'opacity',
          }} />
        ))}
        {/* Dark overlay — uniform across whole screen */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'rgba(4,12,36,0.68)' }} />
        {/* Subtle radial vignette at edges */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,8,24,0.55) 100%)' }} />
      </div>

      {/* ── All UI (stacked over images) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>

        {/* Top bar — logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.75rem 2.5rem', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '0.625rem', background: 'rgba(29,78,216,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(29,78,216,0.4)' }}>
              <Package style={{ width: '1.125rem', height: '1.125rem', color: '#fff' }} />
            </div>
            <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Load Link</span>
          </div>
          <Link to="/" style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = 'rgba(255,255,255,0.85)'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.45)'}
          >
            Back to site
          </Link>
        </div>

        {/* Centre — form card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem 1.5rem' }}>
          <div style={{
            width: '100%', maxWidth: '420px',
            position: 'relative',
            background: 'rgba(255,255,255,0.07)',
            backdropFilter: 'blur(48px)',
            WebkitBackdropFilter: 'blur(48px)',
            border: '1px solid rgba(255,255,255,0.13)',
            borderRadius: '2rem',
            padding: '2.75rem 2.25rem',
            boxShadow: '0 48px 96px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
            animation: 'llCardIn 0.6s cubic-bezier(0.4,0,0.2,1) both',
          }}>
            {/* Top inner shine line */}
            <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)' }} />
            {/* Inner ambient orb */}
            <div style={{ position: 'absolute', top: '-50%', right: '-25%', width: '20rem', height: '20rem', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Logo mark */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '1.875rem' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '0.875rem', background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(29,78,216,0.55), inset 0 1px 0 rgba(255,255,255,0.22)' }}>
                  <Package style={{ width: '1.375rem', height: '1.375rem', color: '#fff' }} />
                </div>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.7rem' }}>Load Link</span>
              </div>

              <h1 style={{ fontSize: '1.625rem', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '0.375rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Welcome back
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.42)', textAlign: 'center', marginBottom: '2rem' }}>
                Sign in to your operator account
              </p>

              {/* Error */}
              {displayError && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(185,28,28,0.18)', border: '1px solid rgba(252,165,165,0.25)', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
                  <AlertCircle style={{ width: '1rem', height: '1rem', color: '#FCA5A5', flexShrink: 0, marginTop: '0.05rem' }} />
                  <p style={{ fontSize: '0.8rem', color: '#FCA5A5', margin: 0 }}>{displayError}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Email */}
                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '0.775rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>
                    Email address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
                    <input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.co.ke" className="ll-input"
                      style={{ ...inputStyle, paddingLeft: '2.625rem' }}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" style={{ display: 'block', fontSize: '0.775rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }} />
                    <input id="password" type={showPw ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password" className="ll-input"
                      style={{ ...inputStyle, paddingLeft: '2.625rem', paddingRight: '2.75rem' }}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                    <button type="button" onClick={() => setShowPw((v) => !v)}
                      style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'rgba(255,255,255,0.32)', display: 'flex', alignItems: 'center' }}>
                      {showPw ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading} className="ll-submit"
                  style={{
                    marginTop: '0.625rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    width: '100%', padding: '0.875rem 1.25rem',
                    background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 55%, #3B82F6 100%)',
                    color: '#fff', border: 'none', borderRadius: '0.875rem',
                    fontSize: '0.9375rem', fontWeight: 600,
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: '0 4px 20px rgba(29,78,216,0.55), inset 0 1px 0 rgba(255,255,255,0.2)',
                    opacity: isLoading ? 0.75 : 1,
                    letterSpacing: '0.01em',
                    position: 'relative', overflow: 'hidden',
                  }}>
                  {/* Gloss highlight */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.14) 0%, transparent 100%)', pointerEvents: 'none', borderRadius: '0.875rem 0.875rem 0 0' }} />
                  {isLoading
                    ? <><Loader2 style={{ width: '1rem', height: '1rem', animation: 'llSpin 0.75s linear infinite' }} />Signing in...</>
                    : 'Sign in'}
                </button>
              </form>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.5rem 0 1.25rem' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.09)' }} />
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>EAST AFRICA&apos;S LOGISTICS OS</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.09)' }} />
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: '#93C5FD', fontWeight: 600, textDecoration: 'none' }}>Request access</Link>
              </p>
              <p style={{ textAlign: 'center', fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)', marginTop: '0.875rem' }}>
                POC demo — any credentials accepted
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar — slide caption left, stats right */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1.5rem 2.5rem 2rem', flexShrink: 0, gap: '2rem' }}>

          {/* Caption + dots */}
          <div key={captionKey} style={{ animation: 'llCaption 0.65s cubic-bezier(0.4,0,0.2,1) both', flexShrink: 0, maxWidth: '28rem' }}>
            <p style={{ fontSize: '1.0625rem', fontWeight: 600, color: '#fff', margin: '0 0 0.25rem', textShadow: '0 2px 12px rgba(0,0,0,0.5)', lineHeight: 1.3 }}>
              {SLIDES[slide].headline}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', margin: '0 0 0.875rem', lineHeight: 1.5 }}>
              {SLIDES[slide].sub}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {SLIDES.map((_, i) => (
                <button key={i} className="ll-dot" onClick={() => goToSlide(i)}
                  style={{
                    width: i === slide ? '1.75rem' : '0.4rem',
                    height: '0.4rem', borderRadius: '9999px',
                    background: i === slide ? '#3B82F6' : 'rgba(255,255,255,0.28)',
                    boxShadow: i === slide ? '0 0 10px rgba(59,130,246,0.8)' : 'none',
                  }} />
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0 }}>
            {STATS.map(({ label, value, Icon }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.875rem',
                padding: '0.625rem 0.875rem',
                minWidth: '5.5rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
                <Icon style={{ width: '0.75rem', height: '0.75rem', color: 'rgba(147,197,253,0.85)', marginBottom: '0.25rem' }} />
                <p style={{ fontSize: '1.0625rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.42)', margin: '0.2rem 0 0', lineHeight: 1.3 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
