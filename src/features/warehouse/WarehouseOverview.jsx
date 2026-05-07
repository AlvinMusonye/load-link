import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Warehouse,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  AlertTriangle,
  TrendingUp,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { Button, Badge } from '../../components/ui'

const WAREHOUSES = [
  {
    id: 'wh-001',
    name: 'Nairobi ICD',
    location: 'Industrial Area, Nairobi',
    country: 'Kenya',
    type: 'Inland Container Depot',
    totalCapacity: 5000,
    usedCapacity: 3420,
    inbound: 12,
    outbound: 8,
    status: 'OPERATIONAL',
    manager: 'James Omondi',
    phone: '+254 720 111 222',
    tempZones: true,
    hazmatCertified: true,
  },
  {
    id: 'wh-002',
    name: 'Mombasa Port Warehouse',
    location: 'Kilindini, Mombasa',
    country: 'Kenya',
    type: 'Port Bonded Warehouse',
    totalCapacity: 8000,
    usedCapacity: 6100,
    inbound: 24,
    outbound: 18,
    status: 'OPERATIONAL',
    manager: 'Fatuma Mwangi',
    phone: '+254 722 333 444',
    tempZones: false,
    hazmatCertified: true,
  },
  {
    id: 'wh-003',
    name: 'Kampala Distribution Hub',
    location: 'Nakawa, Kampala',
    country: 'Uganda',
    type: 'Distribution Centre',
    totalCapacity: 3000,
    usedCapacity: 1850,
    inbound: 7,
    outbound: 5,
    status: 'OPERATIONAL',
    manager: 'Ronald Ssemakula',
    phone: '+256 700 555 666',
    tempZones: true,
    hazmatCertified: false,
  },
  {
    id: 'wh-004',
    name: 'Kigali Logistics Centre',
    location: 'Gaculiro, Kigali',
    country: 'Rwanda',
    type: 'General Warehouse',
    totalCapacity: 2000,
    usedCapacity: 980,
    inbound: 4,
    outbound: 3,
    status: 'OPERATIONAL',
    manager: 'Ange Uwimana',
    phone: '+250 788 777 888',
    tempZones: false,
    hazmatCertified: false,
  },
  {
    id: 'wh-005',
    name: 'Dar es Salaam Freight Terminal',
    location: 'Kariakoo, Dar es Salaam',
    country: 'Tanzania',
    type: 'Port Bonded Warehouse',
    totalCapacity: 4500,
    usedCapacity: 4100,
    inbound: 15,
    outbound: 11,
    status: 'NEAR_CAPACITY',
    manager: 'Amina Rashid',
    phone: '+255 762 999 000',
    tempZones: true,
    hazmatCertified: true,
  },
]

const SUMMARY_STATS = [
  { label: 'Total Warehouses', value: '5', Icon: Warehouse, color: '#1D4ED8' },
  { label: 'Total Capacity', value: '22,500 CBM', Icon: Package, color: '#7C3AED' },
  { label: 'Pending Inbound', value: '62', Icon: ArrowDownToLine, color: '#059669' },
  { label: 'Pending Outbound', value: '45', Icon: ArrowUpFromLine, color: '#D97706' },
  { label: 'Near Capacity', value: '1', Icon: AlertTriangle, color: '#DC2626' },
  { label: 'Avg Utilisation', value: '67%', Icon: TrendingUp, color: '#0891B2' },
]

function utilColor(pct) {
  if (pct >= 90) return '#DC2626'
  if (pct >= 75) return '#D97706'
  return '#15803D'
}

function statusBadge(status) {
  if (status === 'NEAR_CAPACITY') return { bg: 'rgb(254 243 199)', color: 'rgb(120 53 15)', label: 'Near Capacity' }
  return { bg: 'rgb(220 252 231)', color: 'rgb(21 128 61)', label: 'Operational' }
}

export default function WarehouseOverview() {
  const navigate = useNavigate()
  const [countryFilter, setCountryFilter] = useState('ALL')

  const countries = ['ALL', ...Array.from(new Set(WAREHOUSES.map((w) => w.country)))]
  const filtered = countryFilter === 'ALL'
    ? WAREHOUSES
    : WAREHOUSES.filter((w) => w.country === countryFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Warehouses</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>
            Monitor capacity and operations across all facilities
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {SUMMARY_STATS.map(({ label, value, Icon, color }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.65)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(191,219,254,0.45)',
              borderRadius: '1rem',
            }}
            className="p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon style={{ width: '1rem', height: '1rem', color }} />
              <span className="text-xs text-gray-500">{label}</span>
            </div>
            <p className="text-xl font-bold" style={{ color: '#0F2A4A' }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Country filter */}
      <div className="flex items-center gap-2 flex-wrap">
        {countries.map((c) => (
          <button
            key={c}
            onClick={() => setCountryFilter(c)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={
              countryFilter === c
                ? { background: '#1D4ED8', color: 'white' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }
            }
          >
            {c === 'ALL' ? 'All Countries' : c}
          </button>
        ))}
      </div>

      {/* Warehouse Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((wh) => {
          const pct = Math.round((wh.usedCapacity / wh.totalCapacity) * 100)
          const badge = statusBadge(wh.status)
          return (
            <div
              key={wh.id}
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(191,219,254,0.45)',
                borderRadius: '1rem',
              }}
              className="p-5 flex flex-col gap-4"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-base" style={{ color: '#0F2A4A' }}>{wh.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{wh.location}</span>
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ background: badge.bg, color: badge.color }}
                >
                  {badge.label}
                </span>
              </div>

              {/* Type + tags */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>
                  {wh.type}
                </span>
                {wh.tempZones && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#EDE9FE', color: '#7C3AED' }}>
                    Temp Zones
                  </span>
                )}
                {wh.hazmatCertified && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#FEF3C7', color: '#92400E' }}>
                    Hazmat
                  </span>
                )}
              </div>

              {/* Capacity bar */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Capacity</span>
                  <span className="font-semibold" style={{ color: utilColor(pct) }}>
                    {pct}% ({wh.usedCapacity.toLocaleString()} / {wh.totalCapacity.toLocaleString()} CBM)
                  </span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#E5E7EB', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      backgroundColor: utilColor(pct),
                      borderRadius: '9999px',
                      transition: 'width 0.4s',
                    }}
                  />
                </div>
              </div>

              {/* Inbound / Outbound */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: '#EFF6FF' }}>
                  <ArrowDownToLine className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Inbound</p>
                    <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{wh.inbound} pending</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: '#FFF7ED' }}>
                  <ArrowUpFromLine className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-500">Outbound</p>
                    <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{wh.outbound} pending</p>
                  </div>
                </div>
              </div>

              {/* Manager */}
              <div className="flex items-center justify-between pt-1 border-t border-blue-100">
                <div>
                  <p className="text-xs text-gray-400">Manager</p>
                  <p className="text-sm font-medium" style={{ color: '#374151' }}>{wh.manager}</p>
                </div>
                <button
                  onClick={() => navigate(`/app/warehouse/${wh.id}/inventory`)}
                  className="flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-900 transition-colors"
                >
                  View <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
