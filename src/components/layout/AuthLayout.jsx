import { Truck, Shield, Globe, Zap } from 'lucide-react'

const features = [
  {
    icon: Globe,
    title: 'Pan-East African Coverage',
    description: 'End-to-end shipment management across Kenya, Uganda, Tanzania, and Rwanda.',
  },
  {
    icon: Shield,
    title: 'Real-Time Customs Tracking',
    description: 'Automated customs documentation and live border clearance status.',
  },
  {
    icon: Zap,
    title: 'Fleet Intelligence',
    description: 'GPS-enabled fleet tracking with predictive maintenance alerts.',
  },
]

function AuthLayout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      {/* Left panel — branding */}
      <div
        style={{
          flex: '0 0 45%',
          background: 'linear-gradient(135deg, #0F2A4A 0%, #1D4ED8 60%, #3B82F6 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem 3.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-6rem',
            right: '-6rem',
            width: '20rem',
            height: '20rem',
            borderRadius: '50%',
            background: 'rgba(59,130,246,0.15)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-4rem',
            left: '-4rem',
            width: '16rem',
            height: '16rem',
            borderRadius: '50%',
            background: 'rgba(191,219,254,0.1)',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '2.5rem',
          }}
        >
          <div
            style={{
              width: '2.75rem',
              height: '2.75rem',
              borderRadius: '0.75rem',
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Truck style={{ width: '1.5rem', height: '1.5rem', color: '#fff' }} />
          </div>
          <span
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            LoadLink
          </span>
        </div>

        {/* Tagline */}
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.25,
            marginBottom: '1rem',
          }}
        >
          East Africa's Logistics Platform
        </h1>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(191,219,254,0.85)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '28rem',
          }}
        >
          Manage shipments, fleet, customs, and billing across the East African Community — all in one place.
        </p>

        {/* Feature bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  flexShrink: 0,
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: '0.5rem',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon style={{ width: '1.1rem', height: '1.1rem', color: '#BFDBFE' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', margin: '0 0 0.2rem' }}>
                  {title}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(191,219,254,0.75)', margin: 0, lineHeight: 1.5 }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form area */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#EFF6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div style={{ width: '100%', maxWidth: '26rem' }}>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
