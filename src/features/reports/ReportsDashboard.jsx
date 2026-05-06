import { useState, useEffect } from 'react'
import { Download, FileSpreadsheet, FileType } from 'lucide-react'

const glassCard = {
  background: 'rgba(255,255,255,0.65)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(191,219,254,0.45)',
  borderRadius: '1rem',
}

const DATE_RANGES = ['This Week', 'This Month', 'This Quarter']

const kpiMetrics = [
  { label: 'Total Shipments', value: '342', unit: '', target: 400, current: 342, color: '#1D4ED8' },
  { label: 'On-Time Delivery', value: '94%', unit: '', target: 100, current: 94, color: '#15803D' },
  { label: 'Total Revenue', value: 'KES 8.4M', unit: '', target: 10000000, current: 8400000, color: '#7C3AED' },
  { label: 'Avg Transit Time', value: '18 hrs', unit: '', target: 24, current: 18, color: '#0E7490' },
  { label: 'Fleet Utilisation', value: '82%', unit: '', target: 100, current: 82, color: '#B45309' },
  { label: 'Customs Dwell', value: '1.2 days', unit: '', target: 3, current: 1.2, color: '#BE185D' },
]

const monthlyRevenue = [
  { month: 'Nov', value: 5200000 },
  { month: 'Dec', value: 6800000 },
  { month: 'Jan', value: 7100000 },
  { month: 'Feb', value: 6400000 },
  { month: 'Mar', value: 7900000 },
  { month: 'Apr', value: 8100000 },
  { month: 'May', value: 8400000 },
]

const shipmentsByStatus = [
  { label: 'Delivered', count: 198, color: '#15803D', pct: 58 },
  { label: 'In Transit', count: 54, color: '#1D4ED8', pct: 16 },
  { label: 'At Customs', count: 27, color: '#B45309', pct: 8 },
  { label: 'Picked Up', count: 32, color: '#7C3AED', pct: 9 },
  { label: 'Confirmed', count: 18, color: '#0E7490', pct: 5 },
  { label: 'Exception', count: 13, color: '#B91C1C', pct: 4 },
]

const topRoutes = [
  {
    route: 'Nairobi → Mombasa',
    shipments: 87,
    revenue: 'KES 1,240,500',
    avgTime: '8 hrs',
    onTime: '96%',
  },
  {
    route: 'Mombasa → Kampala',
    shipments: 64,
    revenue: 'KES 1,890,000',
    avgTime: '26 hrs',
    onTime: '91%',
  },
  {
    route: 'Nairobi → Dar es Salaam',
    shipments: 52,
    revenue: 'KES 1,560,000',
    avgTime: '22 hrs',
    onTime: '88%',
  },
  {
    route: 'Nairobi → Kigali',
    shipments: 41,
    revenue: 'KES 1,320,000',
    avgTime: '30 hrs',
    onTime: '93%',
  },
  {
    route: 'Nairobi → Arusha',
    shipments: 38,
    revenue: 'KES 760,000',
    avgTime: '6 hrs',
    onTime: '97%',
  },
]

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value))

function ProgressBar({ pct, color, animate }) {
  return (
    <div
      style={{
        height: '6px',
        backgroundColor: '#E5E7EB',
        borderRadius: '999px',
        overflow: 'hidden',
        marginTop: '0.5rem',
      }}
    >
      <div
        style={{
          height: '100%',
          borderRadius: '999px',
          backgroundColor: color,
          width: animate ? `${pct}%` : '0%',
          transition: 'width 0.9s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  )
}

function ReportsDashboard() {
  const [activeRange, setActiveRange] = useState('This Month')
  const [barsAnimated, setBarsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBarsAnimated(true), 120)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page header + date range */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0F2A4A', margin: '0 0 0.25rem' }}>
            Reports &amp; Analytics
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', margin: 0 }}>
            Operational performance across your East African network
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {DATE_RANGES.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: `1px solid ${activeRange === range ? '#1D4ED8' : 'rgba(191,219,254,0.5)'}`,
                backgroundColor: activeRange === range ? '#1D4ED8' : 'rgba(255,255,255,0.65)',
                color: activeRange === range ? '#fff' : '#374151',
                fontSize: '0.8125rem',
                fontWeight: activeRange === range ? 600 : 400,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards with progress bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
        }}
      >
        {kpiMetrics.map((m) => {
          const pct = Math.min(100, Math.round((m.current / m.target) * 100))
          return (
            <div key={m.label} style={{ ...glassCard, padding: '1.25rem' }}>
              <p style={{ fontSize: '0.75rem', color: '#6B7280', margin: '0 0 0.25rem', fontWeight: 500 }}>
                {m.label}
              </p>
              <p
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#0F2A4A',
                  margin: '0 0 0.125rem',
                  lineHeight: 1.2,
                }}
              >
                {m.value}
              </p>
              <p style={{ fontSize: '0.7rem', color: m.color, margin: 0, fontWeight: 500 }}>
                {pct}% of target
              </p>
              <ProgressBar pct={pct} color={m.color} animate={barsAnimated} />
            </div>
          )
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1rem' }}>
        {/* Monthly Revenue Bar Chart */}
        <div style={{ ...glassCard, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: '0 0 1.25rem' }}>
            Monthly Revenue (KES)
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '0.625rem',
              height: '10rem',
              paddingBottom: '0.25rem',
            }}
          >
            {monthlyRevenue.map((m) => {
              const barHeightPct = (m.value / maxRevenue) * 100
              return (
                <div
                  key={m.month}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.375rem',
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.6rem',
                      color: '#6B7280',
                      fontWeight: 500,
                    }}
                  >
                    {(m.value / 1000000).toFixed(1)}M
                  </div>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: '0.25rem 0.25rem 0 0',
                      backgroundColor: '#1D4ED8',
                      height: barsAnimated ? `${barHeightPct}%` : '0%',
                      transition: 'height 0.8s cubic-bezier(0.4,0,0.2,1)',
                      minHeight: '4px',
                      opacity: barsAnimated ? 1 : 0,
                    }}
                  />
                  <p style={{ fontSize: '0.7rem', color: '#9CA3AF', margin: 0 }}>{m.month}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Shipments by Status */}
        <div style={{ ...glassCard, padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: '0 0 1.25rem' }}>
            Shipments by Status
          </h3>

          {/* Donut-style visual */}
          <div
            style={{
              display: 'flex',
              height: '0.75rem',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '1.25rem',
            }}
          >
            {shipmentsByStatus.map((s) => (
              <div
                key={s.label}
                style={{
                  width: `${s.pct}%`,
                  backgroundColor: s.color,
                  transition: 'width 0.8s ease',
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {shipmentsByStatus.map((s) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      width: '0.625rem',
                      height: '0.625rem',
                      borderRadius: '2px',
                      backgroundColor: s.color,
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#374151' }}>{s.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F2A4A' }}>
                    {s.count}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9CA3AF', minWidth: '2rem', textAlign: 'right' }}>
                    {s.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Routes Table */}
      <div style={{ ...glassCard, overflow: 'hidden' }}>
        <div
          style={{
            padding: '1rem 1.25rem',
            borderBottom: '1px solid rgba(191,219,254,0.35)',
          }}
        >
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0F2A4A', margin: 0 }}>
            Top Routes
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(239,246,255,0.6)' }}>
                {['Route', 'Shipments', 'Revenue', 'Avg Transit', 'On-Time %'].map((col) => (
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
              {topRoutes.map((r, i) => (
                <tr
                  key={r.route}
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
                    {r.route}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.8rem',
                      color: '#374151',
                      fontWeight: 500,
                    }}
                  >
                    {r.shipments}
                  </td>
                  <td
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.8rem',
                      color: '#374151',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.revenue}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#374151' }}>
                    {r.avgTime}
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: parseInt(r.onTime) >= 95 ? '#15803D' : parseInt(r.onTime) >= 90 ? '#B45309' : '#B91C1C',
                      }}
                    >
                      {r.onTime}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1rem 1.25rem',
          ...glassCard,
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginRight: '0.5rem' }}>
          Export Report:
        </span>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(191,219,254,0.6)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#374151',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EFF6FF' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)' }}
        >
          <FileSpreadsheet style={{ width: '0.875rem', height: '0.875rem', color: '#15803D' }} />
          Export CSV
        </button>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(191,219,254,0.6)',
            backgroundColor: 'rgba(255,255,255,0.8)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: '#374151',
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EFF6FF' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)' }}
        >
          <FileType style={{ width: '0.875rem', height: '0.875rem', color: '#B91C1C' }} />
          Export PDF
        </button>
        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid transparent',
            backgroundColor: '#1D4ED8',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'inherit',
            marginLeft: 'auto',
            transition: 'background-color 0.15s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1e40af' }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1D4ED8' }}
        >
          <Download style={{ width: '0.875rem', height: '0.875rem' }} />
          Download Full Report
        </button>
      </div>
    </div>
  )
}

export default ReportsDashboard
