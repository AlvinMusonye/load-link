import { Link } from 'react-router-dom'
import {
  Package,
  Truck,
  Navigation,
  TrendingUp,
  Eye,
  Plane,
  Ship,
  Plus,
  FileText,
  Users,
  ArrowUpRight,
} from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

const glassCard = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(191,219,254,0.45)',
  borderRadius: '1rem',
}

const kpiCards = [
  {
    label: 'Active Shipments',
    value: '24',
    change: '+12% vs last month',
    changePositive: true,
    icon: Package,
    iconBg: '#DBEAFE',
    iconColor: '#1D4ED8',
  },
  {
    label: 'Fleet on Road',
    value: '18 / 24',
    change: '6 vehicles available',
    changePositive: true,
    icon: Truck,
    iconBg: '#CFFAFE',
    iconColor: '#0E7490',
  },
  {
    label: 'In Transit',
    value: '12',
    change: '-2 since yesterday',
    changePositive: false,
    icon: Navigation,
    iconBg: '#FEF3C7',
    iconColor: '#B45309',
  },
  {
    label: 'Revenue MTD',
    value: 'KES 2,847,500',
    change: '+8.4% vs last month',
    changePositive: true,
    icon: TrendingUp,
    iconBg: '#D1FAE5',
    iconColor: '#15803D',
  },
]

const recentShipments = [
  {
    id: 'LL-2025-042',
    origin: 'Nairobi',
    destination: 'Mombasa',
    status: 'in-transit',
    statusLabel: 'In Transit',
    mode: 'truck',
    eta: '5 May 2025',
  },
  {
    id: 'LL-2025-041',
    origin: 'Mombasa',
    destination: 'Kampala',
    status: 'at-customs',
    statusLabel: 'At Customs',
    mode: 'truck',
    eta: '7 May 2025',
  },
  {
    id: 'LL-2025-040',
    origin: 'Nairobi',
    destination: 'Dar es Salaam',
    status: 'pickup-scheduled',
    statusLabel: 'Pickup Scheduled',
    mode: 'truck',
    eta: '8 May 2025',
  },
  {
    id: 'LL-2025-039',
    origin: 'Entebbe',
    destination: 'Nairobi',
    status: 'confirmed',
    statusLabel: 'Confirmed',
    mode: 'air',
    eta: '6 May 2025',
  },
  {
    id: 'LL-2025-038',
    origin: 'Mombasa Port',
    destination: 'Nairobi ICD',
    status: 'picked-up',
    statusLabel: 'Picked Up',
    mode: 'truck',
    eta: '5 May 2025',
  },
  {
    id: 'LL-2025-037',
    origin: 'Nairobi',
    destination: 'Kigali',
    status: 'delivered',
    statusLabel: 'Delivered',
    mode: 'truck',
    eta: 'Delivered',
  },
]

const activityFeed = [
  {
    id: 1,
    color: '#1D4ED8',
    text: 'Shipment LL-2025-042 departed Nairobi depot',
    time: '09:14',
  },
  {
    id: 2,
    color: '#15803D',
    text: 'Payment of KES 184,000 received — Savannah Traders Ltd',
    time: '08:52',
  },
  {
    id: 3,
    color: '#B45309',
    text: 'Customs hold on LL-2025-041 at Busia border',
    time: '08:30',
  },
  {
    id: 4,
    color: '#1D4ED8',
    text: 'New shipment LL-2025-043 created for Uhuru Freight Ltd',
    time: '08:15',
  },
  {
    id: 5,
    color: '#15803D',
    text: 'LL-2025-037 delivered — Kigali recipient confirmed',
    time: '07:48',
  },
  {
    id: 6,
    color: '#9333EA',
    text: 'Vehicle KBZ 012A scheduled maintenance due in 3 days',
    time: '07:20',
  },
  {
    id: 7,
    color: '#B45309',
    text: 'Invoice INV-2025-089 overdue — East African Supplies',
    time: 'Yesterday',
  },
  {
    id: 8,
    color: '#15803D',
    text: 'Customs cleared — LL-2025-035 at Namanga border',
    time: 'Yesterday',
  },
]

const fleetStatus = [
  { plate: 'KBZ 012A', location: 'Nairobi–Mombasa A109', status: 'on-route', statusColor: '#15803D' },
  { plate: 'KDA 847C', location: 'Busia Border Post', status: 'at-border', statusColor: '#B45309' },
  { plate: 'KBX 331F', location: 'Mombasa Depot', status: 'idle', statusColor: '#6B7280' },
  { plate: 'KDG 554B', location: 'Kampala–Nairobi', status: 'on-route', statusColor: '#15803D' },
  { plate: 'KCA 119E', location: 'Nairobi — Loading', status: 'loading', statusColor: '#1D4ED8' },
]

const quickActions = [
  { label: 'New Shipment', icon: Package, to: '/app/shipments/new', color: '#1D4ED8', bg: '#DBEAFE' },
  { label: 'New Invoice', icon: FileText, to: '/app/billing/invoices', color: '#15803D', bg: '#D1FAE5' },
  { label: 'Add Vehicle', icon: Truck, to: '/app/fleet/vehicles', color: '#0E7490', bg: '#CFFAFE' },
  { label: 'Add Customer', icon: Users, to: '/app/customers', color: '#7C3AED', bg: '#EDE9FE' },
]

function ModeIcon({ mode }) {
  const style = { width: '1rem', height: '1rem', color: '#6B7280' }
  if (mode === 'air') return <Plane style={style} />
  if (mode === 'sea') return <Ship style={style} />
  return <Truck style={style} />
}

function StatusBadgeInline({ status, label }) {
  return (
    <span className={`status-badge status-${status}`}>{label}</span>
  )
}

function Dashboard() {
  const { user } = useAuthStore()
  const firstName = user?.first_name || 'there'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page header */}
      <div>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0F2A4A', margin: '0 0 0.25rem' }}>
          Dashboard
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
          Good morning, {firstName}. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {kpiCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} style={{ ...glassCard, padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div
                  style={{
                    width: '2.75rem',
                    height: '2.75rem',
                    borderRadius: '0.625rem',
                    backgroundColor: card.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon style={{ width: '1.25rem', height: '1.25rem', color: card.iconColor }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '0 0 0.25rem', fontWeight: 500 }}>
                    {card.label}
                  </p>
                  <p
                    style={{
                      fontSize: card.value.length > 8 ? '1rem' : '1.375rem',
                      fontWeight: 700,
                      color: '#0F2A4A',
                      margin: '0 0 0.375rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {card.value}
                  </p>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      color: card.changePositive ? '#15803D' : '#B45309',
                      margin: 0,
                    }}
                  >
                    {card.change}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Middle row — shipments + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
        {/* Recent Shipments */}
        <div style={{ ...glassCard, overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(191,219,254,0.35)',
            }}
          >
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>
              Recent Shipments
            </h3>
            <Link
              to="/app/shipments"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.8rem',
                color: '#1D4ED8',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              View all <ArrowUpRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(239,246,255,0.6)' }}>
                  {['ID', 'Route', 'Status', 'Mode', 'ETA', ''].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: '0.625rem 1rem',
                        textAlign: 'left',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentShipments.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{
                      borderTop: i === 0 ? 'none' : '1px solid rgba(191,219,254,0.25)',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: '#0F2A4A',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.id}
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.8rem',
                        color: '#374151',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.origin} → {s.destination}
                    </td>
                    <td style={{ padding: '0.75rem 1rem', whiteSpace: 'nowrap' }}>
                      <StatusBadgeInline status={s.status} label={s.statusLabel} />
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <ModeIcon mode={s.mode} />
                    </td>
                    <td
                      style={{
                        padding: '0.75rem 1rem',
                        fontSize: '0.8rem',
                        color: '#6B7280',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {s.eta}
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <Link
                        to={`/app/shipments/${s.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.75rem',
                          color: '#1D4ED8',
                          textDecoration: 'none',
                          fontWeight: 500,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          border: '1px solid rgba(191,219,254,0.6)',
                        }}
                      >
                        <Eye style={{ width: '0.75rem', height: '0.75rem' }} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div style={{ ...glassCard, overflow: 'hidden' }}>
          <div
            style={{
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(191,219,254,0.35)',
            }}
          >
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>
              Recent Activity
            </h3>
          </div>
          <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {activityFeed.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  padding: '0.625rem 0.75rem',
                  borderLeft: `3px solid ${item.color}`,
                  borderRadius: '0 0.375rem 0.375rem 0',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: '#374151',
                      margin: '0 0 0.2rem',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.text}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: 0 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — fleet status + quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
        {/* Fleet Status */}
        <div style={{ ...glassCard, overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid rgba(191,219,254,0.35)',
            }}
          >
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>
              Fleet Status
            </h3>
            <Link
              to="/app/fleet"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.8rem',
                color: '#1D4ED8',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Live Map <ArrowUpRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(239,246,255,0.6)' }}>
                {['Vehicle', 'Current Location', 'Status'].map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: '0.5rem 1rem',
                      textAlign: 'left',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fleetStatus.map((v, i) => (
                <tr
                  key={v.plate}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid rgba(191,219,254,0.25)' }}
                >
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      color: '#0F2A4A',
                    }}
                  >
                    {v.plate}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#374151' }}>
                    {v.location}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <span
                        style={{
                          width: '0.5rem',
                          height: '0.5rem',
                          borderRadius: '50%',
                          backgroundColor: v.statusColor,
                          display: 'inline-block',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '0.78rem',
                          color: v.statusColor,
                          fontWeight: 500,
                          textTransform: 'capitalize',
                        }}
                      >
                        {v.status.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div style={{ ...glassCard, padding: '1.25rem' }}>
          <h3
            style={{
              fontSize: '0.9375rem',
              fontWeight: 700,
              color: '#0F2A4A',
              margin: '0 0 1rem',
            }}
          >
            Quick Actions
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
            }}
          >
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link
                  key={action.label}
                  to={action.to}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '1rem 0.5rem',
                    borderRadius: '0.75rem',
                    backgroundColor: action.bg,
                    border: '1px solid rgba(191,219,254,0.4)',
                    textDecoration: 'none',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.625rem',
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon style={{ width: '1.25rem', height: '1.25rem', color: action.color }} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: action.color,
                      textAlign: 'center',
                    }}
                  >
                    {action.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Add shortcut */}
          <Link
            to="/app/shipments/new"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              marginTop: '0.875rem',
              padding: '0.5625rem',
              borderRadius: '0.5rem',
              backgroundColor: '#1D4ED8',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.8125rem',
              fontWeight: 600,
            }}
          >
            <Plus style={{ width: '0.875rem', height: '0.875rem' }} />
            Create New Shipment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
