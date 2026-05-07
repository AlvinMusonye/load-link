import { useState } from 'react'
import { Search, Truck, Star, MapPin, Phone, Globe, Plus, Shield } from 'lucide-react'
import { Button } from '../../components/ui'

const CARRIERS = [
  {
    id: 'cr-001',
    name: 'Trans Africa Logistics',
    type: 'Road Freight',
    country: 'Kenya',
    coverage: ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
    vehicles: 24,
    rating: 4.8,
    contact: 'David Mwangi',
    phone: '+254 720 111 333',
    email: 'ops@transafrica.co.ke',
    website: 'www.transafrica.co.ke',
    certifications: ['KEBS Approved', 'ISO 9001'],
    activeShipments: 8,
    totalShipments: 142,
    status: 'ACTIVE',
    contractExpiry: '2026-03-31',
  },
  {
    id: 'cr-002',
    name: 'East Africa Express',
    type: 'Road & Air',
    country: 'Uganda',
    coverage: ['Uganda', 'Kenya', 'Rwanda', 'Burundi'],
    vehicles: 16,
    rating: 4.7,
    contact: 'Sarah Nakamya',
    phone: '+256 700 222 444',
    email: 'info@eaexpress.ug',
    website: 'www.eaexpress.ug',
    certifications: ['KCAA Approved', 'IATA Certified'],
    activeShipments: 5,
    totalShipments: 98,
    status: 'ACTIVE',
    contractExpiry: '2025-12-31',
  },
  {
    id: 'cr-003',
    name: 'Great Lakes Freight',
    type: 'Road & Lake',
    country: 'Tanzania',
    coverage: ['Tanzania', 'Uganda', 'Burundi', 'DRC'],
    vehicles: 12,
    rating: 4.5,
    contact: 'Hassan Mgeni',
    phone: '+255 762 333 555',
    email: 'hq@greatlakesfreight.tz',
    website: 'www.greatlakesfreight.tz',
    certifications: ['TBS Certified'],
    activeShipments: 3,
    totalShipments: 67,
    status: 'ACTIVE',
    contractExpiry: '2025-09-30',
  },
  {
    id: 'cr-004',
    name: 'Kigali Cargo Services',
    type: 'Road Freight',
    country: 'Rwanda',
    coverage: ['Rwanda', 'Burundi', 'Uganda'],
    vehicles: 8,
    rating: 4.6,
    contact: 'Diane Ingabire',
    phone: '+250 788 444 666',
    email: 'cargo@kigalics.rw',
    website: 'www.kigalics.rw',
    certifications: ['RBS Certified'],
    activeShipments: 2,
    totalShipments: 44,
    status: 'ACTIVE',
    contractExpiry: '2026-06-30',
  },
  {
    id: 'cr-005',
    name: 'Nairobi Air Cargo Ltd',
    type: 'Air Freight',
    country: 'Kenya',
    coverage: ['Kenya', 'Ethiopia', 'Tanzania', 'Uganda', 'Rwanda'],
    vehicles: 0,
    rating: 4.9,
    contact: 'Peter Githinji',
    phone: '+254 733 555 777',
    email: 'cargo@nairobiair.co.ke',
    website: 'www.nairobiair.co.ke',
    certifications: ['IATA Certified', 'KCAA AOC', 'KEBS Approved'],
    activeShipments: 4,
    totalShipments: 89,
    status: 'ACTIVE',
    contractExpiry: '2025-11-30',
  },
  {
    id: 'cr-006',
    name: 'Port Logistics TZ',
    type: 'Sea & Road',
    country: 'Tanzania',
    coverage: ['Tanzania', 'Kenya', 'Uganda'],
    vehicles: 6,
    rating: 4.3,
    contact: 'Ahmed Juma',
    phone: '+255 762 666 888',
    email: 'ops@portlogistictz.tz',
    website: 'www.portlogisticstz.tz',
    certifications: ['TBS Certified', 'TIPA Certified'],
    activeShipments: 1,
    totalShipments: 28,
    status: 'SUSPENDED',
    contractExpiry: '2025-08-31',
  },
]

const TYPE_FILTERS = ['ALL', 'Road Freight', 'Road & Air', 'Air Freight', 'Sea & Road', 'Road & Lake']

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="h-3.5 w-3.5 text-yellow-400" style={{ fill: '#FACC15' }} />
      <span className="text-sm font-semibold" style={{ color: '#374151' }}>{rating}</span>
    </div>
  )
}

export default function CarrierList() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ACTIVE')

  const filtered = CARRIERS.filter((c) => {
    const q = search.toLowerCase()
    const matchSearch = !search || c.name.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)
    const matchType = typeFilter === 'ALL' || c.type === typeFilter
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter
    return matchSearch && matchType && matchStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0F2A4A' }}>Carriers & Vendors</h1>
          <p className="mt-1 text-sm" style={{ color: '#6B7280' }}>Manage freight carriers and service providers</p>
        </div>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Carrier
        </Button>
      </div>

      {/* Filters */}
      <div
        style={{
          background: 'rgba(255,255,255,0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(191,219,254,0.45)',
          borderRadius: '1rem',
        }}
        className="p-4 space-y-3"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-48 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search carriers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <div className="flex gap-1.5">
            {['ALL', 'ACTIVE', 'SUSPENDED'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={statusFilter === s
                  ? { background: '#1D4ED8', color: 'white' }
                  : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {TYPE_FILTERS.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
              style={typeFilter === t
                ? { background: '#EDE9FE', color: '#7C3AED', border: '1px solid #C4B5FD' }
                : { background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
            >
              {t === 'ALL' ? 'All Types' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Carrier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((carrier) => {
          const isActive = carrier.status === 'ACTIVE'
          return (
            <div
              key={carrier.id}
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: `1px solid ${isActive ? 'rgba(191,219,254,0.45)' : 'rgba(254,202,202,0.5)'}`,
                borderRadius: '1rem',
              }}
              className="p-5 flex flex-col gap-4"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#DBEAFE' }}>
                      <Truck className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-sm" style={{ color: '#0F2A4A' }}>{carrier.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 ml-10">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#DBEAFE', color: '#1D4ED8' }}>{carrier.type}</span>
                    <StarRating rating={carrier.rating} />
                  </div>
                </div>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0"
                  style={isActive
                    ? { background: 'rgb(220 252 231)', color: 'rgb(21 128 61)' }
                    : { background: 'rgb(254 226 226)', color: 'rgb(185 28 28)' }}
                >
                  {carrier.status}
                </span>
              </div>

              {/* Coverage */}
              <div>
                <p className="text-xs text-gray-400 mb-1">Coverage</p>
                <div className="flex flex-wrap gap-1">
                  {carrier.coverage.map((c) => (
                    <span key={c} className="text-xs px-2 py-0.5 rounded" style={{ background: '#F3F4F6', color: '#374151' }}>{c}</span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{carrier.contact} · {carrier.country}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{carrier.phone}</span>
                </div>
                {carrier.certifications.length > 0 && (
                  <div className="flex items-start gap-1.5">
                    <Shield className="h-3 w-3 text-green-500 mt-0.5" />
                    <span className="text-xs text-gray-500">{carrier.certifications.join(' · ')}</span>
                  </div>
                )}
              </div>

              {/* Stats + contract */}
              <div className="pt-2 border-t border-blue-100 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Active</p>
                  <p className="text-sm font-bold text-blue-700">{carrier.activeShipments}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{carrier.totalShipments}</p>
                </div>
                {carrier.vehicles > 0 && (
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Vehicles</p>
                    <p className="text-sm font-bold" style={{ color: '#0F2A4A' }}>{carrier.vehicles}</p>
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400">Contract expires: <span className="font-medium text-gray-600">{carrier.contractExpiry}</span></p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
